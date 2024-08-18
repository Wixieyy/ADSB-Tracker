// Primary API https://api.adsb.lol/v2/lat/52.5105/lon/6.0946/dist/25
// Backup API https://opendata.adsb.fi/api/v2/lat/52.5105/lon/6.0946/dist/25

const loc = {
    latitude: 52.5105,
    longitude: 6.0946,
    radius: 25
}

fetchSingleClosestAircraft()
setTimeout(multipleClosestAircraft, 5000);

async function fetchSingleClosestAircraft() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.adsb.lol/v2/closest/52.5105/6.0946/25');
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Single");
    }

    const data = await response.json();
    const flight = data.ac[0]?.flight;

    console.log(flight);
}

async function multipleClosestAircraft() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.adsb.lol/v2/point/52.5105/6.0946/25');
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Multi")
    }

    const datamultiple = await response.json()

    for (let i = 0; i < datamultiple.ac.length; i++) {
        console.log(datamultiple.ac[i]?.flight);
    }
}