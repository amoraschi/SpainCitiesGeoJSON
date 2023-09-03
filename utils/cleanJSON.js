import { readFileSync, writeFileSync } from 'fs'

function cleanJSON () {
  console.log('Reading JSON')
  const data = readFileSync('./data/export.geojson')
  console.log('Read JSON')
  console.log('Parsing JSON')
  const parsed = JSON.parse(data)
  console.log('Parsed JSON')
  const cleanedFeatures = parsed.features.filter(feature => {
    delete feature.properties.bounds
    return feature.id.startsWith('way/') && feature.geometry.type === 'LineString'
  })

  const cleaned = {
    type: 'FeatureCollection',
    features: cleanedFeatures
  }

  console.log('Writing JSON')
  writeFileSync('./data/cleaned.geojson', JSON.stringify(cleaned, null, 2))
  console.log('Written JSON')
}

export {
  cleanJSON
}
