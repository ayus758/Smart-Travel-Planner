const express = require('express');
const router = express.Router();
const greedyBudget = require('../algorithms/greedy');
const { geocodeCity, getRoute } = require('../ors');

// GET /api/cost
router.get('/', async (req, res) => {
  const { from, to, mode, days, travelers, hotelType } = req.query;

  if (!from || !to || !mode) {
    return res.status(400).json({ error: 'from, to and mode are required' });
  }

  // Step 1 — Try to get real distance from ORS
  let distanceKm = null;
  try {
    const [fromCoords, toCoords] = await Promise.all([
      geocodeCity(from),
      geocodeCity(to)
    ]);
    const route = await getRoute(fromCoords, toCoords);
    distanceKm  = route.distanceKm;
  } catch (_) {
    // ORS failed — greedy will use 400km default
  }

  // Step 2 — Run greedy with real distance + mode validity check
  const result = greedyBudget({
    from,
    to,
    mode:       mode            || 'Bus',
    days:       parseInt(days)  || 3,
    travelers:  parseInt(travelers) || 2,
    hotelTier:  hotelType       || 'Budget',
    distanceKm                          // ← pass ORS distance in
  });

  // Step 3 — If mode not available, return helpful error
  if (result.error) {
    return res.status(400).json({
      error:      result.reason,
      suggestion: result.suggestion
        ? `Try ${result.suggestion} instead`
        : null
    });
  }

  res.json({ from, to, ...result });
});

// GET /api/cost/modes
router.get('/modes', (req, res) => {
  res.json({
    modes: [
      { name: 'Bus',    ratePerKm: 1.2, speedKmph: 45,  description: 'Cheapest option'  },
      { name: 'Train',  ratePerKm: 0.9, speedKmph: 80,  description: 'Best value'       },
      { name: 'Flight', ratePerKm: 8.0, speedKmph: 800, description: 'Fastest option'   },
      { name: 'Car',    ratePerKm: 3.5, speedKmph: 60,  description: 'Most flexible'    }
    ]
  });
});

module.exports = router;
