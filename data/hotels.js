const hotels = [
  // Delhi
  { name: 'The Imperial Delhi',      city: 'Delhi',      price: 8000,  rating: 4.8, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa'] },
  { name: 'Hotel Broadway Delhi',    city: 'Delhi',      price: 2200,  rating: 4.1, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Delhi',            city: 'Delhi',      price: 700,   rating: 3.8, tier: 'Budget',    amenities: ['WiFi'] },

  // Agra
  { name: 'Oberoi Amarvilas',        city: 'Agra',       price: 45000, rating: 4.9, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa', 'Taj View'] },
  { name: 'Hotel Kamal Agra',        city: 'Agra',       price: 1800,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Agra',             city: 'Agra',       price: 650,   rating: 3.7, tier: 'Budget',    amenities: ['WiFi'] },

  // Jaipur
  { name: 'Rambagh Palace',          city: 'Jaipur',     price: 35000, rating: 4.9, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa'] },
  { name: 'Hotel Pearl Palace',      city: 'Jaipur',     price: 1500,  rating: 4.3, tier: 'Mid-Range', amenities: ['WiFi', 'AC', 'Rooftop'] },
  { name: 'Moustache Jaipur',        city: 'Jaipur',     price: 750,   rating: 4.0, tier: 'Budget',    amenities: ['WiFi'] },

  // Mumbai
  { name: 'Taj Mahal Palace Mumbai', city: 'Mumbai',     price: 25000, rating: 4.9, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa', 'Sea View'] },
  { name: 'Hotel Residency Mumbai',  city: 'Mumbai',     price: 2500,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Mumbai',           city: 'Mumbai',     price: 800,   rating: 3.9, tier: 'Budget',    amenities: ['WiFi'] },

  // Varanasi
  { name: 'Taj Ganges Varanasi',     city: 'Varanasi',   price: 12000, rating: 4.7, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa'] },
  { name: 'Hotel Alka Varanasi',     city: 'Varanasi',   price: 1600,  rating: 4.1, tier: 'Mid-Range', amenities: ['WiFi', 'Ganga View'] },
  { name: 'Stops Hostel Varanasi',   city: 'Varanasi',   price: 600,   rating: 3.9, tier: 'Budget',    amenities: ['WiFi'] },

  // Lucknow
  { name: 'Taj Mahal Lucknow',       city: 'Lucknow',    price: 9000,  rating: 4.7, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Spa'] },
  { name: 'Piccadily Hotel Lucknow', city: 'Lucknow',    price: 2000,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Lucknow',          city: 'Lucknow',    price: 700,   rating: 3.7, tier: 'Budget',    amenities: ['WiFi'] },

  // Shimla
  { name: 'Wildflower Hall Shimla',  city: 'Shimla',     price: 18000, rating: 4.8, tier: 'Luxury',    amenities: ['WiFi', 'Spa', 'Mountain View'] },
  { name: 'Hotel Combermere',        city: 'Shimla',     price: 2200,  rating: 4.1, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Hosteller Shimla',        city: 'Shimla',     price: 700,   rating: 3.8, tier: 'Budget',    amenities: ['WiFi'] },

  // Manali
  { name: 'Span Resort Manali',      city: 'Manali',     price: 14000, rating: 4.7, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'River View'] },
  { name: 'Hotel Rohtang Manali',    city: 'Manali',     price: 1800,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'Mountain View'] },
  { name: 'Zostel Manali',           city: 'Manali',     price: 750,   rating: 4.1, tier: 'Budget',    amenities: ['WiFi'] },

  // Mussoorie
  { name: 'Jaypee Residency Manor',  city: 'Mussoorie',  price: 10000, rating: 4.6, tier: 'Luxury',    amenities: ['WiFi', 'Pool', 'Valley View'] },
  { name: 'Hotel Padmini Nivas',     city: 'Mussoorie',  price: 1800,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Hosteller Mussoorie',     city: 'Mussoorie',  price: 700,   rating: 3.9, tier: 'Budget',    amenities: ['WiFi'] },

  // Nainital
  { name: 'The Naini Retreat',       city: 'Nainital',   price: 9000,  rating: 4.6, tier: 'Luxury',    amenities: ['WiFi', 'Lake View', 'Spa'] },
  { name: 'Hotel Shervani Nainital', city: 'Nainital',   price: 2000,  rating: 4.1, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Nainital',         city: 'Nainital',   price: 700,   rating: 4.0, tier: 'Budget',    amenities: ['WiFi'] },

  // Darjeeling
  { name: 'Mayfair Darjeeling',      city: 'Darjeeling', price: 12000, rating: 4.7, tier: 'Luxury',    amenities: ['WiFi', 'Himalaya View', 'Spa'] },
  { name: 'Hotel Windamere',         city: 'Darjeeling', price: 2500,  rating: 4.2, tier: 'Mid-Range', amenities: ['WiFi', 'Tea Garden View'] },
  { name: 'Zostel Darjeeling',       city: 'Darjeeling', price: 700,   rating: 4.0, tier: 'Budget',    amenities: ['WiFi'] },

  // Ooty
  { name: 'Savoy Hotel Ooty',        city: 'Ooty',       price: 11000, rating: 4.6, tier: 'Luxury',    amenities: ['WiFi', 'Garden', 'Spa'] },
  { name: 'Hotel Lakeview Ooty',     city: 'Ooty',       price: 1800,  rating: 4.0, tier: 'Mid-Range', amenities: ['WiFi', 'Lake View'] },
  { name: 'Zostel Ooty',             city: 'Ooty',       price: 700,   rating: 3.8, tier: 'Budget',    amenities: ['WiFi'] },

  // Munnar
  { name: 'Windermere Estate Munnar',city: 'Munnar',     price: 13000, rating: 4.8, tier: 'Luxury',    amenities: ['WiFi', 'Tea Estate View', 'Spa'] },
  { name: 'Hotel Munnar Castle',     city: 'Munnar',     price: 2000,  rating: 4.1, tier: 'Mid-Range', amenities: ['WiFi', 'AC'] },
  { name: 'Zostel Munnar',           city: 'Munnar',     price: 750,   rating: 4.0, tier: 'Budget',    amenities: ['WiFi'] }
];

module.exports = hotels;