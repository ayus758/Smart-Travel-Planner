function greedyBudget({ from, to, mode, days, travelers, hotelTier }) {
  // Cost per km for each travel mode
  const travelRates = {
    Bus: 1.2,
    Train: 0.9,
    Flight: 8.0,
    Car: 3.5
  };

  // Hotel cost per night
  const hotelRates = {
    Budget: 800,
    'Mid-Range': 2000,
    Luxury: 6000
  };

  // Food cost per person per day
  const foodRates = {
    Budget: 300,
    'Mid-Range': 600,
    Luxury: 1400
  };

  // Hardcoded distances between cities in km
  const distanceMap = {
    'Delhi-Agra': 204, 'Delhi-Jaipur': 281,
    'Delhi-Lucknow': 555, 'Delhi-Shimla': 343,
    'Delhi-Manali': 536, 'Delhi-Mussoorie': 290,
    'Delhi-Nainital': 317, 'Delhi-Varanasi': 821,
    'Delhi-Darjeeling': 1432, 'Mumbai-Ooty': 1050,
    'Mumbai-Munnar': 620, 'Mumbai-Jaipur': 1153,
    'Agra-Jaipur': 238, 'Agra-Varanasi': 679,
    'Agra-Lucknow': 368, 'Ooty-Munnar': 160,
    'Shimla-Manali': 270, 'Varanasi-Lucknow': 286,
    'Lucknow-Nainital': 396, 'Mussoorie-Nainital': 327
  };

  // Look up distance both ways
  const key = `${from}-${to}`;
  const reverseKey = `${to}-${from}`;
  const distance = distanceMap[key] || distanceMap[reverseKey] || 400;

  // Calculate each cost
  const travelCost = Math.round(distance * (travelRates[mode] || 1.2)) * travelers;
  const hotelCost  = (hotelRates[hotelTier] || 800) * days;
  const foodCost   = (foodRates[hotelTier] || 300) * days * travelers;
  const miscCost   = Math.round((travelCost + hotelCost + foodCost) * 0.08);

  const grandTotal     = travelCost + hotelCost + foodCost + miscCost;
  const totalPerPerson = Math.round(grandTotal / travelers);

  return {
    breakdown: {
      travelCost,
      hotelCost,
      foodCost,
      miscCost
    },
    totalPerPerson,
    grandTotal,
    days,
    travelers,
    mode,
    distance
  };
}

module.exports = greedyBudget;