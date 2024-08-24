// Primary API https://api.adsb.lol/v2/lat/52.5105/lon/6.0946/dist/25
// Backup API https://opendata.adsb.fi/api/v2/lat/52.5105/lon/6.0946/dist/25

const loc = {
    latitude: 52.5105,
    longitude: 6.0946,
    radius: 25
}

export async function fetchSingleClosestAircraft() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.adsb.lol/v2/closest/52.5105/6.0946/25');
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Single");
    }

    const data = await response.json();
    const aircraft = data.ac[0];
    return { lat: aircraft.lat, lon: aircraft.lon, flight: aircraft.flight, altitude: aircraft.alt_baro, heading: aircraft.true_heading };
}

export async function multipleClosestAircraft() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.adsb.lol/v2/point/52.5105/6.0946/25');
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Multi")
    }

    const datamultiple = await response.json()

    return datamultiple;
}