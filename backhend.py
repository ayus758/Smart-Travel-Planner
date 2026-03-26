"""
SmartTrip Backend - Pure Python
================================
Member 1: Backend Developer – Core Algorithms
Modules:
  1. Destination Recommendation Logic  (Greedy + Scoring)
  2. Budget Checking System
  3. Alternative Place Suggestion Module
  4. Scoring Function (interest + rating + cost + distance)

Run standalone:   python backend.py
Run as API server: python backend.py --serve
"""

import json
import math
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

# ─────────────────────────────────────────────
#  1. DESTINATION DATA
# ─────────────────────────────────────────────

DESTINATIONS = [
    {
        "id": "agra",
        "name": "Agra",
        "state": "Uttar Pradesh",
        "lat": 27.1767, "lng": 78.0081,
        "base_cost_per_day": 1200,        # ₹ food + misc per person/day
        "avg_hotel_budget": 900,
        "avg_hotel_midrange": 2200,
        "avg_hotel_luxury": 7000,
        "rating": 4.6,
        "tags": ["heritage", "history", "architecture", "romantic"],
        "crowd_level": 8,                 # 1-10 (10 = most crowded)
        "best_months": [10, 11, 12, 1, 2, 3],
        "distance_from_delhi_km": 233,
        "transport_options": ["bus", "train", "car", "flight"],
        "weather_now": {"temp": 38, "condition": "Sunny", "humidity": 28},
        "highlights": ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    },
    {
        "id": "jaipur",
        "name": "Jaipur",
        "state": "Rajasthan",
        "lat": 26.9124, "lng": 75.7873,
        "base_cost_per_day": 1100,
        "avg_hotel_budget": 850,
        "avg_hotel_midrange": 2000,
        "avg_hotel_luxury": 6500,
        "rating": 4.5,
        "tags": ["heritage", "culture", "shopping", "architecture", "desert"],
        "crowd_level": 6,
        "best_months": [10, 11, 12, 1, 2, 3],
        "distance_from_delhi_km": 281,
        "transport_options": ["bus", "train", "car", "flight"],
        "weather_now": {"temp": 36, "condition": "Mostly Sunny", "humidity": 32},
        "highlights": ["Amber Fort", "Hawa Mahal", "City Palace"],
    },
    {
        "id": "varanasi",
        "name": "Varanasi",
        "state": "Uttar Pradesh",
        "lat": 25.3176, "lng": 82.9739,
        "base_cost_per_day": 900,
        "avg_hotel_budget": 700,
        "avg_hotel_midrange": 1800,
        "avg_hotel_luxury": 5000,
        "rating": 4.7,
        "tags": ["spiritual", "culture", "history", "ghats", "religious"],
        "crowd_level": 7,
        "best_months": [10, 11, 12, 1, 2, 3, 4],
        "distance_from_delhi_km": 821,
        "transport_options": ["train", "flight", "bus"],
        "weather_now": {"temp": 33, "condition": "Hazy", "humidity": 52},
        "highlights": ["Dashashwamedh Ghat", "Kashi Vishwanath", "Sarnath"],
    },
    {
        "id": "goa",
        "name": "Goa",
        "state": "Goa",
        "lat": 15.2993, "lng": 74.1240,
        "base_cost_per_day": 1800,
        "avg_hotel_budget": 1200,
        "avg_hotel_midrange": 3500,
        "avg_hotel_luxury": 9000,
        "rating": 4.4,
        "tags": ["beach", "nightlife", "water sports", "relaxation", "party"],
        "crowd_level": 9,
        "best_months": [11, 12, 1, 2, 3],
        "distance_from_delhi_km": 1900,
        "transport_options": ["flight", "train"],
        "weather_now": {"temp": 26, "condition": "Thunderstorm", "humidity": 95},
        "highlights": ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"],
    },
    {
        "id": "manali",
        "name": "Manali",
        "state": "Himachal Pradesh",
        "lat": 32.2396, "lng": 77.1887,
        "base_cost_per_day": 1400,
        "avg_hotel_budget": 1000,
        "avg_hotel_midrange": 2500,
        "avg_hotel_luxury": 6000,
        "rating": 4.8,
        "tags": ["mountains", "adventure", "snow", "trekking", "scenic"],
        "crowd_level": 5,
        "best_months": [3, 4, 5, 6, 10],
        "distance_from_delhi_km": 540,
        "transport_options": ["bus", "car"],
        "weather_now": {"temp": 12, "condition": "Partly Cloudy", "humidity": 60},
        "highlights": ["Rohtang Pass", "Solang Valley", "Hadimba Temple"],
    },
    {
        "id": "hampi",
        "name": "Hampi",
        "state": "Karnataka",
        "lat": 15.3350, "lng": 76.4600,
        "base_cost_per_day": 800,
        "avg_hotel_budget": 600,
        "avg_hotel_midrange": 1500,
        "avg_hotel_luxury": 4000,
        "rating": 4.7,
        "tags": ["heritage", "history", "ruins", "architecture", "offbeat"],
        "crowd_level": 3,
        "best_months": [10, 11, 12, 1, 2, 3],
        "distance_from_delhi_km": 1870,
        "transport_options": ["flight", "train"],
        "weather_now": {"temp": 30, "condition": "Sunny", "humidity": 40},
        "highlights": ["Virupaksha Temple", "Vittala Temple", "Hemakuta Hill"],
    },
    {
        "id": "udaipur",
        "name": "Udaipur",
        "state": "Rajasthan",
        "lat": 24.5854, "lng": 73.7125,
        "base_cost_per_day": 1300,
        "avg_hotel_budget": 1000,
        "avg_hotel_midrange": 2800,
        "avg_hotel_luxury": 8000,
        "rating": 4.8,
        "tags": ["romantic", "lakes", "heritage", "architecture", "royalty"],
        "crowd_level": 5,
        "best_months": [10, 11, 12, 1, 2, 3],
        "distance_from_delhi_km": 665,
        "transport_options": ["flight", "train", "bus", "car"],
        "weather_now": {"temp": 34, "condition": "Clear", "humidity": 30},
        "highlights": ["City Palace", "Lake Pichola", "Sajjangarh Fort"],
    },
    {
        "id": "rishikesh",
        "name": "Rishikesh",
        "state": "Uttarakhand",
        "lat": 30.0869, "lng": 78.2676,
        "base_cost_per_day": 900,
        "avg_hotel_budget": 700,
        "avg_hotel_midrange": 1800,
        "avg_hotel_luxury": 4500,
        "rating": 4.6,
        "tags": ["spiritual", "adventure", "yoga", "rafting", "mountains"],
        "crowd_level": 4,
        "best_months": [3, 4, 5, 9, 10, 11],
        "distance_from_delhi_km": 239,
        "transport_options": ["bus", "car", "train"],
        "weather_now": {"temp": 28, "condition": "Pleasant", "humidity": 55},
        "highlights": ["Laxman Jhula", "River Rafting", "Triveni Ghat"],
    },
    {
        "id": "darjeeling",
        "name": "Darjeeling",
        "state": "West Bengal",
        "lat": 27.0410, "lng": 88.2663,
        "base_cost_per_day": 1100,
        "avg_hotel_budget": 800,
        "avg_hotel_midrange": 2000,
        "avg_hotel_luxury": 5500,
        "rating": 4.5,
        "tags": ["mountains", "tea", "scenic", "colonial", "trekking"],
        "crowd_level": 4,
        "best_months": [3, 4, 5, 9, 10, 11, 12],
        "distance_from_delhi_km": 1700,
        "transport_options": ["flight", "train"],
        "weather_now": {"temp": 16, "condition": "Misty", "humidity": 70},
        "highlights": ["Tiger Hill", "Tea Gardens", "Batasia Loop"],
    },
    {
        "id": "mumbai",
        "name": "Mumbai",
        "state": "Maharashtra",
        "lat": 19.0760, "lng": 72.8777,
        "base_cost_per_day": 2200,
        "avg_hotel_budget": 1500,
        "avg_hotel_midrange": 4000,
        "avg_hotel_luxury": 12000,
        "rating": 4.2,
        "tags": ["city", "food", "culture", "nightlife", "beaches", "bollywood"],
        "crowd_level": 9,
        "best_months": [11, 12, 1, 2, 3],
        "distance_from_delhi_km": 1415,
        "transport_options": ["flight", "train"],
        "weather_now": {"temp": 28, "condition": "Rainy", "humidity": 90},
        "highlights": ["Gateway of India", "Marine Drive", "Elephanta Caves"],
    },
]

