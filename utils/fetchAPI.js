import { writeFileSync } from 'fs'
import fetch from 'node-fetch'
import osm2geojson from 'osm2geojson-lite'

async function fetchAPI (name) {
  const query = `
    [out:json];
    area[name="${name}"][admin_level=8]->.city;
    area["ISO3166-1"="ES"]->.es;
    (
      nwr
        [highway]
        // [highway!~"path|cycleway|steps|crossing|traffic_signals|bus_stop|street_lamp|raceway|service|give_way|stop"]
        // [entrance!="yes"]
        [area!="yes"]
        [type!="multipolygon"]
        (area.es)(area.city);
    );
    (._;>;);
    out geom;
  `

  console.log('Fetching data')
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })

  console.log('Fetched data')
  const data = await response.json()

  console.log('Converting data')
  const geojson = osm2geojson(data, {
    allFeatures: true,
    completeFeature: true,
    excludeWay: false,
    suppressWay: false,
    renderTagged: true
  })

  console.log('Converted data')
  console.log('Writing data')
  writeFileSync('./data/export.geojson', JSON.stringify(geojson, null, 2))
  console.log('Wrote data')
}

export {
  fetchAPI
}
