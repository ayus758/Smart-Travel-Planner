
// ─────────────────────────────────────────────
//  COORDINATES  →  for closest-first alternatives
// ─────────────────────────────────────────────
const coordinates = {
  // Uttarakhand
  Mussoorie:  { lat: 30.4598, lng: 78.0664 },
  Dehradun:   { lat: 30.3165, lng: 78.0322 },
  Rishikesh:  { lat: 30.0869, lng: 78.2676 },
  Haridwar:   { lat: 29.9457, lng: 78.1642 },
  Nainital:   { lat: 29.3919, lng: 79.4542 },
  Tehri:      { lat: 30.3780, lng: 78.4322 },
  Auli:       { lat: 30.5289, lng: 79.5638 },
  Chopta:     { lat: 30.4167, lng: 79.2167 },
  Lansdowne:  { lat: 29.8383, lng: 78.6847 },
  Kedarnath:  { lat: 30.7352, lng: 79.0669 },
  Badrinath:  { lat: 30.7433, lng: 79.4938 },
  Chakrata:   { lat: 30.7000, lng: 77.8667 },
  Munsiyari:  { lat: 30.0667, lng: 80.2333 },
  Ranikhet:   { lat: 29.6400, lng: 79.4300 },
  Almora:     { lat: 29.5971, lng: 79.6591 },

  // Himachal Pradesh
  Shimla:       { lat: 31.1048, lng: 77.1734 },
  Manali:       { lat: 32.2432, lng: 77.1892 },
  Dharamshala:  { lat: 32.2190, lng: 76.3234 },
  Kasol:        { lat: 32.0094, lng: 77.3144 },
  Spiti:        { lat: 32.2461, lng: 78.0338 },
  Dalhousie:    { lat: 32.5388, lng: 75.9720 },
  Chail:        { lat: 30.9614, lng: 77.2066 },
  Kullu:        { lat: 31.9579, lng: 77.1095 },
  'Bir Billing':{ lat: 32.0399, lng: 76.7187 },
  Kufri:        { lat: 31.0980, lng: 77.2653 },
  Palampur:     { lat: 32.1103, lng: 76.5366 },
  Narkanda:     { lat: 31.2726, lng: 77.4525 },
  Chitkul:      { lat: 31.3497, lng: 78.4423 },
  Kinnaur:      { lat: 31.5925, lng: 78.2695 },

  // Rajasthan
  Jaipur:        { lat: 26.9124, lng: 75.7873 },
  Udaipur:       { lat: 24.5854, lng: 73.7125 },
  Jodhpur:       { lat: 26.2389, lng: 73.0243 },
  Jaisalmer:     { lat: 26.9157, lng: 70.9083 },
  Pushkar:       { lat: 26.4899, lng: 74.5511 },
  Ajmer:         { lat: 26.4499, lng: 74.6399 },
  Bikaner:       { lat: 28.0229, lng: 73.3119 },
  Ranthambore:   { lat: 26.0173, lng: 76.5026 },
  'Mount Abu':   { lat: 24.5926, lng: 72.7156 },
  Bundi:         { lat: 25.4382, lng: 75.6394 },
  Chittorgarh:   { lat: 24.8887, lng: 74.6269 },
  Kumbhalgarh:   { lat: 25.1484, lng: 73.5877 },
  Mandawa:       { lat: 28.0549, lng: 75.1473 },
  Alwar:         { lat: 27.5530, lng: 76.6346 },

  // North India
  Delhi:       { lat: 28.7041, lng: 77.1025 },
  Agra:        { lat: 27.1767, lng: 78.0081 },
  Mathura:     { lat: 27.4924, lng: 77.6737 },
  Vrindavan:   { lat: 27.5794, lng: 77.6965 },
  Lucknow:     { lat: 26.8467, lng: 80.9462 },
  Varanasi:    { lat: 25.3176, lng: 82.9739 },
  Allahabad:   { lat: 25.4358, lng: 81.8463 },
  Ayodhya:     { lat: 26.7922, lng: 82.1998 },
  Kanpur:      { lat: 26.4499, lng: 80.3319 },
  Meerut:      { lat: 28.9845, lng: 77.7064 },
  Amritsar:    { lat: 31.6340, lng: 74.8723 },
  Chandigarh:  { lat: 30.7333, lng: 76.7794 },
  Ludhiana:    { lat: 30.9010, lng: 75.8573 },
  Gwalior:     { lat: 26.2183, lng: 78.1828 },
  Jhansi:      { lat: 25.4484, lng: 78.5685 },

  // Gujarat
  Ahmedabad:   { lat: 23.0225, lng: 72.5714 },
  Vadodara:    { lat: 22.3072, lng: 73.1812 },
  Surat:       { lat: 21.1702, lng: 72.8311 },
  Rajkot:      { lat: 22.3039, lng: 70.8022 },
  Dwarka:      { lat: 22.2442, lng: 68.9685 },
  Somnath:     { lat: 20.9030, lng: 70.3741 },
  Gir:         { lat: 21.1243, lng: 70.8242 },
  Gandhinagar: { lat: 23.2156, lng: 72.6369 },
  Bhuj:        { lat: 23.2420, lng: 69.6669 },
  Kutch:       { lat: 23.7337, lng: 69.8597 },
  Palitana:    { lat: 21.5239, lng: 71.8225 },
  Diu:         { lat: 20.7144, lng: 70.9874 },
  Saputara:    { lat: 20.5762, lng: 73.7459 },
  Anand:       { lat: 22.5645, lng: 72.9289 },

  // Maharashtra
  Mumbai:          { lat: 19.0760, lng: 72.8777 },
  Pune:            { lat: 18.5204, lng: 73.8567 },
  Nashik:          { lat: 19.9975, lng: 73.7898 },
  Aurangabad:      { lat: 19.8762, lng: 75.3433 },
  Nagpur:          { lat: 21.1458, lng: 79.0882 },
  Lonavala:        { lat: 18.7546, lng: 73.4062 },
  Mahabaleshwar:   { lat: 17.9235, lng: 73.6586 },
  Kolhapur:        { lat: 16.7050, lng: 74.2433 },
  Shirdi:          { lat: 19.7668, lng: 74.4779 },
  Alibaug:         { lat: 18.6414, lng: 72.8722 },
  Matheran:        { lat: 18.9869, lng: 73.2712 },
  Igatpuri:        { lat: 19.6950, lng: 73.5595 },
  Ellora:          { lat: 20.0269, lng: 75.1795 },
  Ajanta:          { lat: 20.5519, lng: 75.7033 },

  // Goa
  Panaji:     { lat: 15.4909, lng: 73.8278 },
  Calangute:  { lat: 15.5440, lng: 73.7552 },
  Baga:       { lat: 15.5560, lng: 73.7515 },
  Anjuna:     { lat: 15.5735, lng: 73.7413 },
  Palolem:    { lat: 15.0100, lng: 74.0232 },
  Margao:     { lat: 15.2832, lng: 73.9862 },
  Vasco:      { lat: 15.3982, lng: 73.8113 },
  Candolim:   { lat: 15.5160, lng: 73.7629 },
  Vagator:    { lat: 15.5994, lng: 73.7443 },
  Arambol:    { lat: 15.6862, lng: 73.7045 },

  // Karnataka
  Bangalore:    { lat: 12.9716, lng: 77.5946 },
  Mysore:       { lat: 12.2958, lng: 76.6394 },
  Coorg:        { lat: 12.3375, lng: 75.8069 },
  Hampi:        { lat: 15.3350, lng: 76.4600 },
  Mangalore:    { lat: 12.9141, lng: 74.8560 },
  Chikmagalur: { lat: 13.3161, lng: 75.7720 },
  Udupi:        { lat: 13.3409, lng: 74.7421 },
  Badami:       { lat: 15.9202, lng: 75.6847 },
  Sakleshpur:   { lat: 12.9469, lng: 75.7866 },
  Hassan:       { lat: 13.0033, lng: 76.1004 },
  Belur:        { lat: 13.1651, lng: 75.8656 },
  Halebidu:     { lat: 13.2131, lng: 75.9940 },
  Dandeli:      { lat: 15.2678, lng: 74.6194 },
  Kabini:       { lat: 11.9477, lng: 76.3542 },

  // Kerala
  Kochi:       { lat: 9.9312,  lng: 76.2673 },
  Munnar:      { lat: 10.0889, lng: 77.0595 },
  Alleppey:    { lat: 9.4981,  lng: 76.3388 },
  Trivandrum:  { lat: 8.5241,  lng: 76.9366 },
  Kozhikode:   { lat: 11.2588, lng: 75.7804 },
  Thekkady:    { lat: 9.5992,  lng: 77.1686 },
  Varkala:     { lat: 8.7379,  lng: 76.7163 },
  Wayanad:     { lat: 11.6854, lng: 76.1320 },
  Thrissur:    { lat: 10.5276, lng: 76.2144 },
  Kollam:      { lat: 8.8932,  lng: 76.6141 },
  Kannur:      { lat: 11.8745, lng: 75.3704 },
  Kovalam:     { lat: 8.4004,  lng: 76.9787 },
  Palakkad:    { lat: 10.7867, lng: 76.6548 },
  Kumarakom:   { lat: 9.6152,  lng: 76.4317 },

  // Tamil Nadu
  Chennai:         { lat: 13.0827, lng: 80.2707 },
  Madurai:         { lat: 9.9252,  lng: 78.1198 },
  Ooty:            { lat: 11.4102, lng: 76.6950 },
  Coimbatore:      { lat: 11.0168, lng: 76.9558 },
  Pondicherry:     { lat: 11.9416, lng: 79.8083 },
  Thanjavur:       { lat: 10.7870, lng: 79.1378 },
  Kanyakumari:     { lat: 8.0883,  lng: 77.5385 },
  Rameswaram:      { lat: 9.2876,  lng: 79.3129 },
  Mahabalipuram:   { lat: 12.6269, lng: 80.1927 },
  Salem:           { lat: 11.6643, lng: 78.1460 },
  Kodaikanal:      { lat: 10.2381, lng: 77.4892 },
  Vellore:         { lat: 12.9165, lng: 79.1325 },

  // Andhra / Telangana
  Hyderabad:       { lat: 17.3850, lng: 78.4867 },
  Visakhapatnam:   { lat: 17.6868, lng: 83.2185 },
  Tirupati:        { lat: 13.6288, lng: 79.4192 },
  Vijayawada:      { lat: 16.5062, lng: 80.6480 },
  Warangal:        { lat: 17.9784, lng: 79.5941 },
  'Araku Valley':  { lat: 18.3273, lng: 82.8751 },
  Nagarjunasagar:  { lat: 16.5743, lng: 79.3191 },
  'Horsley Hills': { lat: 13.6604, lng: 78.3997 },

  // West Bengal
  Kolkata:       { lat: 22.5726, lng: 88.3639 },
  Darjeeling:    { lat: 27.0360, lng: 88.2627 },
  Siliguri:      { lat: 26.7271, lng: 88.3953 },
  Kalimpong:     { lat: 27.0660, lng: 88.4720 },
  Sundarbans:    { lat: 21.9497, lng: 89.1833 },
  Digha:         { lat: 21.6265, lng: 87.5076 },
  Murshidabad:   { lat: 24.1837, lng: 88.2697 },
  Bishnupur:     { lat: 23.0726, lng: 87.3193 },
  Shantiniketan: { lat: 23.6793, lng: 87.6856 },

  // Northeast
  Guwahati:      { lat: 26.1445, lng: 91.7362 },
  Shillong:      { lat: 25.5788, lng: 91.8933 },
  Cherrapunji:   { lat: 25.2800, lng: 91.7200 },
  Kaziranga:     { lat: 26.5775, lng: 93.1711 },
  Tawang:        { lat: 27.5859, lng: 91.8594 },
  Ziro:          { lat: 27.5428, lng: 93.8278 },
  Majuli:        { lat: 26.9500, lng: 94.1667 },
  Gangtok:       { lat: 27.3389, lng: 88.6065 },
  Lachung:       { lat: 27.6897, lng: 88.7464 },
  Imphal:        { lat: 24.8170, lng: 93.9368 },
  Agartala:      { lat: 23.8315, lng: 91.2868 },
  Aizawl:        { lat: 23.7271, lng: 92.7176 },
  Kohima:        { lat: 25.6701, lng: 94.1077 },
  'Dzukou Valley':{ lat: 25.5400, lng: 94.0900 },

  // Odisha
  Bhubaneswar: { lat: 20.2961, lng: 85.8245 },
  Puri:        { lat: 19.8135, lng: 85.8312 },
  Konark:      { lat: 19.8876, lng: 86.0948 },
  Chilika:     { lat: 19.7167, lng: 85.3167 },
  Cuttack:     { lat: 20.4625, lng: 85.8830 },
  Sambalpur:   { lat: 21.4669, lng: 83.9756 },
  Simlipal:    { lat: 21.6458, lng: 86.2706 },

  // Bihar / Jharkhand
  Patna:     { lat: 25.5941, lng: 85.1376 },
  Gaya:      { lat: 24.7914, lng: 85.0002 },
  Bodhgaya:  { lat: 24.6959, lng: 84.9916 },
  Rajgir:    { lat: 25.0292, lng: 85.4190 },
  Nalanda:   { lat: 25.1369, lng: 85.4439 },
  Ranchi:    { lat: 23.3441, lng: 85.3096 },
  Jamshedpur:{ lat: 22.8046, lng: 86.2029 },
  Deoghar:   { lat: 24.4853, lng: 86.6945 },
  Netarhat:  { lat: 23.4833, lng: 84.2667 },

  // Madhya Pradesh
  Bhopal:      { lat: 23.2599, lng: 77.4126 },
  Indore:      { lat: 22.7196, lng: 75.8577 },
  Ujjain:      { lat: 23.1765, lng: 75.7885 },
  Jabalpur:    { lat: 23.1815, lng: 79.9864 },
  Khajuraho:   { lat: 24.8318, lng: 79.9199 },
  Orchha:      { lat: 25.3519, lng: 78.6415 },
  Pachmarhi:   { lat: 22.4674, lng: 78.4340 },
  Bandhavgarh: { lat: 23.7150, lng: 81.0367 },
  Kanha:       { lat: 22.3322, lng: 80.6115 },

  // Ladakh / Kashmir
  Leh:           { lat: 34.1526, lng: 77.5771 },
  'Nubra Valley':{ lat: 34.6500, lng: 77.5500 },
  'Pangong Lake':{ lat: 33.7500, lng: 78.7500 },
  Srinagar:      { lat: 34.0837, lng: 74.7973 },
  Gulmarg:       { lat: 34.0484, lng: 74.3805 },
  Pahalgam:      { lat: 34.0161, lng: 75.3150 },
  Sonamarg:      { lat: 34.3000, lng: 75.2833 },
  'Dal Lake':    { lat: 34.1000, lng: 74.8500 },
  Kargil:        { lat: 34.5539, lng: 76.1349 },
  Jammu:         { lat: 32.7266, lng: 74.8570 }
};