# ─────────────────────────────────────────────
#  2. SCORING FUNCTION
#  Score = w1*interest + w2*rating + w3*cost_fit + w4*distance_fit
#  Each component normalized to [0, 1]
# ─────────────────────────────────────────────

WEIGHTS = {
    "interest":     0.35,   # how well tags match user interests
    "rating":       0.25,   # destination rating
    "cost_fit":     0.25,   # how well it fits budget
    "distance_fit": 0.15,   # closer = better (soft preference)
}

def compute_interest_score(destination: dict, user_interests: list[str]) -> float:
    """
    Jaccard-style match between user interests and destination tags.
    Returns float in [0.0, 1.0]
    """
    if not user_interests:
        return 0.5  # neutral if no preference given

    dest_tags = set(t.lower() for t in destination["tags"])
    user_tags = set(i.lower() for i in user_interests)
    intersection = dest_tags & user_tags
    union = dest_tags | user_tags

    return len(intersection) / len(union) if union else 0.0


def compute_rating_score(destination: dict) -> float:
    """
    Normalize rating from [1, 5] → [0, 1]
    """
    return (destination["rating"] - 1) / 4.0


def compute_cost_fit_score(destination: dict, budget_per_day: float,
                            hotel_type: str, days: int) -> float:
    """
    Greedy cost check: can the user afford this destination?
    Returns 1.0 if well within budget, scales down as it exceeds.
    hotel_type: 'budget' | 'midrange' | 'luxury'
    """
    hotel_key = f"avg_hotel_{hotel_type}"
    hotel_cost = destination.get(hotel_key, destination["avg_hotel_midrange"])
    daily_total = destination["base_cost_per_day"] + hotel_cost

    if daily_total <= 0 or budget_per_day <= 0:
        return 0.0

    ratio = budget_per_day / daily_total   # >1 means budget is fine
    # Soft sigmoid-style clamping
    if ratio >= 1.5:
        return 1.0
    elif ratio >= 1.0:
        return 0.5 + (ratio - 1.0) * 1.0   # 0.5 → 1.0
    elif ratio >= 0.7:
        return ratio * 0.5                  # 0.35 → 0.5
    else:
        return max(0.0, ratio * 0.4)        # penalize heavily if too expensive


