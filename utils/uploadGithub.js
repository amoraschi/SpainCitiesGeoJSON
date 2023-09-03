import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import { config } from 'dotenv'
import { cleanJSON } from './cleanJSON.js'

config()
async function uploadGithub (name) {
  cleanJSON()
  console.log('Uploading to Github')
  const fileName = `${name.toLowerCase().replaceAll(' ', '_')}.geojson`
  const data = readFileSync('./data/cleaned.geojson')
  await fetch(`https://api.github.com/repos/amoraschi/SpainCitiesGeoJSON/contents/cities/${fileName}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`
    },
    body: JSON.stringify({
      message: 'Upload city',
      content: data.toString('base64'),
    })
  })

  console.log('Uploaded to Github')
  console.log('Editing list')
  const res = await fetch('https://api.github.com/repos/amoraschi/SpainCitiesGeoJSON/contents/list.json')
  const parsed = await res.json()
  const sha = parsed.sha

  const list = JSON.parse(Buffer.from(parsed.content, 'base64').toString())
  list[name] = fileName

  await fetch(`https://api.github.com/repos/amoraschi/SpainCitiesGeoJSON/contents/list.json`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`
    },
    body: JSON.stringify({
      message: 'Updated list',
      content: Buffer.from(JSON.stringify(list, null, 2)).toString('base64'),
      sha
    })
  })

  console.log('Edited list')
}

export {
  uploadGithub
}
