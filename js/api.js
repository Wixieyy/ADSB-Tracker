// Primary API https://api.adsb.lol/v2/lat/52.5105/lon/6.0946/dist/25
// Backup API https://opendata.adsb.fi/api/v2/lat/52.5105/lon/6.0946/dist/25

export async function fetchSingleClosestAircraft(lat, lon) {
    const url = `https://corsproxy.io/?${encodeURIComponent(`https://api.adsb.lol/v2/closest/${lat}/${lon}/25`)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Single");
    }

    const data = await response.json();
    const aircraft = data.ac[0];
    return { lat: aircraft.lat, lon: aircraft.lon, flight: aircraft.flight, altitude: aircraft.alt_baro, heading: aircraft.true_heading, type: aircraft.t, reg: aircraft.r };
}

export async function multipleClosestAircraft(lat, lon) {
    const url = `https://corsproxy.io/?${encodeURIComponent(`https://api.adsb.lol/v2/point/${lat}/${lon}/25`)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not fetch any data - Multi");
    }

    return await response.json();
}
