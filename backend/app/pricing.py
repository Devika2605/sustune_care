"""Quote engine. Mirrors frontend/lib/pricing.ts. All numbers are PLACEHOLDERS until the business signs them off."""
USD_INR = 84.75
CITY_FACTOR = {"Hyderabad": 0.95, "Bengaluru": 1.0, "Delhi NCR": 1.05}
AEGIS_RATE = 0.08            # share of monthly rent
AEGIS_MIN_USD = 50           # minimum monthly fee
SPARSH_BASE_USD = {"essential": 59, "comprehensive": 118, "full": 210}
SYNERGY_DISCOUNT = 0.15
RATE = {"USD": 1, "GBP": 0.79, "AED": 3.67, "AUD": 1.52, "CAD": 1.36}

def build_quote(city, aegis, sparsh, rent_inr, tier, currency="USD"):
    f = CITY_FACTOR.get(city, 1.0)
    aegis_usd = max(AEGIS_MIN_USD, round((rent_inr / USD_INR) * AEGIS_RATE * f)) if aegis else 0
    sparsh_usd = round(SPARSH_BASE_USD.get(tier, 118) * f) if sparsh else 0
    discount = round((aegis_usd + sparsh_usd) * SYNERGY_DISCOUNT) if (aegis and sparsh) else 0
    net = aegis_usd + sparsh_usd - discount
    return {
        "city": city, "currency": currency,
        "aegis_usd": aegis_usd, "sparsh_usd": sparsh_usd, "discount_usd": discount, "net_usd": net,
        "net_local": round(net * RATE.get(currency, 1)),
    }
