const axios = require('axios');

module.exports = async function geocode(location) {
    const apiKey = process.env.MAPTILER_KEY;// your API key
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data.features.length) {
        throw new Error('Location not found');
    }

    const geometry = data.features[0].geometry; // { type: 'Point', coordinates: [lng, lat] }
    const placeName = data.features[0].place_name;

    return { geometry, placeName };
};

// Sends a request to MapTiler Geocoding API.
// Converts "Delhi" → {type: 'Point', coordinates: [77.1025, 28.7041]}.