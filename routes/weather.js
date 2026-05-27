const express = require('express');
const router = express.Router();
const axios = require('axios');

const WEATHER_KEY = process.env.OPENWEATHER_API_KEY;

// Simple cache to avoid hitting API too much
const cache = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const BULK_LIMIT = 10;

// GET /api/weather?city=Delhi
router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  const key = encodeURIComponent(city.trim()).toLowerCase();
  if (cache[key] && Date.now() - cache[key].timestamp < CACHE_TTL) {
    return res.json({ ...cache[key].data, cached: true });
  }

  if (!WEATHER_KEY) {
    return res.status(500).json({ error: 'Missing OPENWEATHER_API_KEY' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${WEATHER_KEY}&units=metric`;
    const response = await axios.get(url, { timeout: 5000 });
    const d = response.data;

    const result = {
      city:        d.name,
      temp:        Math.round(d.main.temp),
      feels_like:  Math.round(d.main.feels_like),
      condition:   d.weather?.[0]?.main,
      description: d.weather?.[0]?.description,
      humidity:    d.main.humidity,
      wind_speed:  d.wind.speed,
      icon:        d.weather?.[0]?.icon
    };

    cache[key] = { data: result, timestamp: Date.now() };
    return res.json(result);

  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data || err.message;
    return res.status(status).json({ error: 'Weather fetch failed', detail });
  }
});

// GET /api/weather/bulk?cities=Delhi,Agra,Jaipur
router.get('/bulk', async (req, res) => {
  const cities = req.query.cities?.split(',').map(c => c.trim()).filter(Boolean) || [];

  if (cities.length === 0) {
    return res.status(400).json({ error: 'Cities are required' });
  }
  if (cities.length > BULK_LIMIT) {
    return res.status(400).json({ error: `Max ${BULK_LIMIT} cities allowed` });
  }

  const promises = cities.map(city => {
    const key = encodeURIComponent(city).toLowerCase();
    if (cache[key] && Date.now() - cache[key].timestamp < CACHE_TTL) {
      return Promise.resolve({ cached: true, city, data: cache[key].data });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${WEATHER_KEY}&units=metric`;
    return axios.get(url, { timeout: 5000 }).then(r => ({ cached: false, city, data: r.data })).catch(e => ({ error: true, city, detail: e.response?.data || e.message }));
  });

  const settled = await Promise.all(promises);

  const weather = settled.map(item => {
    if (item.error) return { city: item.city, error: 'unavailable', detail: item.detail };
    if (item.cached) return { city: item.city, ...item.data, cached: true };
    const d = item.data;
    const mapped = {
      city:       d.name || item.city,
      temp:       Math.round(d.main.temp),
      condition:  d.weather?.[0]?.main,
      humidity:   d.main.humidity,
      wind_speed: d.wind.speed,
      icon:       d.weather?.[0]?.icon
    };
    // store in cache
    const cacheKey = encodeURIComponent(item.city).toLowerCase();
    cache[cacheKey] = { data: mapped, timestamp: Date.now() };
    return mapped;
  });

  return res.json(weather);
});

module.exports = router;
