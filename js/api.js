// Primary API https://api.adsb.lol/v2/lat/52.5105/lon/6.0946/dist/25
// Backup API https://opendata.adsb.fi/api/v2/lat/52.5105/lon/6.0946/dist/25

const loc = {
    latitude: 52.5105,
    longitude: 6.0946,
    radius: 25
}

fetchSingleClosestAircraft()

async function fetchSingleClosestAircraft() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://opendata.adsb.fi/api/v2/lat/52.5105/lon/6.0946/dist/25');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch data");
    }

    const data = await response.json();

    const flight = data.aircraft[0]?.flight;

    console.log(flight);
}

function multipleClosestAircraft() {
    // https://api.adsb.lol/v2/lat/52.5105/lon/6.0946/dist/25

}