def compute_distance_fit_score(destination: dict, max_distance_km: float) -> float:
    """
    Destinations closer than max_distance get full score; further ones are penalized.
    Uses exponential decay for smooth scoring.
    """
    dist = destination["distance_from_delhi_km"]
    if max_distance_km <= 0:
        return 1.0
    ratio = dist / max_distance_km
    # Exponential decay: score = e^(-ratio + 1) clamped to [0,1]
    score = math.exp(-max(0, ratio - 1))
    return min(1.0, max(0.0, score))


def score_destination(destination: dict,
                       user_interests: list[str],
                       budget_per_day: float,
                       hotel_type: str,
                       max_distance_km: float) -> dict:
    """
    Master scoring function.
    Returns destination dict enriched with score breakdown.
    """
    interest   = compute_interest_score(destination, user_interests)
    rating     = compute_rating_score(destination)
    cost_fit   = compute_cost_fit_score(destination, budget_per_day, hotel_type, 1)
    dist_fit   = compute_distance_fit_score(destination, max_distance_km)

    total = (
        WEIGHTS["interest"]     * interest +
        WEIGHTS["rating"]       * rating +
        WEIGHTS["cost_fit"]     * cost_fit +
        WEIGHTS["distance_fit"] * dist_fit
    )

    return {
        **destination,
        "_score": round(total, 4),
        "_breakdown": {
            "interest_score":  round(interest,  4),
            "rating_score":    round(rating,    4),
            "cost_fit_score":  round(cost_fit,  4),
            "distance_score":  round(dist_fit,  4),
        }
    }


