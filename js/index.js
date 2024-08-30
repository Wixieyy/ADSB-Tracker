import * as api from './api.js';

const singleButton = document.getElementById('singleaircraft');
const multiButton = document.getElementById('multiaircraft');

const aircraftType = {
    B737: 'Boeing 737-700',
    B738: 'Boeing 737-800',
    B37M: 'Boeing 737 MAX 7',
    B38M: 'Boeing 737 MAX 8',
    B39M: 'Boeing 737 MAX 9'
}

singleButton.addEventListener('click', async() => {
    try {
        const singleResponse = await api.fetchSingleClosestAircraft();

        if (singleResponse) {
            const { lat, lon, flight, altitude, heading, type, reg } = singleResponse;

            var aircraftMarker = L.marker([lat, lon]).addTo(leafletMap);
            aircraftMarker.bindPopup(`Flight: ${flight}<br>Type: ${aircraftType[type]}<br>Registration: ${reg}<br>Altitude: ${altitude} ft<br>Heading: ${heading}°`).openPopup();
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

                var aircraftMarker = L.marker([lat, lon]).addTo(leafletMap);
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
const mapOverlay = document.getElementById('map-overlay')
const aboutBox = document.getElementById('about')
let aboutCheck = 0;

aboutButton.addEventListener('click', () => {
    if (aboutCheck === 0) {
        aboutCheck = 1;
        mapOverlay.style.opacity = '1';
        mapOverlay.style.backdropFilter = 'blur(3px)';
        map.style.pointerEvents = 'none';
        aboutBox.style.opacity = '1';
        aboutBox.style.animationName = 'fadein';
        aboutBox.style.animationDuration = '500ms';
    } else {
        aboutCheck = 0;
        mapOverlay.style.opacity = '0';
        mapOverlay.style.backdropFilter = 'blur(0px)';
        map.style.pointerEvents = 'auto';
        aboutBox.style.opacity = '0';
        aboutBox.style.animationName = 'fadeout';
        aboutBox.style.animationDuration = '500ms';
    }
});