// ─────────────────────────────────────────────
//  REGION MAP
// ─────────────────────────────────────────────
const regionMap = {
  uttarakhand: {
    label: 'Uttarakhand',
    cities: ['Mussoorie', 'Nainital', 'Rishikesh', 'Haridwar', 'Dehradun',
             'Kedarnath', 'Badrinath', 'Auli', 'Chopta', 'Lansdowne',
             'Tehri', 'Chakrata', 'Munsiyari', 'Ranikhet', 'Almora']
  },
  himachal: {
    label: 'Himachal Pradesh',
    cities: ['Shimla', 'Manali', 'Dharamshala', 'Kasol', 'Spiti',
             'Dalhousie', 'Chail', 'Kullu', 'Bir Billing', 'Kufri',
             'Palampur', 'Narkanda', 'Chitkul', 'Kinnaur']
  },
  rajasthan: {
    label: 'Rajasthan',
    cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar',
             'Ajmer', 'Bikaner', 'Ranthambore', 'Mount Abu', 'Bundi',
             'Chittorgarh', 'Kumbhalgarh', 'Mandawa', 'Alwar']
  },
  north_india: {
    label: 'North India',
    cities: ['Delhi', 'Agra', 'Mathura', 'Vrindavan', 'Lucknow',
             'Varanasi', 'Allahabad', 'Ayodhya', 'Kanpur', 'Meerut',
             'Amritsar', 'Chandigarh', 'Ludhiana', 'Gwalior', 'Jhansi']
  },
  gujarat: {
    label: 'Gujarat',
    cities: ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Dwarka',
             'Somnath', 'Gir', 'Gandhinagar', 'Bhuj', 'Kutch',
             'Palitana', 'Diu', 'Saputara', 'Anand']
  },
  maharashtra: {
    label: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur',
             'Lonavala', 'Mahabaleshwar', 'Kolhapur', 'Shirdi',
             'Alibaug', 'Matheran', 'Igatpuri', 'Ellora', 'Ajanta']
  },
  goa: {
    label: 'Goa',
    cities: ['Panaji', 'Calangute', 'Baga', 'Anjuna', 'Palolem',
             'Margao', 'Vasco', 'Candolim', 'Vagator', 'Arambol']
  },
  karnataka: {
    label: 'Karnataka',
    cities: ['Bangalore', 'Mysore', 'Coorg', 'Hampi', 'Mangalore',
             'Chikmagalur', 'Udupi', 'Badami', 'Sakleshpur', 'Hassan',
             'Belur', 'Halebidu', 'Dandeli', 'Kabini']
  },
  kerala: {
    label: 'Kerala',
    cities: ['Kochi', 'Munnar', 'Alleppey', 'Trivandrum', 'Kozhikode',
             'Thekkady', 'Varkala', 'Wayanad', 'Thrissur', 'Kollam',
             'Kannur', 'Kovalam', 'Palakkad', 'Kumarakom']
  },
  tamil_nadu: {
    label: 'Tamil Nadu',
    cities: ['Chennai', 'Madurai', 'Ooty', 'Coimbatore', 'Pondicherry',
             'Thanjavur', 'Kanyakumari', 'Rameswaram', 'Mahabalipuram',
             'Salem', 'Kodaikanal', 'Vellore']
  },
  andhra: {
    label: 'Andhra Pradesh & Telangana',
    cities: ['Hyderabad', 'Visakhapatnam', 'Tirupati', 'Vijayawada',
             'Warangal', 'Araku Valley', 'Nagarjunasagar', 'Horsley Hills']
  },
  west_bengal: {
    label: 'West Bengal',
    cities: ['Kolkata', 'Darjeeling', 'Siliguri', 'Kalimpong',
             'Sundarbans', 'Digha', 'Murshidabad', 'Bishnupur', 'Shantiniketan']
  },
  northeast: {
    label: 'North East India',
    cities: ['Guwahati', 'Shillong', 'Cherrapunji', 'Kaziranga',
             'Tawang', 'Ziro', 'Majuli', 'Gangtok', 'Lachung',
             'Imphal', 'Agartala', 'Aizawl', 'Kohima', 'Dzukou Valley']
  },
  odisha: {
    label: 'Odisha',
    cities: ['Bhubaneswar', 'Puri', 'Konark', 'Chilika', 'Cuttack',
             'Sambalpur', 'Simlipal']
  },
  bihar_jharkhand: {
    label: 'Bihar & Jharkhand',
    cities: ['Patna', 'Gaya', 'Bodhgaya', 'Rajgir', 'Nalanda',
             'Ranchi', 'Jamshedpur', 'Deoghar', 'Netarhat']
  },
  madhya_pradesh: {
    label: 'Madhya Pradesh',
    cities: ['Bhopal', 'Indore', 'Gwalior', 'Ujjain', 'Jabalpur',
             'Khajuraho', 'Orchha', 'Pachmarhi', 'Bandhavgarh', 'Kanha']
  },
  ladakh_kashmir: {
    label: 'Ladakh & Kashmir',
    cities: ['Leh', 'Nubra Valley', 'Pangong Lake', 'Srinagar',
             'Gulmarg', 'Pahalgam', 'Sonamarg', 'Dal Lake', 'Kargil']
  }
};

