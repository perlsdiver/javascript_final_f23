let nycMap;
nycMap = L.map("map");

// create tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(nycMap);

nycMap.setView([40.7128, -74.0060], 10);

L.geoJSON(nyc).addTo(nycMap);

// add some fill color to the map
L.geoJSON(nyc, {
    style: function(feature) {
        return {
            color: "red",
            fillColor: "yellow",
            fillOpacity: 0.5
        };
    }
}).addTo(nycMap);

// adding layer cultural organizations data

L.geoJSON(dcla).addTo(nycMap);
console.log();

// loading DCLA data

dcla.forEach(function(entry) {
    // Check if latitude and longitude data is available
    if (entry.Latitude && entry.Longitude) {
        // Create a marker at the given position
        var marker = L.marker([entry.Latitude, entry.Longitude]).addTo(nycMapmap);

        // Create a popup with the desired information
        var popupContent = `
            <strong>Organization Name:</strong> ${entry["Organization Name"]}<br>
            <strong>Address:</strong> ${entry.Address}, ${entry.City}, ${entry.State}, ${entry.Postcode}<br>
            <strong>Phone:</strong> ${entry["Main Phone #"]}<br>
            <strong>Latitude:</strong> ${entry.Latitude}<br>
            <strong>Longitude:</strong> ${entry.Longitude}
        `;
        
        // Bind the popup to the marker
        marker.bindPopup(popupContent);
    } else {
        // Handle cases where latitude or longitude is missing
        console.log(`Missing location data for: ${entry["Organization Name"]}`);
    }
});

