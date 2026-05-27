const express = require('express');
const router = express.Router();
const greedyBudget = require('../algorithms/greedy');

// POST /api/cost
router.post('/', (req, res) => {
  const { from, to, mode, days, travelers, hotelTier } = req.body;

  // Check all required fields
  if (!from || !to || !mode) {
    return res.status(400).json({
      error: 'from, to and mode are required'
    });
  }

  const result = greedyBudget({
    from,
    to,
    mode:      mode      || 'Bus',
    days:      parseInt(days)      || 3,
    travelers: parseInt(travelers) || 2,
    hotelTier: hotelTier || 'Budget'
  });

  res.json({
    from,
    to,
    ...result
  });
});

// GET /api/cost/modes — get all travel modes and their rates
router.get('/modes', (req, res) => {
  res.json({
    modes: [
      { name: 'Bus',    ratePerKm: 1.2, description: 'Cheapest option' },
      { name: 'Train',  ratePerKm: 0.9, description: 'Best value'      },
      { name: 'Flight', ratePerKm: 8.0, description: 'Fastest option'  },
      { name: 'Car',    ratePerKm: 3.5, description: 'Most flexible'   }
    ]
  });
});

module.exports = router;