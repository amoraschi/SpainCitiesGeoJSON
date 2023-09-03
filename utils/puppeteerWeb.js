// import puppeteer from 'puppeteer'
// import fs from 'fs'

// generateCities()
// async function generateCities () {
//   const browser = await puppeteer.launch({
//     headless: false
//   })

//   const [page] = await browser.pages()
//   await page.goto('https://overpass-turbo.eu/#')
//   await page.waitForSelector('#editor > div.CodeMirror.CodeMirror-wrap > div.CodeMirror-scroll.cm-s-default > div > div > div.CodeMirror-lines > div > div:nth-child(5)')
//   // clear the query box
//   await page.click('#editor > div.CodeMirror.CodeMirror-wrap > div.CodeMirror-scroll.cm-s-default > div > div > div.CodeMirror-lines > div > div:nth-child(5)')
//   await page.keyboard.down('Control')
//   await page.keyboard.press('A')
//   await page.keyboard.up('Control')
//   await page.keyboard.press('Backspace')
//   // set the query
//   const query = `
//     [out:json];
//     area[name="Cádiz"][admin_level=8]->.city;
//     area["ISO3166-1"="ES"]->.es;
//     (
//       nwr
//         [highway]
//         // [highway!~"path|cycleway|steps|crossing|traffic_signals|bus_stop|street_lamp|raceway|service|give_way|stop"]
//         // [entrance!="yes"]
//         [area!="yes"]
//         [type!="multipolygon"]
//         (area.es)(area.city);
//     );
//     (._;>;);
//     out geom;
//   `

//   await page.keyboard.type(query)
//   await page.click('body > nav > div.navbar-start > div:nth-child(1) > div > button.t.button.is-success')
//   await page.waitForSelector('body > div.modal.is-active > div.modal-card > footer > div > div > div > button:nth-child(2)')
//   await page.click('body > div.modal.is-active > div.modal-card > footer > div > div > div > button:nth-child(2)')
//   await page.waitForSelector('#data > div > div.CodeMirror-scroll.cm-s-default > div > div > div.CodeMirror-lines > div > div:nth-child(5) > pre')
//   console.log('query set')
//   await page.click('body > nav > div.navbar-start > div:nth-child(1) > div > button:nth-child(4)')
//   await page.waitForSelector('#export-geoJSON > div.field-body > span > a.export.button.is-small.is-link.is-outlined')
//   console.log('downloading')
//   await page.click('#export-geoJSON > div.field-body > span > a.export.button.is-small.is-link.is-outlined')

//   // await new Promise(resolve => setTimeout(resolve, 5000))
//   const fileChooser = await page.waitForFileChooser({
//     timeout: 5000
//   }).catch(() => {})
//   await fileChooser?.accept()
//   console.log('file downloaded')
//   await browser.close()
//   // go to C:\Users\{user}\Downloads and bring the file to the project folder
//   const dir = 'C:\\Users\\Angelo\\Downloads'
//   const files = fs.readdirSync(dir)
//   const lastFile = files[files.length - 1]
//   // move the file to the project folder
//   fs.renameSync(`${dir}\\${lastFile}`, `./utils/cities.json`)
//   console.log('file moved')
// }
