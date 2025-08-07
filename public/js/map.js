// const map = new maplibregl.Map({
//     container: 'map',
//     style:'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',//This link is for map tile styling online, NOT for your CSS folder.
//     center: [77.2088, 28.6139],//[longitude, latitude]
//     zoom: 8
// });

// const marker = new maplibregl.Marker()//Marker() = Create a marker object.
//     .setLngLat([77.2088, 28.6139])//setLngLat() = Set where the marker should appear.
//     .addTo(map);//addTo(map) = Add the marker to the map instance.



const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=bdhEJtfnElrgGsPoWAmf', // Replace with your API key
    center: listingData.coordinates, // ✅ Dynamic center
    zoom: 9
});

// ✅ Marker with popup
new maplibregl.Marker({ color: 'red' })
    .setLngLat(listingData.coordinates)
    .setPopup(
        new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h5>${listingData.title}</h5>`)
    )
    .addTo(map);
