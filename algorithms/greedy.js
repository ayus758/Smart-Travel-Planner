// ─────────────────────────────────────────────
//  Cities where each mode is actually available
// ─────────────────────────────────────────────
const flightCities = new Set([
  'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad',
  'Kochi', 'Jaipur', 'Ahmedabad', 'Pune', 'Goa', 'Panaji', 'Srinagar',
  'Leh', 'Chandigarh', 'Coimbatore', 'Trivandrum', 'Nagpur', 'Indore',
  'Bhopal', 'Patna', 'Varanasi', 'Guwahati', 'Bhubaneswar', 'Ranchi',
  'Amritsar', 'Jammu', 'Udaipur', 'Jodhpur', 'Shimla', 'Dharamshala',
  'Aurangabad', 'Visakhapatnam', 'Tirupati', 'Madurai', 'Pondicherry',
  'Lucknow', 'Agra', 'Surat', 'Vadodara', 'Rajkot'
]);

const trainCities = new Set([
  'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad',
  'Kochi', 'Jaipur', 'Ahmedabad', 'Pune', 'Srinagar', 'Chandigarh',
  'Coimbatore', 'Trivandrum', 'Nagpur', 'Indore', 'Bhopal', 'Patna',
  'Varanasi', 'Guwahati', 'Bhubaneswar', 'Amritsar', 'Jammu', 'Udaipur',
  'Jodhpur', 'Jaisalmer', 'Aurangabad', 'Visakhapatnam', 'Lucknow',
  'Agra', 'Mathura', 'Haridwar', 'Rishikesh', 'Dehradun', 'Nainital',
  'Shimla', 'Kalka', 'Mysore', 'Mangalore', 'Allahabad', 'Gwalior',
  'Jhansi', 'Khajuraho', 'Surat', 'Vadodara', 'Rajkot', 'Kolhapur',
  'Nashik', 'Shirdi', 'Tirupati', 'Madurai', 'Coimbatore', 'Salem',
  'Ranchi', 'Jamshedpur', 'Siliguri', 'Darjeeling', 'Patna', 'Gaya',
  'Bodhgaya', 'Shillong', 'Gangtok', 'Kolkata', 'Dhanbad', 'Kanpur',
  'Ludhiana', 'Ambala', 'Jodhpur', 'Bikaner', 'Ajmer', 'Pushkar'
]);

// Road-only cities — no flights, no direct trains
const roadOnlyCities = new Set([
  'Mussoorie', 'Munsiyari', 'Chakrata', 'Tehri', 'Auli', 'Chopta',
  'Lansdowne', 'Kedarnath', 'Badrinath', 'Ranikhet', 'Almora',
  'Kasol', 'Spiti', 'Chitkul', 'Kinnaur', 'Bir Billing', 'Kufri',
  'Narkanda', 'Chail', 'Dalhousie', 'Palampur', 'Kullu',
  'Tawang', 'Ziro', 'Majuli', 'Lachung', 'Dzukou Valley',
  'Cherrapunji', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Dal Lake',
  'Nubra Valley', 'Pangong Lake', 'Coorg', 'Chikmagalur', 'Sakleshpur',
  'Kabini', 'Wayanad', 'Varkala', 'Thekkady', 'Munnar',
  'Lonavala', 'Mahabaleshwar', 'Matheran', 'Igatpuri', 'Alibaug',
  'Palolem', 'Vagator', 'Anjuna', 'Arambol', 'Candolim',
  'Ranthambore', 'Mount Abu', 'Bundi', 'Kumbhalgarh', 'Mandawa',
  'Pushkar', 'Orchha', 'Pachmarhi', 'Bandhavgarh', 'Kanha',
  'Hampi', 'Badami', 'Belur', 'Halebidu', 'Dandeli',
  'Sundarbans', 'Bishnupur', 'Shantiniketan', 'Netarhat',
  'Horsley Hills', 'Araku Valley', 'Nagarjunasagar', 'Simlipal',
  'Chilika', 'Konark', 'Puri', 'Vrindavan', 'Ayodhya'
]);

