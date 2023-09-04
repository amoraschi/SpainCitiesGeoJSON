import { fetchAPI } from './fetchAPI.js'
import { cleanJSON } from './cleanJSON.js'

if (process.argv.length !== 3) {
  console.log('Usage: node retrieveCity.js <city name>')
  process.exit(1)
}

const name = process.argv[2]
compileCities(name)
async function compileCities (name) {
  await fetchAPI(name)
  cleanJSON(name)
}
