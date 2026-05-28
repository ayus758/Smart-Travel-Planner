const { cityGraph } = require('../cities');

function dfs(start, end, visited = new Set(), path = []) {
  // Mark current city as visited
  visited.add(start);
  path.push(start);

  // If we reached destination return the path
  if (start === end) {
    return [...path];
  }

  // Explore all neighbors
  for (let neighbor in cityGraph[start]) {
    if (!visited.has(neighbor)) {
      const result = dfs(neighbor, end, visited, path);
      if (result) return result;
    }
  }

  // Backtrack if destination not found on this path
  path.pop();
  return null;
}

function getAllPaths(start, end) {
  const allPaths = [];
  const visited = new Set();

  function explore(current, path) {
    visited.add(current);
    path.push(current);

    if (current === end) {
      allPaths.push([...path]);
    } else {
      for (let neighbor in cityGraph[current]) {
        if (!visited.has(neighbor)) {
          explore(neighbor, path);
        }
      }
    }

    // Backtrack
    path.pop();
    visited.delete(current);
  }

  explore(start, []);

  return allPaths;
}

module.exports = { dfs, getAllPaths };