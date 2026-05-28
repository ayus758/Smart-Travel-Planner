const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/routes',  require('./routes/routeOptimizer'));
app.use('/api/hotels',  require('./routes/hotels'));
app.use('/api/cost',    require('./routes/cost'));
app.use('/api/weather', require('./routes/weather'));

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'SmartTrip backend is running!',
    endpoints: {
      routes:  '/api/routes?from=Delhi&to=Agra',
      hotels:  '/api/hotels?city=Delhi&sortBy=price',
      cost:    '/api/cost (POST)',
      weather: '/api/weather?city=Delhi'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SmartTrip server running on port ${PORT}`);
});