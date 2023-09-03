import { readFileSync } from 'fs'
import { config } from 'dotenv'

config()
editList()
async function editList () {
  const list = {}
  const file = readFileSync('./utils/spanish.json')
  const cities = JSON.parse(file.toString())
  for (const city of Object.values(cities)) {
    list[city] = `${city.toLowerCase().replaceAll(' ', '_')}.geojson`
  }

  console.log('Editing list')
  const res = await fetch('https://api.github.com/repos/amoraschi/SpainCitiesGeoJSON/contents/list.json')
  const parsed = await res.json()
  const sha = parsed.sha

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
