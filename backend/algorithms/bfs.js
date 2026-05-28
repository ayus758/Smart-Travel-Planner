const { cityGraph } = require('../cities');

function bfs(start, maxDistance = 500) {
  // BFS to find all cities reachable within maxDistance km
  const visited = new Set();
  const queue = [{ city: start, distance: 0 }];
  const alternatives = [];

  visited.add(start);

  while (queue.length > 0) {
    const { city, distance } = queue.shift();

    // Check all neighbors of current city
    for (let neighbor in cityGraph[city]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newDistance = distance + cityGraph[city][neighbor];

        if (newDistance <= maxDistance) {
          alternatives.push({
            city: neighbor,
            distanceFromStart: newDistance
          });
          queue.push({ city: neighbor, distance: newDistance });
        }
      }
    }
  }

  // Sort by distance so closest cities come first
  alternatives.sort((a, b) => a.distanceFromStart - b.distanceFromStart);

  return alternatives;
}

module.exports = bfs;