# ─────────────────────────────────────────────
#  3. DESTINATION RECOMMENDATION ENGINE
#  Greedy: pick top-K destinations by score
#  then apply hard constraints (budget, transport)
# ─────────────────────────────────────────────

def recommend_destinations(
    user_interests: list[str],
    total_budget: float,
    days: int,
    hotel_type: str = "midrange",      # budget | midrange | luxury
    transport_preference: list[str] = None,
    max_distance_km: float = 2000,
    top_k: int = 5,
) -> list[dict]:
    """
    GREEDY ALGORITHM:
    1. Score all destinations
    2. Sort by score descending  (O(n log n) — merge sort internally)
    3. Greedily pick top-K that pass hard budget constraint

    Args:
        user_interests:        list of interest tags e.g. ["beach","adventure"]
        total_budget:          total trip budget in ₹
        days:                  number of trip days
        hotel_type:            accommodation class
        transport_preference:  list of modes e.g. ["bus","train"]
        max_distance_km:       filter destinations beyond this
        top_k:                 number of recommendations to return

    Returns:
        Sorted list of scored destination dicts
    """

    budget_per_day = total_budget / max(days, 1)
    transport_preference = transport_preference or []

    # Step 1: Score every destination
    scored = [
        score_destination(d, user_interests, budget_per_day, hotel_type, max_distance_km)
        for d in DESTINATIONS
    ]

    # Step 2: Sort by composite score — O(n log n)
    scored.sort(key=lambda d: d["_score"], reverse=True)

    # Step 3: Greedy selection with hard constraints
    recommendations = []
    for dest in scored:
        # Hard constraint: transport must match preference
        if transport_preference:
            has_transport = any(
                t in dest["transport_options"] for t in transport_preference
            )
            if not has_transport:
                continue

        # Hard constraint: distance filter
        if dest["distance_from_delhi_km"] > max_distance_km:
            continue

        # Compute full trip cost estimate for display
        hotel_key = f"avg_hotel_{hotel_type}"
        hotel_daily = dest.get(hotel_key, dest["avg_hotel_midrange"])
        estimated_cost = (dest["base_cost_per_day"] + hotel_daily) * days
        dest["_estimated_cost"] = round(estimated_cost)
        dest["_budget_ok"] = estimated_cost <= total_budget

        recommendations.append(dest)

        if len(recommendations) >= top_k:
            break

    return recommendations


# ─────────────────────────────────────────────
#  4. BUDGET CHECKING SYSTEM
# ─────────────────────────────────────────────

TRANSPORT_COST_TABLE = {
    # (origin_rough_distance_band): {mode: cost_per_person}
    "near":   {"bus": 350,  "train": 500,  "car": 1200, "flight": 2500},
    "medium": {"bus": 600,  "train": 900,  "car": 2200, "flight": 3500},
    "far":    {"bus": 1200, "train": 1800, "car": 4500, "flight": 5500},
}

def get_distance_band(km: float) -> str:
    if km < 400:   return "near"
    elif km < 900: return "medium"
    else:          return "far"


