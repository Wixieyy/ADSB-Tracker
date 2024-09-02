let leafletMap;
let latitude;
let longitude;

fetch('https://get.geojs.io/v1/ip/geo.json')
    .then(response => response.json())
    .then(location => {
        latitude = location.latitude;
        longitude = location.longitude;

        leafletMap = L.map('map').setView([latitude, longitude], 9);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '<a href="https://github.com/Wixieyy"><img src="../img/curacao.png" width="12px" style="padding-right: 3px"><img src="../img/netherlands.png" width="12px" style="padding-right: 3px">Wixiey</a>',
        }).addTo(leafletMap);

        L.marker([latitude, longitude], {
            interactive: false
        }).addTo(leafletMap);

        L.circle([latitude, longitude], {
            color: 'blue',
            radius: 50000,
            interactive: false
        }).addTo(leafletMap);
    })
    .catch(error => console.error('Error fetching location data:', error));