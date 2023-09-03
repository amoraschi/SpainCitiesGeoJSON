// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
// https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
// https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
const tileProvider = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
const map = L.map('map', {
    zoomAnimation: false,
    fadeAnimation: false,
    markerZoomAnimation: false
});
let opacityModifier = 100000;
let weightModifier = 1;
getData();
async function getData() {
    const listRes = await fetch('https://raw.githubusercontent.com/amoraschi/SpainCitiesGeoJSON/master/list.json');
    const list = await listRes.json();
    console.log('List', list);
    const saveButton = document.getElementById('save');
    const dropdown = document.getElementById('cityDropdown');
    const loadingSpan = document.getElementById('loading');
    const opacityModifierInput = document.getElementById('opacityModifier');
    const weightModifierInput = document.getElementById('weightModifier');
    Object.keys(list).sort((a, b) => a.localeCompare(b)).forEach((city) => {
        const option = document.createElement('option');
        option.value = city;
        option.innerText = city;
        dropdown.appendChild(option);
    });
    dropdown.value = 'Sevilla';
    let roadData;
    await loadCity(list['Sevilla']);
    async function loadCity(name) {
        loadingSpan.innerText = `Loading ${name}...`;
        console.log('Reading data');
        console.log(`Fetching from https://raw.githubusercontent.com/amoraschi/SpainCitiesGeoJSON/master/cities/${name}`);
        const cityRes = await fetch(`https://raw.githubusercontent.com/amoraschi/SpainCitiesGeoJSON/master/cities/${name}`);
        const data = await cityRes.json();
        console.log('Data read');
        setColors(data);
        const center = getCenter(data);
        const [minLat, maxLat, minLon, maxLon] = getMinMax(data);
        console.log('Center', center);
        map.fitBounds([
            [minLat, minLon],
            [maxLat, maxLon]
        ]);
        // map.whenReady(() => {
        L.tileLayer(tileProvider, {
            attribution: 'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            subdomains: 'abcd'
        }).addTo(map);
        // const pos = L.latLng(center[0], center[1])
        // L.marker(pos).addTo(map)
        if (roadData != null) {
            roadData.clearLayers();
            roadData.addData(data);
        }
        else {
            roadData = L.geoJSON(data, {
                style: (feature) => getStyle(feature, center)
            }).addTo(map);
        }
        loadingSpan.innerText = `Loaded ${name}`;
        dropdown.onchange = async () => {
            const fileName = list[dropdown.value];
            opacityModifierInput.value = '100000';
            weightModifierInput.value = '1';
            opacityModifier = 100000;
            weightModifier = 1;
            await loadCity(fileName);
        };
        saveButton.onclick = () => {
            opacityModifier = Number(opacityModifierInput.value) ?? 0;
            weightModifier = Number(weightModifierInput.value) ?? 0;
            roadData.eachLayer((layer) => {
                // @ts-expect-error
                layer.setStyle(getStyle(layer.feature, center));
            });
        };
        // })
    }
}
