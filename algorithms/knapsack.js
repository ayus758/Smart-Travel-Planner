function knapsack(hotels, budget) {
  const n = hotels.length;

  // Each hotel has a price (weight) and rating (value)
  // We want maximum rating within budget using DP

  // Create DP table
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(budget + 1).fill(0));

  // Fill the table
  for (let i = 1; i <= n; i++) {
    const hotel  = hotels[i - 1];
    const price  = Math.round(hotel.price / 100); // scale down for table size
    const rating = hotel.rating;

    for (let w = 0; w <= budget; w++) {
      // Don't pick this hotel
      dp[i][w] = dp[i - 1][w];

      // Pick this hotel if it fits in budget
      if (price <= w) {
        const withHotel = dp[i - 1][w - price] + rating;
        if (withHotel > dp[i][w]) {
          dp[i][w] = withHotel;
        }
      }
    }
  }

  // Backtrack to find which hotels were selected
  const selected = [];
  let w = budget;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(hotels[i - 1]);
      w -= Math.round(hotels[i - 1].price / 100);
    }
  }

  return {
    bestHotels: selected,
    maxRating: dp[n][budget]
  };
}

module.exports = knapsack;
