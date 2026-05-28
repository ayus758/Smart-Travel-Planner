const axios = require('axios');

const ORS_KEY = process.env.ORS_API_KEY;

// Convert city name → lat/lng coordinates

async function geocodeCity(cityName) {
  // Add India context to avoid wrong matches
  const searchText = `${cityName}, India`;
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(searchText)}&boundary.country=IN&size=5`;

  const res = await axios.get(url);
  const features = res.data.features;

  if (!features || features.length === 0) {
    throw new Error(`City not found: ${cityName}`);
  }

  // Known coordinates for our 13 cities to avoid wrong matches
  const knownCities = {
    'delhi':      { lat: 28.6139, lng: 77.2090 },
    'agra':       { lat: 27.1767, lng: 78.0081 },
    'jaipur':     { lat: 26.9124, lng: 75.7873 },
    'mumbai':     { lat: 19.0760, lng: 72.8777 },
    'varanasi':   { lat: 25.3176, lng: 82.9739 },
    'lucknow':    { lat: 26.8467, lng: 80.9462 },
    'shimla':     { lat: 31.1048, lng: 77.1734 },
    'manali':     { lat: 32.2432, lng: 77.1892 },
    'mussoorie':  { lat: 30.4598, lng: 78.0664 },
    'nainital':   { lat: 29.3919, lng: 79.4542 },
    'darjeeling': { lat: 27.0360, lng: 88.2627 },
    'ooty':       { lat: 11.4102, lng: 76.6950 },
    'munnar':     { lat: 10.0889, lng: 77.0595 },
  };

  const key = cityName.toLowerCase().trim();
  if (knownCities[key]) {
    return {
      lat:   knownCities[key].lat,
      lng:   knownCities[key].lng,
      label: cityName
    };
  }

  // For unknown cities use ORS result
  const [lng, lat] = features[0].geometry.coordinates;
  const label      = features[0].properties.label;
  return { lat, lng, label };
}

// Get real road distance + duration between two coordinates
async function getRoute(fromCoords, toCoords) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${fromCoords.lng},${fromCoords.lat}&end=${toCoords.lng},${toCoords.lat}`;

  const res      = await axios.get(url);
  const segment  = res.data.features[0].properties.segments[0];
  const geometry = res.data.features[0].geometry.coordinates;

  return {
    distanceKm:  Math.round(segment.distance / 1000),
    durationMin: Math.round(segment.duration / 60),
    coordinates: geometry // full route path
  };
}

module.exports = { geocodeCity, getRoute };