// ─────────────────────────────────────────────
//  CITY → REGION lookup (auto-built)
// ─────────────────────────────────────────────
const cityRegion = {};
for (const [regionKey, regionData] of Object.entries(regionMap)) {
  for (const city of regionData.cities) {
    cityRegion[city] = regionKey;
  }
}

// ─────────────────────────────────────────────
//  DISTANCE HELPER (lat/lng based)
// ─────────────────────────────────────────────
function getCoordDistance(city1, city2) {
  const c1 = coordinates[city1];
  const c2 = coordinates[city2];
  if (!c1 || !c2) return 9999;
  const dx = c1.lat - c2.lat;
  const dy = c1.lng - c2.lng;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─────────────────────────────────────────────
//  REGIONAL ALTERNATIVES  (closest first)
// ─────────────────────────────────────────────
function getRegionalAlternatives(city, limit = 5) {
  const region = cityRegion[city];
  if (!region) return [];
  return regionMap[region].cities
    .filter(c => c !== city)
    .map(c => ({
      city: c,
      region: regionMap[region].label,
      approxDistanceKm: Math.round(getCoordDistance(city, c) * 111)
    }))
    .sort((a, b) => a.approxDistanceKm - b.approxDistanceKm)
    .slice(0, limit);
}

// ─────────────────────────────────────────────
//  CITY GRAPH  (for Dijkstra / BFS / DFS)
// ─────────────────────────────────────────────
const cityGraph = {
  // North India
  Delhi:      { Agra: 204, Jaipur: 281, Lucknow: 555, Haridwar: 214, Chandigarh: 250, Amritsar: 452, Mathura: 145, Dehradun: 300 },
  Agra:       { Delhi: 204, Jaipur: 238, Lucknow: 368, Varanasi: 679, Gwalior: 119, Mathura: 58 },
  Mathura:    { Delhi: 145, Agra: 58, Vrindavan: 12 },
  Vrindavan:  { Mathura: 12, Agra: 70 },
  Lucknow:    { Delhi: 555, Varanasi: 286, Agra: 368, Kanpur: 80, Allahabad: 200, Ayodhya: 135 },
  Varanasi:   { Lucknow: 286, Agra: 679, Delhi: 821, Allahabad: 125, Patna: 250, Gaya: 250 },
  Kanpur:     { Lucknow: 80, Agra: 290, Allahabad: 190 },
  Allahabad:  { Lucknow: 200, Varanasi: 125, Kanpur: 190 },
  Ayodhya:    { Lucknow: 135, Varanasi: 200 },
  Amritsar:   { Delhi: 452, Chandigarh: 210, Ludhiana: 140 },
  Ludhiana:   { Amritsar: 140, Chandigarh: 100 },
  Jammu:      { Delhi: 586, Amritsar: 208, Srinagar: 300 },

  // Uttarakhand
  Haridwar:   { Delhi: 214, Rishikesh: 24, Dehradun: 55, Nainital: 280 },
  Rishikesh:  { Haridwar: 24, Mussoorie: 75, Delhi: 240, Dehradun: 45 },
  Dehradun:   { Delhi: 300, Haridwar: 55, Mussoorie: 35, Rishikesh: 45 },
  Mussoorie:  { Delhi: 290, Dehradun: 35, Nainital: 327, Rishikesh: 75 },
  Nainital:   { Delhi: 317, Mussoorie: 327, Lucknow: 396, Haridwar: 280 },

  // Himachal Pradesh
  Chandigarh:  { Delhi: 250, Shimla: 115, Amritsar: 210, Manali: 310, Dharamshala: 230 },
  Shimla:      { Delhi: 343, Manali: 270, Chandigarh: 115 },
  Manali:      { Shimla: 270, Delhi: 536, Chandigarh: 310, Leh: 480 },
  Dharamshala: { Chandigarh: 230, Shimla: 320, Amritsar: 200 },

  // Rajasthan
  Jaipur:      { Delhi: 281, Agra: 238, Mumbai: 1153, Udaipur: 393, Jodhpur: 335, Ajmer: 135, Bikaner: 330 },
  Udaipur:     { Jaipur: 393, Jodhpur: 250, Ahmedabad: 262, Mumbai: 780, 'Mount Abu': 163 },
  Jodhpur:     { Jaipur: 335, Udaipur: 250, Jaisalmer: 285, Bikaner: 240 },
  Jaisalmer:   { Jodhpur: 285, Bikaner: 330 },
  Bikaner:     { Jaipur: 330, Jodhpur: 240, Jaisalmer: 330 },
  Ajmer:       { Jaipur: 135, Udaipur: 280 },
  Pushkar:     { Ajmer: 15, Jaipur: 145 },
  'Mount Abu': { Udaipur: 163, Ahmedabad: 220 },

  // Madhya Pradesh
  Bhopal:      { Gwalior: 423, Indore: 200, Jabalpur: 330, Nagpur: 360 },
  Indore:      { Bhopal: 200, Ahmedabad: 395, Mumbai: 586, Nagpur: 470, Ujjain: 55 },
  Gwalior:     { Agra: 119, Bhopal: 423, Jhansi: 100 },
  Jhansi:      { Gwalior: 100, Bhopal: 320, Khajuraho: 175, Orchha: 18 },
  Jabalpur:    { Bhopal: 330, Nagpur: 290 },
  Khajuraho:   { Jhansi: 175, Allahabad: 330 },
  Orchha:      { Jhansi: 18, Gwalior: 118 },
  Ujjain:      { Indore: 55, Bhopal: 190 },

  // Gujarat
  Ahmedabad:   { Jaipur: 670, Udaipur: 262, Mumbai: 525, Indore: 395, Vadodara: 110, Dwarka: 450, Somnath: 400 },
  Vadodara:    { Ahmedabad: 110, Surat: 155, Mumbai: 410 },
  Surat:       { Ahmedabad: 265, Vadodara: 155, Mumbai: 280 },
  Rajkot:      { Ahmedabad: 220, Dwarka: 220, Somnath: 185 },
  Dwarka:      { Ahmedabad: 450, Rajkot: 220 },
  Somnath:     { Ahmedabad: 400, Rajkot: 185 },

  // Maharashtra
  Mumbai:          { Jaipur: 1153, Pune: 148, Panaji: 590, Indore: 586, Nashik: 165, Aurangabad: 340, Nagpur: 875, Hyderabad: 710, Surat: 280 },
  Pune:            { Mumbai: 148, Panaji: 450, Nashik: 210, Hyderabad: 565, Aurangabad: 235, Lonavala: 65, Mahabaleshwar: 120 },
  Nashik:          { Mumbai: 165, Pune: 210, Aurangabad: 190, Shirdi: 90 },
  Aurangabad:      { Mumbai: 340, Nashik: 190, Pune: 235, Hyderabad: 520 },
  Nagpur:          { Mumbai: 875, Bhopal: 360, Jabalpur: 290, Hyderabad: 500 },
  Lonavala:        { Mumbai: 83, Pune: 65 },
  Mahabaleshwar:   { Pune: 120, Mumbai: 260 },
  Shirdi:          { Mumbai: 240, Nashik: 90, Pune: 180 },

  // Goa
  Panaji:      { Mumbai: 590, Pune: 460, Bangalore: 560, Mangalore: 380 },

  // Karnataka
  Bangalore:   { Chennai: 345, Hyderabad: 570, Mysore: 145, Panaji: 560, Ooty: 270, Coimbatore: 365, Mangalore: 355, Madurai: 460, Hampi: 340, Chikmagalur: 245, Tirupati: 300 },
  Mysore:      { Bangalore: 145, Ooty: 135, Coimbatore: 215, Madurai: 465, Coorg: 120 },
  Hampi:       { Bangalore: 340, Hyderabad: 380 },
  Mangalore:   { Bangalore: 355, Panaji: 380, Kochi: 460 },
  Chikmagalur: { Bangalore: 245, Mangalore: 165, Mysore: 185 },
  Coorg:       { Bangalore: 265, Mysore: 120, Mangalore: 175 },

  // Kerala
  Kochi:       { Munnar: 130, Trivandrum: 200, Kozhikode: 220, Alleppey: 60, Thekkady: 190 },
  Munnar:      { Kochi: 130, Ooty: 160, Thekkady: 90 },
  Alleppey:    { Kochi: 60, Trivandrum: 155 },
  Trivandrum:  { Kochi: 200, Alleppey: 155, Madurai: 240, Kanyakumari: 90 },
  Kozhikode:   { Kochi: 220, Mysore: 255, Wayanad: 100 },
  Thekkady:    { Kochi: 190, Munnar: 90, Madurai: 140 },
  Wayanad:     { Kozhikode: 100, Bangalore: 275, Mysore: 175 },
  Varkala:     { Trivandrum: 50, Alleppey: 105 },

  // Tamil Nadu
  Chennai:         { Bangalore: 345, Hyderabad: 630, Madurai: 460, Pondicherry: 170, Coimbatore: 500, Mahabalipuram: 58, Tirupati: 140 },
  Madurai:         { Chennai: 460, Bangalore: 460, Coimbatore: 210, Trivandrum: 240, Thekkady: 140, Rameswaram: 170, Kodaikanal: 120 },
  Ooty:            { Munnar: 160, Mysore: 135, Coimbatore: 90, Bangalore: 270 },
  Coimbatore:      { Ooty: 90, Bangalore: 365, Chennai: 500, Mysore: 215, Madurai: 210 },
  Pondicherry:     { Chennai: 170, Madurai: 310, Mahabalipuram: 96 },
  Kodaikanal:      { Madurai: 120, Coimbatore: 175 },
  Rameswaram:      { Madurai: 170, Chennai: 560 },
  Kanyakumari:     { Trivandrum: 90, Madurai: 240 },
  Mahabalipuram:   { Chennai: 58, Pondicherry: 96 },
  Tirupati:        { Chennai: 140, Bangalore: 300, Hyderabad: 540 },

  // Andhra / Telangana
  Hyderabad:       { Mumbai: 710, Bangalore: 570, Chennai: 630, Nagpur: 500, Pune: 565, Visakhapatnam: 630, Panaji: 720, Aurangabad: 520, Hampi: 380, Tirupati: 540 },
  Visakhapatnam:   { Hyderabad: 630, Chennai: 710, Bhubaneswar: 440 },

  // Odisha
  Bhubaneswar: { Kolkata: 440, Visakhapatnam: 440, Puri: 65, Cuttack: 30 },
  Puri:        { Bhubaneswar: 65 },
  Cuttack:     { Bhubaneswar: 30, Kolkata: 460 },

  // West Bengal
  Kolkata:     { Darjeeling: 618, Patna: 585, Bhubaneswar: 440, Siliguri: 570, Ranchi: 410, Varanasi: 670 },
  Darjeeling:  { Kolkata: 618, Siliguri: 73, Gangtok: 100 },
  Siliguri:    { Darjeeling: 73, Kolkata: 570, Guwahati: 440, Gangtok: 120 },

  // Bihar / Jharkhand
  Patna:       { Varanasi: 250, Gaya: 100, Kolkata: 585, Ranchi: 330 },
  Gaya:        { Patna: 100, Varanasi: 250, Kolkata: 495 },
  Bodhgaya:    { Gaya: 13, Patna: 110 },
  Ranchi:      { Patna: 330, Kolkata: 410, Bhubaneswar: 440 },

  // Northeast
  Guwahati:    { Siliguri: 440, Shillong: 100 },
  Shillong:    { Guwahati: 100, Cherrapunji: 55 },
  Cherrapunji: { Shillong: 55, Guwahati: 148 },
  Gangtok:     { Siliguri: 120, Darjeeling: 100 },

  // Ladakh / Kashmir
  Srinagar:    { Jammu: 300, Gulmarg: 52, Pahalgam: 95 },
  Leh:         { Manali: 480, Srinagar: 430 },
  Gulmarg:     { Srinagar: 52 },
  Pahalgam:    { Srinagar: 95 }
};

const cityList = Object.keys(cityGraph);

module.exports = { cityGraph, cityList, regionMap, cityRegion, coordinates, getRegionalAlternatives };
