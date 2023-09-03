const colors = [];
function setColors(data) {
    const types = data.features.map((feature) => {
        return feature.properties.highway;
    });
    const highwayTypes = [...new Set(types)];
    for (const type of highwayTypes) {
        const index = highwayTypes.indexOf(type);
        const hue = (index / highwayTypes.length) * 360;
        const saturation = 100;
        const lightness = 50;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        colors.push({
            type,
            color
        });
    }
    return colors;
}
// function getColor (name: string, distance: number) {
//   const startColor = [0, 255, 0]
//   const endColor = [255, 0, 0]
//   const percent = distance / 10
//   const color: number[] = []
//   for (let i = 0; i < 3; i++) {
//     color.push(Math.round(startColor[i] + percent * (endColor[i] - startColor[i])))
//   }
//   return `rgb(${color.join(',')})`
// }
// function getWeight (name: string) {
//   switch (name) {
//     case 'primary':
//       return 5
//     case 'secondary':
//       return 4
//     case 'tertiary':
//       return 3
//     case 'residential':
//       return 2
//     case 'service':
//       return 1
//     default:
//       return 1
//   }
// }
function getStyle(feature, center) {
    const coords = feature.geometry.coordinates;
    const lat = coords[0][1];
    const lon = coords[0][0];
    const distance = haversineDistance(center[0], center[1], lat, lon);
    const color = colors.find((color) => color.type === feature?.properties.highway)?.color || 'white';
    return {
        color: color,
        opacity: 1 - distance / opacityModifier,
        weight: weightModifier
    };
}
