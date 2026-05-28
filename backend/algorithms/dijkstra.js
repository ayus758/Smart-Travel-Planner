function dijkstra(graph, start, end) {
  const distances = {};
  const prev = {};
  const visited = new Set();
  const queue = [];

  // Set all distances to infinity first
  for (let node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }

  // Starting point distance is 0
  distances[start] = 0;
  queue.push({ node: start, dist: 0 });

  while (queue.length > 0) {
    // Pick the closest unvisited node
    queue.sort((a, b) => a.dist - b.dist);
    const { node } = queue.shift();

    if (visited.has(node)) continue;
    visited.add(node);

    if (node === end) break;

    // Check all neighbors
    for (let neighbor in graph[node]) {
      const weight = graph[node][neighbor];
      const newDist = distances[node] + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = node;
        queue.push({ node: neighbor, dist: newDist });
      }
    }
  }

  // Build the path by backtracking
  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return {
    path,
    totalDistance: distances[end],
    reachable: distances[end] !== Infinity
  };
}

module.exports = dijkstra;