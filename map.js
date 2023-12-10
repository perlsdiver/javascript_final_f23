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
            fillOpacity: 0.3,
            weight: 1.5
        };
    }
}).addTo(nycMap);

// adding layer cultural organizations data

L.geoJSON(dcla2).addTo(nycMap);
console.log();

// // assign colors for each discipline
// const disciplineColors = {
//     'Architecture/Design': '#fbb4ae',
//     'Botanical': '#b3cde3',
//     'Crafts': '#ccebc5',
//     'Dance': '#decbe4',
//     'Film/Video/Audio': '#fed9a6',
//     'Folk Arts': '#ffffcc', 
//     'Humanities': '#e5d8bd',
//     'Literature': '#fddaec',
//     'Multi-Discipl, Perf & Non-Perf': '#f2f2f2',
//     'Multi-Discipline, Non-Perform': '#b3e2cd',
//     'Multi-Discipline, Performing': '#fdcdac',
//     'Museum': '#cbd5e8',
//     'Music': '#f4cae4',
//     'New Media': '#e6f5c9',
//     'Other': '#fff2ae',
//     'Photography': '#f1e2cc',   
//     'Science': '#cccccc',
//     'Theater': '#d9d9d9',
//     'Visual Arts': '#fddaec',
//     'Zoo': '#f2f2f2'
// };


// loading DCLA data (clean up later)

// iterating on the data
dcla2.features.forEach(function(entry) {
    // Check if latitude and longitude data is available
    if (entry.Latitude && entry.Longitude) {
        console.log()
        // Create a marker at the given position
        var marker = L.marker([entry.Latitude, entry.Longitude]).addTo(nycMap);
        console.log()

        // Create a popup with the desired information
        var popupContent = `
            <strong>Organization Name:</strong> ${entry["Organization Name"]}<br>
            <strong>Address:</strong> ${entry.Address}, ${entry.City}, ${entry.State}, ${entry.Postcode}<br>
            <strong>Phone:</strong> ${entry["Main Phone #"]}<br>
            <strong>Neighborhood:</strong> ${entry.NTA}<br>
            <strong>Discipline:</strong> ${entry["Discipline"]}<br>
        `;
        
        // Bind the popup to the marker
        marker.bindPopup(popupContent);
    } else {
        // Handle cases where latitude or longitude is missing
        console.log(`Missing location data for: ${entry["Organization Name"]}`);
    }
});

