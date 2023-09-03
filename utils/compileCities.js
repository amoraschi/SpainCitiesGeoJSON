import { readFileSync } from 'fs'
import { fetchAPI } from './fetchAPI.js'
import { cleanJSON } from './cleanJSON.js'
import { uploadGithub } from './uploadGithub.js'

compileCities()
async function compileCities () {
  const names = readFileSync('./utils/list.json')
  const list = JSON.parse(names)
  for (const name of Object.values(list)) {
    console.log(`Compiling ${name}`)
    await fetchAPI(name)
    cleanJSON()
    await uploadGithub(name)
  }
}