def check_budget(
    destination_id: str,
    total_budget: float,
    days: int,
    travelers: int,
    hotel_type: str,
    transport_mode: str,
) -> dict:
    """
    Detailed budget breakdown and feasibility check.
    Returns pass/fail with per-person itemised costs.
    """
    dest = next((d for d in DESTINATIONS if d["id"] == destination_id), None)
    if not dest:
        return {"error": f"Destination '{destination_id}' not found"}

    # Transport cost (one-way × 2 for return)
    band = get_distance_band(dest["distance_from_delhi_km"])
    transport_per_person = TRANSPORT_COST_TABLE[band].get(transport_mode, 1000) * 2

    # Hotel cost (shared per person)
    hotel_key = f"avg_hotel_{hotel_type}"
    hotel_nightly = dest.get(hotel_key, dest["avg_hotel_midrange"])
    hotel_per_person = (hotel_nightly / max(travelers, 1)) * days

    # Food & misc
    food_per_person = dest["base_cost_per_day"] * days

    total_per_person = transport_per_person + hotel_per_person + food_per_person
    total_trip       = total_per_person * travelers

    per_person_budget = total_budget / max(travelers, 1)
    surplus            = per_person_budget - total_per_person
    feasible           = total_trip <= total_budget

    return {
        "destination": dest["name"],
        "feasible": feasible,
        "per_person": {
            "transport": round(transport_per_person),
            "hotel":     round(hotel_per_person),
            "food_misc": round(food_per_person),
            "total":     round(total_per_person),
        },
        "trip_total":      round(total_trip),
        "budget":          round(total_budget),
        "surplus_deficit": round(surplus),
        "utilisation_pct": round((total_trip / total_budget) * 100, 1),
        "verdict": (
            "✅ Comfortably within budget" if surplus > total_per_person * 0.2
            else "✅ Fits budget (tight)"   if feasible
            else f"❌ Over budget by ₹{abs(round(surplus)):,}"
        ),
    }


# ─────────────────────────────────────────────
#  5. ALTERNATIVE PLACE SUGGESTION MODULE
#  Triggered when: weather is bad OR crowd too high
# ─────────────────────────────────────────────

def suggest_alternatives(
    original_destination_id: str,
    reason: str,                         # "weather" | "crowd" | "budget"
    user_interests: list[str],
    total_budget: float,
    days: int,
    hotel_type: str = "midrange",
    top_k: int = 3,
) -> dict:
    """
    When primary destination is unsuitable, find alternatives.
    Uses same scoring function but EXCLUDES the original destination.

    Reason-specific logic:
      - weather: prefer destinations with good current weather
      - crowd:   prefer destinations with crowd_level < 5
      - budget:  prefer destinations with lower base cost
    """
    original = next((d for d in DESTINATIONS if d["id"] == original_destination_id), None)
    if not original:
        return {"error": f"Destination '{original_destination_id}' not found"}

    budget_per_day = total_budget / max(days, 1)

    # Score all destinations except the original
    candidates = [d for d in DESTINATIONS if d["id"] != original_destination_id]

    scored = [
        score_destination(d, user_interests, budget_per_day, hotel_type, 3000)
        for d in candidates
    ]

    # Apply reason-specific BONUS scoring
    for dest in scored:
        bonus = 0.0

        if reason == "weather":
            cond = dest.get("weather_now", {}).get("condition", "").lower()
            bad_weather = ["rain", "storm", "thunder", "monsoon", "flood", "haze"]
            if not any(b in cond for b in bad_weather):
                bonus += 0.15   # reward good weather destinations

        elif reason == "crowd":
            crowd = dest.get("crowd_level", 5)
            if crowd <= 3:
                bonus += 0.20   # strongly prefer uncrowded spots
            elif crowd <= 5:
                bonus += 0.10

        elif reason == "budget":
            hotel_key = f"avg_hotel_{hotel_type}"
            daily = dest["base_cost_per_day"] + dest.get(hotel_key, 2000)
            if daily < budget_per_day * 0.7:
                bonus += 0.20   # significantly cheaper
            elif daily < budget_per_day:
                bonus += 0.10

        dest["_score"] = min(1.0, dest["_score"] + bonus)
        dest["_alternative_bonus"] = round(bonus, 4)

    # Sort by adjusted score
    scored.sort(key=lambda d: d["_score"], reverse=True)
    alternatives = scored[:top_k]

    # Add cost estimates
    for dest in alternatives:
        hotel_key = f"avg_hotel_{hotel_type}"
        hotel_daily = dest.get(hotel_key, dest["avg_hotel_midrange"])
        dest["_estimated_cost"] = round((dest["base_cost_per_day"] + hotel_daily) * days)

    return {
        "original": original["name"],
        "reason": reason,
        "alternatives": alternatives,
        "message": _build_suggestion_message(original["name"], reason),
    }


