const express = require('express');
const router = express.Router();
const hotels = require('../data/hotels');
const mergeSort = require('../algorithms/mergeSort');
const binarySearch = require('../algorithms/binarySearch');
const heapSort = require('../algorithms/heapSort');
const knapsack = require('../algorithms/knapsack');

// GET /api/hotels?city=Delhi&sortBy=price&tier=Budget
router.get('/', (req, res) => {
  const { city, sortBy = 'price', tier } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  // Filter by city
  let filtered = hotels.filter(h => h.city.toLowerCase() === city.toLowerCase());

  // Filter by tier if provided
  if (tier) {
    filtered = filtered.filter(h => h.tier === tier);
  }

  if (filtered.length === 0) {
    return res.status(404).json({ error: `No hotels found in ${city}` });
  }

  // Sort based on sortBy param
  let sorted;
  if (sortBy === 'price') {
    // Merge sort by price low to high
    sorted = mergeSort([...filtered], (a, b) => a.price - b.price);
  } else if (sortBy === 'rating') {
    // Heap sort by rating high to low
    sorted = heapSort([...filtered], (a, b) => a.rating - b.rating);
    sorted.reverse();
  } else if (sortBy === 'value') {
    // Merge sort by value (rating/price ratio)
    sorted = mergeSort([...filtered], (a, b) =>
      (b.rating / b.price) - (a.rating / a.price)
    );
  } else {
    sorted = filtered;
  }

  res.json({
    city,
    sortBy,
    count: sorted.length,
    hotels: sorted
  });
});

// GET /api/hotels/search?city=Delhi&name=Zostel
router.get('/search', (req, res) => {
  const { city, name } = req.query;

  if (!city || !name) {
    return res.status(400).json({ error: 'City and name are required' });
  }

  // Filter by city first then sort alphabetically for binary search
  const cityHotels = hotels
    .filter(h => h.city.toLowerCase() === city.toLowerCase())
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  // Binary search by name
  const result = binarySearch(cityHotels, name);

  if (!result) {
    return res.status(404).json({ error: `Hotel ${name} not found in ${city}` });
  }

  res.json({ hotel: result });
});

// GET /api/hotels/best?city=Delhi&budget=50
// budget is in hundreds of rupees eg 50 = 5000
router.get('/best', (req, res) => {
  const { city, budget = 50 } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const cityHotels = hotels.filter(
    h => h.city.toLowerCase() === city.toLowerCase()
  );

  // Knapsack to find best hotels within budget
  const result = knapsack(cityHotels, parseInt(budget));

  res.json({
    city,
    budgetRupees: budget * 100,
    ...result
  });
});

module.exports = router;