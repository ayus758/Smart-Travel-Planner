/* ============================================
   SmartTrip — script.js
   Backend: http://localhost:5000
   ============================================ */

const API = 'http://localhost:5000';

/* ─────────────────────────────────────────────
   CITIES DATALIST — fetch from backend
───────────────────────────────────────────── */
(async () => {
  try {
    const res  = await fetch(`${API}/api/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&mode=${encodeURIComponent(selectedMode)}`);
    if (!res.ok) return;
    const data = await res.json();
    const cities = Array.isArray(data) ? data : data.cities || [];
    const dl = document.getElementById('cityList');
    if (dl && cities.length) {
      dl.innerHTML = cities.map(c => `<option>${c}</option>`).join('');
    }
  } catch (_) {}
})();

/* ─────────────────────────────────────────────
   INJECT HOTELS SECTION
───────────────────────────────────────────── */
const hotelsHTML = `
<section class="hotels-section" id="hotels-section">
  <div class="section-inner">
    <div class="section-header">
      <p class="section-tag">Where to stay</p>
      <h2 class="section-title">Find your <em>perfect hotel</em></h2>
      <p class="section-sub">Search hotels by city or auto-filled from your route destination.</p>
    </div>
    <div class="hotel-search-bar">
      <input type="text" id="hotelCityInput" list="cityList" placeholder="Enter city e.g. Manali" autocomplete="off"/>
      <button class="hotel-search-btn" id="hotelSearchBtn" onclick="searchHotels()">
        <span id="hotelBtnText">Search Hotels</span>
        <span id="hotelBtnLoader" class="btn-loader hidden">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        </span>
      </button>
    </div>
    <div class="hotels-grid" id="hotelsGrid">
      <p class="hotels-empty">Search a city above to see available hotels.</p>
    </div>
  </div>
</section>`;

const algoSection = document.querySelector('.algo-section');
if (algoSection) algoSection.insertAdjacentHTML('beforebegin', hotelsHTML);

// Add Hotels to navbar
const navLinks = document.querySelector('.nav-links');
if (navLinks) {
  const li = document.createElement('li');
  li.innerHTML = `<a href="#hotels-section">Hotels</a>`;
  navLinks.appendChild(li);
}

/* ─────────────────────────────────────────────
   SWAP CITIES
───────────────────────────────────────────── */
function swapCities() {
  const from = document.getElementById('fromInput');
  const to   = document.getElementById('toInput');
  [from.value, to.value] = [to.value, from.value];
}

/* ─────────────────────────────────────────────
   MODE CHIPS
───────────────────────────────────────────── */
let selectedMode = 'all';
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedMode = chip.dataset.mode;
  });
});

/* ─────────────────────────────────────────────
   CANVAS — draw route path dynamically
───────────────────────────────────────────── */
let currentRouteData = null;
let selectedRouteKey = 'shortest';

