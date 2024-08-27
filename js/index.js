import * as api from './api.js';

const singleButton = document.getElementById('singleaircraft');
const multiButton = document.getElementById('multiaircraft');

singleButton.addEventListener('click', async() => {
    try {
        const singleResponse = await api.fetchSingleClosestAircraft();

        if (singleResponse) {
            const { lat, lon, flight, altitude, heading } = singleResponse;

            var aircraftMarker = L.marker([lat, lon]).addTo(map);
            aircraftMarker.bindPopup(`Flight: ${flight}<br>Altitude: ${altitude} ft<br>Heading: ${heading}°`).openPopup();
        } else {
            console.log("No aircraft data available");
        }
    } catch (error) {
        console.error("Error fetching single closest aircraft:", error);
    }
});

multiButton.addEventListener('click', async() => {
    try {
        const multiResponse = await api.multipleClosestAircraft();

        if (multiResponse) {
            for (let x = 0; x < multiResponse.ac.length; x++) {
                const aircraft = multiResponse.ac[x];
                const { lat, lon, flight, alt_baro, true_heading } = aircraft;

                var aircraftMarker = L.marker([lat, lon]).addTo(map);
                aircraftMarker.bindPopup(`Flight: ${flight}<br>Altitude: ${alt_baro} ft<br>Heading: ${true_heading}°`).openPopup();
            }
        } else {
            console.log("No aircraft data available");
        }
    } catch (error) {
        console.error("Error fetching multiple closest aircraft:", error);
    }
});

const aboutButton = document.getElementById('button2')
const map = document.getElementById('map')

function onAboutButtonClick() {
    map.style.filter = 'blur(2px)'
}