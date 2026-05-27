const express = require('express');
const router = express.Router();
const dijkstra = require('../algorithms/dijkstra');
const bfs = require('../algorithms/bfs');
const { dfs, getAllPaths } = require('../algorithms/dfs');
const { cityGraph, cityList, getRegionalAlternatives } = require('../cities'); // ← added getRegionalAlternatives

// GET /api/routes?from=Delhi&to=Agra
router.get('/', (req, res) => {
  const { from, to } = req.query;

  // Check if cities exist
  if (!cityGraph[from] || !cityGraph[to]) {
    return res.status(404).json({
      error: `City not found. Available cities: ${cityList.join(', ')}`
    });
  }

  // Dijkstra for shortest path
  const shortest = dijkstra(cityGraph, from, to);

  // Build time graph for fastest route
  const timeGraph = {};
  for (let city in cityGraph) {
    timeGraph[city] = {};
    for (let neighbor in cityGraph[city]) {
      // Highway speed 80km/h
      timeGraph[city][neighbor] = Math.round(cityGraph[city][neighbor] / 80 * 60); // minutes
    }
  }
  const fastest = dijkstra(timeGraph, from, to);

  // Build cost graph for cheapest route
  const costGraph = {};
  for (let city in cityGraph) {
    costGraph[city] = {};
    for (let neighbor in cityGraph[city]) {
      // Bus rate 1.2 per km
      costGraph[city][neighbor] = Math.round(cityGraph[city][neighbor] * 1.2);
    }
  }
  const cheapest = dijkstra(costGraph, from, to);

  // ← CHANGED: regional alternatives for destination city
  // If Mussoorie is crowded/bad weather → suggests Nainital, Kedarnath, Auli etc. (Uttarakhand only)
  const alternatives = getRegionalAlternatives(to, 5);

  // BFS still used internally for graph exploration (kept for DAA showcase)
  const bfsExplore = bfs(from, 500);

  // DFS for one possible path
  const dfsPath = dfs(from, to);

  res.json({
    from,
    to,
    routes: {
      shortest: {
        path: shortest.path,
        distanceKm: shortest.totalDistance,
        label: 'Shortest Route'
      },
      fastest: {
        path: fastest.path,
        timeMinutes: fastest.totalDistance,
        label: 'Fastest Route'
      },
      cheapest: {
        path: cheapest.path,
        costRupees: cheapest.totalDistance,
        label: 'Budget Route'
      }
    },
    alternativeCities: alternatives,  // ← now regional alternatives
    dfsPath
  });
});

// GET /api/routes/cities — get all available cities
router.get('/cities', (req, res) => {
  res.json({ cities: cityList });
});

module.exports = router;