function drawRouteCanvas(routeKey = 'shortest') {
  const canvas = document.getElementById('routeCanvas');
  if (!canvas || !currentRouteData) return;

  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const routes = currentRouteData.routes || {};
  const route  = routes[routeKey];
  if (!route || !route.path || !route.path.length) return;

  const path   = route.path;
  const count  = path.length;
  const padX   = 60;
  const padY   = 40;
  const usableW = W - padX * 2;
  const midY   = H / 2;

  // Color per route type
  const colors = {
    shortest: '#16a34a',
    fastest:  '#d97706',
    cheapest: '#2563eb'
  };
  const lineColor = colors[routeKey] || '#16a34a';

  // Spread nodes evenly
  const nodes = path.map((city, i) => ({
    city,
    x: count === 1 ? W / 2 : padX + (usableW / (count - 1)) * i,
    y: midY + (i % 2 === 0 ? 0 : (i % 4 === 1 ? -28 : 28))
  }));

  // Draw grid lines (subtle)
  ctx.strokeStyle = '#f0f0f0';
  ctx.lineWidth   = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  // Draw edges with animated-looking gradient
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    grad.addColorStop(0, lineColor + 'cc');
    grad.addColorStop(1, lineColor);
    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 3;
    ctx.setLineDash([]);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Arrow head
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    const mx    = (a.x + b.x) / 2;
    const my    = (a.y + b.y) / 2;
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.fillStyle = lineColor;
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw nodes
  nodes.forEach((n, i) => {
    const isStart = i === 0;
    const isEnd   = i === nodes.length - 1;
    const r       = isStart || isEnd ? 14 : 10;
    const fill    = isStart ? '#2563eb' : isEnd ? lineColor : '#fff';
    const stroke  = isStart ? '#1d4ed8' : isEnd ? lineColor : lineColor;

    // Shadow
    ctx.shadowColor   = lineColor + '44';
    ctx.shadowBlur    = isStart || isEnd ? 14 : 6;

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle   = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth   = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // City label
    ctx.font      = `${isStart || isEnd ? 'bold ' : ''}12px Sora, sans-serif`;
    ctx.fillStyle = '#1a1a2e';
    ctx.textAlign = 'center';
    const labelY  = n.y > midY ? n.y + r + 18 : n.y - r - 8;
    ctx.fillText(n.city, n.x, labelY);

    // Distance label on edge
    if (i < nodes.length - 1) {
      const b  = nodes[i + 1];
      ctx.font      = '10px Sora, sans-serif';
      ctx.fillStyle = '#888';
      ctx.textAlign = 'center';
    }
  });

  // Route type legend badge
  const labels  = { shortest: '📍 Shortest', fastest: '⚡ Fastest', cheapest: '💰 Budget' };
  const statStr = routeKey === 'fastest'
    ? formatMins(routes[routeKey]?.timeMinutes)
    : routeKey === 'cheapest'
    ? `₹${routes[routeKey]?.costRupees}`
    : `${routes[routeKey]?.distanceKm} km`;

  ctx.fillStyle = lineColor;
  ctx.font      = 'bold 13px Sora, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${labels[routeKey]}  •  ${statStr}`, 16, H - 14);
}

function selectRouteOnCanvas(routeKey) {
  selectedRouteKey = routeKey;
  // Update selector buttons
  document.querySelectorAll('.canvas-route-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === routeKey);
  });
  drawRouteCanvas(routeKey);
}