def _build_suggestion_message(dest_name: str, reason: str) -> str:
    msgs = {
        "weather": (
            f"⛈️ {dest_name} has unfavourable weather right now. "
            "Here are great alternatives with clear skies:"
        ),
        "crowd": (
            f"👥 {dest_name} is currently very crowded. "
            "Enjoy these quieter, equally beautiful destinations:"
        ),
        "budget": (
            f"💰 {dest_name} may stretch your budget. "
            "These destinations offer excellent value:"
        ),
    }
    return msgs.get(reason, f"Consider these alternatives to {dest_name}:")


# ─────────────────────────────────────────────
#  6. LIGHTWEIGHT HTTP API SERVER
#  Endpoints:
#    GET /recommend?interests=beach,adventure&budget=15000&days=3&hotel=midrange&transport=bus&max_dist=1000&top_k=5
#    GET /budget?dest=goa&budget=20000&days=3&travelers=2&hotel=midrange&transport=flight
#    GET /alternatives?dest=goa&reason=weather&interests=heritage&budget=15000&days=3&hotel=budget
#    GET /destinations   — returns full destination list
# ─────────────────────────────────────────────

class SmartTripHandler(BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        # Clean logs
        print(f"  → {self.command} {self.path}")

    def send_json(self, data: dict, status: int = 200):
        body = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")   # allow HTML to fetch
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        qs     = parse_qs(parsed.query)

        def get(key, default=""):
            return qs.get(key, [default])[0]

        def get_list(key):
            raw = get(key)
            return [x.strip() for x in raw.split(",") if x.strip()] if raw else []

        path = parsed.path.rstrip("/")

        if path == "/recommend":
            interests  = get_list("interests")
            budget     = float(get("budget",   "15000"))
            days       = int(get("days",       "3"))
            hotel      = get("hotel",           "midrange")
            transport  = get_list("transport")
            max_dist   = float(get("max_dist", "2000"))
            top_k      = int(get("top_k",      "5"))

            results = recommend_destinations(
                user_interests=interests,
                total_budget=budget,
                days=days,
                hotel_type=hotel,
                transport_preference=transport,
                max_distance_km=max_dist,
                top_k=top_k,
            )
            self.send_json({"status": "ok", "count": len(results), "results": results})

        elif path == "/budget":
            dest      = get("dest",      "agra")
            budget    = float(get("budget",    "15000"))
            days      = int(get("days",        "3"))
            travelers = int(get("travelers",   "2"))
            hotel     = get("hotel",            "midrange")
            transport = get("transport",        "bus")

            result = check_budget(dest, budget, days, travelers, hotel, transport)
            self.send_json({"status": "ok", "result": result})

        elif path == "/alternatives":
            dest      = get("dest",      "goa")
            reason    = get("reason",    "weather")
            interests = get_list("interests")
            budget    = float(get("budget",    "15000"))
            days      = int(get("days",        "3"))
            hotel     = get("hotel",            "midrange")
            top_k     = int(get("top_k",        "3"))

            result = suggest_alternatives(dest, reason, interests, budget, days, hotel, top_k)
            self.send_json({"status": "ok", **result})

        elif path == "/destinations":
            self.send_json({"status": "ok", "destinations": DESTINATIONS})

        else:
            self.send_json({"error": "Unknown endpoint"}, 404)


def run_server(port: int = 8765):
    server = HTTPServer(("localhost", port), SmartTripHandler)
    print(f"""
╔══════════════════════════════════════════════╗
║   SmartTrip Backend — Pure Python API        ║
╠══════════════════════════════════════════════╣
║  Server running at http://localhost:{port}     ║
║                                              ║
║  Endpoints:                                  ║
║  GET /recommend   — destination recs         ║
║  GET /budget      — budget feasibility       ║
║  GET /alternatives — alternative places      ║
║  GET /destinations — all destinations        ║
╚══════════════════════════════════════════════╝
    """)
    server.serve_forever()


# ─────────────────────────────────────────────
#  7. STANDALONE DEMO (python backend.py)
# ─────────────────────────────────────────────

def run_demo():
    print("\n" + "═" * 55)
    print("  SmartTrip Backend — Algorithm Demo")
    print("═" * 55)

    # ── Demo 1: Recommendations ──
    print("\n📍 DEMO 1: Destination Recommendations")
    print("   User: loves beaches + adventure | Budget ₹20,000 | 4 days | Bus/Train")
    recs = recommend_destinations(
        user_interests=["beach", "adventure", "mountains"],
        total_budget=20000,
        days=4,
        hotel_type="midrange",
        transport_preference=["bus", "train"],
        max_distance_km=2000,
        top_k=5,
    )
    for i, r in enumerate(recs, 1):
        b = r["_breakdown"]
        print(f"\n  #{i} {r['name']} ({r['state']})")
        print(f"     Score: {r['_score']:.3f}  |  Est. Cost: ₹{r['_estimated_cost']:,}")
        print(f"     Interest:{b['interest_score']:.2f}  Rating:{b['rating_score']:.2f}  "
              f"Cost-fit:{b['cost_fit_score']:.2f}  Distance:{b['distance_score']:.2f}")
        print(f"     Tags: {', '.join(r['tags'])}")

    # ── Demo 2: Budget Check ──
    print("\n\n💰 DEMO 2: Budget Check — Goa trip")
    budget_result = check_budget(
        destination_id="goa",
        total_budget=25000,
        days=4,
        travelers=2,
        hotel_type="midrange",
        transport_mode="flight",
    )
    r = budget_result
    print(f"   Destination : {r['destination']}")
    print(f"   Transport   : ₹{r['per_person']['transport']:,} per person")
    print(f"   Hotel       : ₹{r['per_person']['hotel']:,} per person")
    print(f"   Food & Misc : ₹{r['per_person']['food_misc']:,} per person")
    print(f"   Per Person  : ₹{r['per_person']['total']:,}")
    print(f"   Trip Total  : ₹{r['trip_total']:,} for {2} travelers")
    print(f"   Verdict     : {r['verdict']}")
    print(f"   Utilisation : {r['utilisation_pct']}% of ₹{r['budget']:,} budget")

    # ── Demo 3: Alternatives ──
    print("\n\n🔁 DEMO 3: Alternative Suggestions — Goa (bad weather)")
    alt_result = suggest_alternatives(
        original_destination_id="goa",
        reason="weather",
        user_interests=["beach", "culture", "heritage"],
        total_budget=20000,
        days=4,
        hotel_type="midrange",
        top_k=3,
    )
    print(f"   {alt_result['message']}")
    for i, dest in enumerate(alt_result["alternatives"], 1):
        print(f"\n  #{i} {dest['name']} — Score: {dest['_score']:.3f} "
              f"(bonus: +{dest.get('_alternative_bonus',0):.2f})")
        print(f"     Est. Cost: ₹{dest['_estimated_cost']:,}  |  "
              f"Crowd: {dest['crowd_level']}/10  |  Weather: {dest['weather_now']['condition']}")
        print(f"     Highlights: {', '.join(dest['highlights'])}")

    print("\n\n" + "═" * 55)
    print("  ✅ All algorithms running correctly.")
    print("  Run with --serve to start the API server.")
    print("═" * 55 + "\n")


# ─────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────

if __name__ == "__main__":
    if "--serve" in sys.argv:
        port = 8765
        for arg in sys.argv:
            if arg.startswith("--port="):
                port = int(arg.split("=")[1])
        run_server(port)
    else:
        run_demo()