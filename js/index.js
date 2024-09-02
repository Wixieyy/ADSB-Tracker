import * as api from './api.js';

const singleButton = document.getElementById('singleaircraft');
const multiButton = document.getElementById('multiaircraft');

const aircraftType = {
    A306: 'Airbus A300-600 (Freighter)',
    A19N: 'Airbus A319neo',
    A20N: 'Airbus A320neo',
    A21N: 'Airbus A321neo',
    A318: 'Airbus A318',
    A319: 'Airbus A319',
    A320: 'Airbus A320',
    A321: 'Airbus A321',
    A332: 'Airbus A330-200',
    A333: 'Airbus A330-300',
    A337: 'Airbus A330-700 BelugaXL',
    A338: 'Airbus A330-800',
    A339: 'Airbus A330-900',
    A342: 'Airbus A340-200',
    A343: 'Airbus A340-300',
    A345: 'Airbus A340-500',
    A346: 'Airbus A340-600',
    A359: 'Airbus A350-900',
    A35K: 'Airbus A350-1000',
    A388: 'Airbus A380-800',
    B737: 'Boeing 737-700',
    B738: 'Boeing 737-800',
    B37M: 'Boeing 737 MAX 7',
    B38M: 'Boeing 737 MAX 8',
    B39M: 'Boeing 737 MAX 9',
    B744: 'Boeing 747-400',
    B748: 'Boeing 747-8',
    B772: 'Boeing 777-200/200ER',
    B773: 'Boeing 777-300',
    B778: 'Boeing 777-8',
    B779: 'Boeing 777-9',
    B77L: 'Boeing 777-200LR / Freighter',
    B788: 'Boeing 787-8',
    B789: 'Boeing 787-9',
    B78X: 'Boeing 787-10',
    BCS1: 'Airbus A220-100',
    BCS3: 'Airbus A220-300',
    E170: 'Embraer E170',
    E75L: 'Embraer E175 (long wing)',
    E75S: 'Embraer E175 (short wing)',
    E190: 'Embraer E190',
    E195: 'Embraer E195',
    E290: 'Embraer E190-E2',
    E295: 'Embraer E195-E2',
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