// ─────────────────────────────────────────────
//  Mode config — realistic speeds + overhead
// ─────────────────────────────────────────────
const modeConfig = {
  Bus: {
    speedKmph: 45,
    overheadMinutes: 0,
    ratePerKm: 1.2
  },
  Train: {
    speedKmph: 80,
    overheadMinutes: 30,   // station waiting
    ratePerKm: 0.9
  },
  Flight: {
    speedKmph: 800,
    overheadMinutes: 180,  // checkin + boarding + landing + transfer
    ratePerKm: 8.0
  },
  Car: {
    speedKmph: 60,
    overheadMinutes: 0,
    ratePerKm: 3.5
  }
};

// ─────────────────────────────────────────────
//  Check if mode is valid for a city pair
// ─────────────────────────────────────────────
function getModeAvailability(from, to, mode) {
  const fromRoad = roadOnlyCities.has(from);
  const toRoad   = roadOnlyCities.has(to);

  if (mode === 'Flight') {
    if (fromRoad || toRoad) {
      // Find nearest airport city for context
      return {
        available: false,
        reason: `No airport near ${fromRoad ? from : to}. Consider Bus or Car to reach the nearest city with an airport, then fly.`
      };
    }
    if (!flightCities.has(from) || !flightCities.has(to)) {
      return {
        available: false,
        reason: `No direct flights between ${from} and ${to}. Try Train or Bus instead.`
      };
    }
  }

  if (mode === 'Train') {
    if (fromRoad || toRoad) {
      return {
        available: false,
        reason: `No railway station near ${fromRoad ? from : to}. Road transport (Bus/Car) is the only option.`
      };
    }
    if (!trainCities.has(from) || !trainCities.has(to)) {
      return {
        available: false,
        reason: `No direct train between ${from} and ${to}. Try Bus or Car.`
      };
    }
  }

  return { available: true };
}

// ─────────────────────────────────────────────
//  Hotel & food rates
// ─────────────────────────────────────────────
const hotelRates = {
  Budget:      800,
  'Mid-Range': 2000,
  Luxury:      6000
};

const foodRates = {
  Budget:      300,
  'Mid-Range': 600,
  Luxury:      1400
};

// ─────────────────────────────────────────────
//  GREEDY BUDGET FUNCTION
// ─────────────────────────────────────────────
function greedyBudget({ from, to, mode, days, travelers, hotelTier, distanceKm }) {

  // Step 1 — Check mode validity
  const availability = getModeAvailability(from, to, mode);
  if (!availability.available) {
    return {
      error: true,
      reason: availability.reason,
      suggestion: mode === 'Flight' || mode === 'Train' ? 'Bus' : null
    };
  }

  // Step 2 — Use ORS distance if passed in, else fallback to 400km default
  // distanceKm is passed from the routes handler when available
  const distance = distanceKm || 400;

  // Step 3 — Realistic duration calculation
  const config       = modeConfig[mode] || modeConfig['Bus'];
  const driveMinutes = Math.round((distance / config.speedKmph) * 60);
  const totalMinutes = driveMinutes + config.overheadMinutes;
  const hours        = Math.floor(totalMinutes / 60);
  const mins         = totalMinutes % 60;
  const durationStr  = hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}`.trim() : `${mins}m`;

  // Step 4 — Greedy cost selection (picks cheapest valid option at each step)
  const travelCost = Math.round(distance * config.ratePerKm) * travelers;
  const hotelCost  = (hotelRates[hotelTier] || 800) * days;
  const foodCost   = (foodRates[hotelTier]  || 300) * days * travelers;
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
    distance,
    duration: durationStr,     // ← now realistic per mode
    durationMinutes: totalMinutes
  };
}

module.exports = greedyBudget;