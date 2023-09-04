<h1 align="center">Spain Cities GeoJSON</h1>
<h4 align="center">GeoJSON road files for spanish provinces capital cities</h4>

This repository contains numerous and heavy json files that represent roads in spanish provinces capital cities. They can be used to visualize, like in [spain-cities-webpage](https://github.com/amoraschi/spain-cities-webpage),
or study the actual roads.

<h2>How to Use</h2>
Data can be retrieved by fetching the Github API, like this:
<br></br>

```js
const response = await fetch('https://raw.githubusercontent.com/amoraschi/spain-cities-geojson/master/cities/madrid.geojson')
const geojson = await response.json()
```

Or the local script can be used to download the data directly from the Overpass API, to do this, follow these steps:

1. Clone the repository, or download the `src` directory and the `package.json` file:

```
> git clone https://github.com/amoraschi/spain-cities-geojson/
```

2. In the folder, run the NPM command to install the dependencies:

```
> npm install
```

3. Run the NPM command followed by the name of the city you want to download (e.g. Madrid):

```
> npm start Madrid
```

Once it finishes, you will find a `download` folder containing 2 geojson files, one that contains the raw GeoJSON data from Overpass, and one that only contains the `way` s of a city.

<h2>Known Issues</h2>

The following cities present no data when fetched through the Overpass API, for an unknown reason:
- Alicante
- Castellón de la Plana
- Donostia
- Huesca
- Palma de Mallorca
- Pamplona
- Valencia

<h2>Resources</h2>

[OpenStreetMap](https://www.openstreetmap.org/) - For retrieving the province names and their capital cities.

[Overpass Turbo](https://overpass-turbo.eu/) - For retrieving the actual data of the roads.