/* ─────────────────────────────────────────────
   ROUTE SEARCH — /api/routes
───────────────────────────────────────────── */
async function triggerSearch() {
  const from  = document.getElementById('fromInput').value.trim();
  const to    = document.getElementById('toInput').value.trim();
  const errEl = document.getElementById('errorMsg');
  const resEl = document.getElementById('resultsSection');

  errEl.classList.add('hidden');
  resEl.classList.add('hidden');

  // Edge case validation
  if (!from || !to) {
    showError(errEl, 'Please enter both origin and destination cities.');
    return;
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    showError(errEl, 'Origin and destination cannot be the same city.');
    return;
  }
  if (from.length < 2 || to.length < 2) {
    showError(errEl, 'City names must be at least 2 characters.');
    return;
  }

  setLoading('searchBtn', 'searchBtnText', 'searchBtnLoader', true);

  try {
    const res  = await fetch(`${API}/api/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    const data = await res.json();

    if (!res.ok) {
      showError(errEl, data.message || data.error || `City not found. Try a different city name.`);
      return;
    }
    if (!data.routes) {
      showError(errEl, 'No routes found between these cities.');
      return;
    }

    currentRouteData = data;
    selectedRouteKey = 'shortest';

    renderRoutes(data, from, to);
    loadCityWeather(to);

    // Auto-fill hotels
    const hotelInput = document.getElementById('hotelCityInput');
    if (hotelInput) {
      hotelInput.value = to;
      searchHotels(to);
    }

  } catch (err) {
    showError(errEl, 'Could not connect to the server. Make sure backend is running on port 5000.');
  } finally {
    setLoading('searchBtn', 'searchBtnText', 'searchBtnLoader', false);
  }
}

function renderRoutes(data, from, to) {
  const resEl     = document.getElementById('resultsSection');
  const label     = document.getElementById('resultsLabel');
  const cards     = document.getElementById('routeCards');
  const altsEl    = document.getElementById('altsSection');
  const altsChips = document.getElementById('altsChips');

  label.textContent = `${from} → ${to}`;
  cards.innerHTML   = '';

  const routes = data.routes || {};

  // ── Canvas section ──
  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'canvas-wrap';
  canvasWrap.innerHTML = `
    <div class="canvas-selector">
      <button class="canvas-route-btn active" data-route="shortest" onclick="selectRouteOnCanvas('shortest')">📍 Shortest</button>
      <button class="canvas-route-btn" data-route="fastest"  onclick="selectRouteOnCanvas('fastest')">⚡ Fastest</button>
      <button class="canvas-route-btn" data-route="cheapest" onclick="selectRouteOnCanvas('cheapest')">💰 Budget</button>
    </div>
    <canvas id="routeCanvas" width="680" height="200" style="width:100%;height:auto;border-radius:12px;background:#fafafa;border:1px solid #eee;"></canvas>`;
  cards.appendChild(canvasWrap);

  // Draw canvas after DOM update
  setTimeout(() => drawRouteCanvas('shortest'), 50);

  // ── Route cards ──
  const routeList = [
    { key: 'shortest', icon: '📍', statLabel: 'Distance', statVal: routes.shortest ? `${routes.shortest.distanceKm} km` : null,               best: false },
    { key: 'fastest',  icon: '⚡', statLabel: 'Duration',  statVal: routes.fastest  ? formatMins(routes.fastest.timeMinutes) : null,            best: true  },
    { key: 'cheapest', icon: '💰', statLabel: 'Cost',      statVal: routes.cheapest ? `₹${routes.cheapest.costRupees}` : null,                  best: false },
  ];

  routeList.forEach(({ key, icon, statLabel, statVal, best }) => {
    const route = routes[key];
    if (!route) return;
    const card = document.createElement('div');
    card.className = `route-card${best ? ' best' : ''}`;
    card.style.cursor = 'pointer';
    card.onclick = () => selectRouteOnCanvas(key);
    card.innerHTML = `
      <div class="rc-header">
        <span class="rc-label${best ? ' green' : ''}">${icon} ${route.label || key}</span>
        ${best ? '<span class="rc-badge">Best</span>' : ''}
      </div>
      <div class="rc-path">${renderPath(route.path || [])}</div>
      <div class="rc-meta">
        <div class="rc-stat">
          <span class="rc-stat-label">${statLabel}</span>
          <span class="rc-stat-val">${statVal}</span>
        </div>
        ${route.path ? `<div class="rc-stat"><span class="rc-stat-label">Stops</span><span class="rc-stat-val">${route.path.length - 1}</span></div>` : ''}
      </div>`;
    cards.appendChild(card);
  });


  // ── Mode availability cards ──
if (data.modeInfo) {
  const modeWrap = document.createElement('div');
  modeWrap.className = 'mode-info-wrap';
  modeWrap.innerHTML = `<p class="mode-info-title">🚦 Travel Mode Availability</p>`;
  const modeEmojis = { Bus: '🚌', Train: '🚂', Flight: '✈️', Car: '🚗' };
  ['Flight', 'Train', 'Car', 'Bus'].forEach(m => {
    const info = data.modeInfo[m];
    if (!info) return;
    const chip = document.createElement('div');
    chip.className = `mode-chip ${info.available ? 'mode-available' : 'mode-unavailable'}`;
    chip.innerHTML = info.available
      ? `${modeEmojis[m]} <strong>${m}</strong> <span>${formatMins(info.durationMinutes)}</span>`
      : `${modeEmojis[m]} <strong>${m}</strong> <span class="mode-note">${info.note}</span>`;
    modeWrap.appendChild(chip);
  });
  cards.appendChild(modeWrap);
}

  // DFS path card
  if (data.dfsPath && data.dfsPath.length) {
    const dfsCard = document.createElement('div');
    dfsCard.className = 'route-card';
    dfsCard.innerHTML = `
      <div class="rc-header"><span class="rc-label">🕸️ DFS Explored Path</span></div>
      <div class="rc-path">${renderPath(data.dfsPath)}</div>
      <div class="rc-meta"><div class="rc-stat"><span class="rc-stat-label">Stops</span><span class="rc-stat-val">${data.dfsPath.length - 1}</span></div></div>`;
    cards.appendChild(dfsCard);
  }

  // Alternatives
  const alts = data.alternativeCities || [];
  if (alts.length) {
    altsChips.innerHTML = alts.map(a =>
      `<span class="alt-chip" onclick="fillDestination('${a.city}')">${a.city} <span>~${a.approxDistanceKm}km</span></span>`
    ).join('');
    altsEl.classList.remove('hidden');
  } else {
    altsEl.classList.add('hidden');
  }

  resEl.classList.remove('hidden');
}

function renderPath(path) {
  return path.map((city, i) =>
    `<span class="rc-city">${city}</span>${i < path.length - 1 ? '<span class="rc-arrow">→</span>' : ''}`
  ).join('');
}

function fillDestination(city) {
  document.getElementById('toInput').value = city;
  document.getElementById('fromInput').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────
   COST CALCULATOR — /api/cost
───────────────────────────────────────────── */
async function calculateCost() {
  const from      = document.getElementById('costFrom').value.trim();
  const to        = document.getElementById('costTo').value.trim();
  const mode      = document.getElementById('travelMode').value;
  const days      = document.getElementById('tripDays').value;
  const hotelType = document.getElementById('hotelType').value;
  const travelers = document.getElementById('travelers').value;
  const errEl     = document.getElementById('costError');
  const resEl     = document.getElementById('costResult');

  errEl.classList.add('hidden');
  resEl.classList.add('hidden');

  // Edge case validation
  if (!from || !to) { showError(errEl, 'Please enter both From and To cities.'); return; }
  if (from.toLowerCase() === to.toLowerCase()) { showError(errEl, 'From and To cities cannot be the same.'); return; }
  if (days < 1 || days > 30)  { showError(errEl, 'Days must be between 1 and 30.'); return; }
  if (travelers < 1 || travelers > 20) { showError(errEl, 'Travelers must be between 1 and 20.'); return; }

  setLoading('calcBtn', 'calcBtnText', 'calcBtnLoader', true);

  try {
    const params = new URLSearchParams({ from, to, mode, days, hotelTier: hotelType, travelers });
    const res    = await fetch(`${API}/api/cost?${params}`);
    const data   = await res.json();

    if (!res.ok) { showError(errEl, data.message || data.error || 'Could not calculate cost.'); return; }

    renderCost(data);
  } catch (err) {
    showError(errEl, 'Could not connect to the server. Make sure backend is running on port 5000.');
  } finally {
    setLoading('calcBtn', 'calcBtnText', 'calcBtnLoader', false);
  }
}

function renderCost(data) {
  const travel = data.breakdown?.travelCost ?? data.travelCost ?? 0;
  const hotel  = data.breakdown?.hotelCost  ?? data.hotelCost  ?? 0;
  const food   = (data.breakdown?.foodCost ?? data.foodCost ?? 0) + (data.breakdown?.miscCost ?? 0);
  const total  = data.totalPerPerson ?? data.grandTotal ?? data.totalCost ?? (travel + hotel + food);

  const modeEmoji = { Bus: '🚌', Train: '🚂', Flight: '✈️', Car: '🚗' };
  const tMode = document.getElementById('travelMode').value;
  document.querySelector('.cost-item:nth-child(1) .cost-item-icon').textContent = modeEmoji[tMode] || '🚌';

  document.getElementById('travelCost').textContent = `₹${Math.round(travel).toLocaleString('en-IN')}`;
  document.getElementById('hotelCost').textContent  = `₹${Math.round(hotel).toLocaleString('en-IN')}`;
  document.getElementById('foodCost').textContent   = `₹${Math.round(food).toLocaleString('en-IN')}`;
  document.getElementById('totalCost').textContent  = `₹${Math.round(total).toLocaleString('en-IN')}`;

  document.getElementById('costResult').classList.remove('hidden');
}

/* ─────────────────────────────────────────────
   WEATHER — /api/weather/bulk
───────────────────────────────────────────── */
const WEATHER_ICONS = {
  clear: '☀️', sunny: '☀️', clouds: '☁️', cloudy: '🌤️',
  rain: '🌧️', drizzle: '🌦️', thunderstorm: '⛈️',
  snow: '❄️', mist: '🌫️', fog: '🌫️', haze: '🌫️', default: '🌡️'
};

function getWeatherIcon(desc = '') {
  const d = desc.toLowerCase();
  for (const [key, icon] of Object.entries(WEATHER_ICONS)) {
    if (d.includes(key)) return icon;
  }
  return WEATHER_ICONS.default;
}

async function loadWeather() {
  const grid = document.getElementById('weatherGrid');
  if (!grid) return;

  try {
    const defaultCities = ['Delhi', 'Agra', 'Jaipur', 'Manali', 'Mumbai', 'Kochi'];
    const res  = await fetch(`${API}/api/weather/bulk?cities=${defaultCities.join(',')}`);
    const data = await res.json();

    if (!Array.isArray(data) || !data.length) throw new Error('No data');

    grid.innerHTML = data.map(w => {
      if (w.error) return `<div class="weather-card"><span class="wc-icon">🌡️</span><p class="wc-city">${w.city}</p><p class="wc-desc">Unavailable</p></div>`;
      const icon     = getWeatherIcon(w.description || w.condition || '');
      const tempVal  = typeof w.temp === 'number' ? `${Math.round(w.temp)}°C` : '—';
      const windVal  = typeof w.wind_speed === 'number' ? `${w.wind_speed} km/h` : '—';
      const humidVal = typeof w.humidity === 'number' ? `${w.humidity}%` : '—';
      return `
        <div class="weather-card">
          <span class="wc-icon">${icon}</span>
          <p class="wc-city">${w.city}</p>
          <p class="wc-desc">${w.description || w.condition || 'Clear'}</p>
          <p class="wc-temp">${tempVal}</p>
          <div class="wc-meta">
            <div class="wc-row"><span>Humidity</span><span>${humidVal}</span></div>
            <div class="wc-row"><span>Wind</span><span>${windVal}</span></div>
          </div>
        </div>`;
    }).join('');

  } catch (err) {
    grid.innerHTML = `<p class="weather-error">Weather data unavailable. API key may still be activating (can take up to 2 hours after signup).</p>`;
  }
}

loadWeather();

/* ─────────────────────────────────────────────
   DESTINATION WEATHER — called after route search
───────────────────────────────────────────── */
async function loadCityWeather(city) {
  try {
    const res  = await fetch(`${API}/api/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    if (data.error) return;

    const grid = document.getElementById('weatherGrid');
    if (!grid) return;

    const icon     = getWeatherIcon(data.description || data.condition || '');
    const tempVal  = typeof data.temp === 'number' ? `${Math.round(data.temp)}°C` : '—';
    const windVal  = typeof data.wind_speed === 'number' ? `${data.wind_speed} km/h` : '—';
    const humidVal = typeof data.humidity === 'number' ? `${data.humidity}%` : '—';

    // Remove old destination card if exists
    grid.querySelector('.destination-weather')?.remove();

    const card = document.createElement('div');
    card.className = 'weather-card destination-weather';
    card.innerHTML = `
      <span class="wc-icon">${icon}</span>
      <p class="wc-city">${data.city} <span style="font-size:0.7em;opacity:0.6">(Your Destination)</span></p>
      <p class="wc-desc">${data.description || ''}</p>
      <p class="wc-temp">${tempVal}</p>
      <div class="wc-meta">
        <div class="wc-row"><span>Humidity</span><span>${humidVal}</span></div>
        <div class="wc-row"><span>Wind</span><span>${windVal}</span></div>
      </div>`;
    grid.prepend(card);
  } catch (_) {}
}

/* ─────────────────────────────────────────────
   HOTELS — /api/hotels
───────────────────────────────────────────── */
async function searchHotels(cityOverride) {
  const input = document.getElementById('hotelCityInput');
  const city  = cityOverride || (input ? input.value.trim() : '');
  const grid  = document.getElementById('hotelsGrid');
  if (!grid) return;

  if (!city) {
    grid.innerHTML = `<p class="hotels-empty">Please enter a city name.</p>`;
    return;
  }

  const btn = document.getElementById('hotelSearchBtn');
  if (btn) {
    document.getElementById('hotelBtnText').classList.add('hidden');
    document.getElementById('hotelBtnLoader').classList.remove('hidden');
    btn.disabled = true;
  }

  grid.innerHTML = `<p class="hotels-empty">Loading hotels for ${city}…</p>`;

  try {
    const res  = await fetch(`${API}/api/hotels?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    let hotels = Array.isArray(data) ? data : data.hotels || data.results || [];

    if (!hotels.length) {
      grid.innerHTML = `<p class="hotels-empty">No hotels found for "${city}". Try another city.</p>`;
      return;
    }
    grid.innerHTML = hotels.map(h => renderHotelCard(h)).join('');

  } catch (err) {
    grid.innerHTML = `<p class="hotels-empty">Could not load hotels. Make sure the backend is running on port 5000.</p>`;
  } finally {
    if (btn) {
      document.getElementById('hotelBtnText').classList.remove('hidden');
      document.getElementById('hotelBtnLoader').classList.add('hidden');
      btn.disabled = false;
    }
  }
}

function renderHotelCard(h) {
  const name      = h.name || 'Hotel';
  const city      = h.city || h.location || '';
  const price     = h.pricePerNight ?? h.price ?? h.cost ?? 0;
  const rating    = h.rating ?? h.stars ?? null;
  const type      = (h.type || h.category || '').toLowerCase();
  const amenities = h.amenities || h.features || [];

  let typeClass = 'mid', typeLabel = 'Mid-Range';
  if (type.includes('budget') || price < 1500)      { typeClass = 'budget'; typeLabel = 'Budget'; }
  else if (type.includes('luxury') || price > 4000) { typeClass = 'luxury'; typeLabel = 'Luxury'; }

  const amenityTags = amenities.slice(0, 4).map(a => `<span class="hc-tag">${a}</span>`).join('');
  const ratingHTML  = rating ? `<span class="hc-rating">★ ${Number(rating).toFixed(1)}</span>` : '';
  const priceHTML   = price  ? `₹${Math.round(price).toLocaleString('en-IN')}<span>/night</span>` : 'Price on request';

  return `
    <div class="hotel-card">
      <div class="hc-header">
        <p class="hc-name">${name}</p>
        <span class="hc-type ${typeClass}">${typeLabel}</span>
      </div>
      ${city ? `<p class="hc-city">📍 ${city}</p>` : ''}
      ${amenityTags ? `<div class="hc-amenities">${amenityTags}</div>` : ''}
      <div class="hc-footer">
        <p class="hc-price">${priceHTML}</p>
        ${ratingHTML}
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function showError(el, msg) {
  el.textContent = '⚠️ ' + msg;
  el.classList.remove('hidden');
}

function setLoading(btnId, textId, loaderId, loading) {
  const btn    = document.getElementById(btnId);
  const text   = document.getElementById(textId);
  const loader = document.getElementById(loaderId);
  if (!btn) return;
  btn.disabled = loading;
  text?.classList.toggle('hidden', loading);
  loader?.classList.toggle('hidden', !loading);
}

function formatMins(mins) {
  if (!mins && mins !== 0) return '—';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}`.trim() : `${m}m`;
}

/* ─────────────────────────────────────────────
   NAVBAR SCROLL EFFECT
───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
});

/* ─────────────────────────────────────────────
   ENTER KEY SUPPORT
───────────────────────────────────────────── */
['fromInput', 'toInput'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') triggerSearch();
  });
});
['costFrom', 'costTo'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') calculateCost();
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement?.id === 'hotelCityInput') searchHotels();
});