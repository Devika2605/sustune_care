"""Quote engine. Mirrors frontend/lib/pricing.ts (all values in rupees).
Every number here is a PLACEHOLDER until the business owner signs it off."""
USD_INR = 84.75
CITY_FACTOR = {"Hyderabad": 0.95, "Bengaluru": 1.0, "Delhi NCR": 1.05}
AEGIS_RATE = 0.08            # share of monthly rent
AEGIS_MIN_INR = 2500         # minimum monthly fee
BUNDLE_DISCOUNT = 0.15
SOS = 3000
VITALS = {"monthly": 1200, "biweekly": 2000, "weekly": 3500}
ESCORT_VISIT = 1000
COMPANION_VISIT = 500
PILL_SORTING = 800
SECOND_PARENT_FACTOR = 0.35
# Same presets as the website calculator: (vitals, escorts a month, visits a month, pill sorting)
PRESETS = {"essential": ("monthly", 0, 0, False), "comprehensive": ("biweekly", 2, 4, False), "full": ("weekly", 4, 8, True)}
RATE = {"INR": 1, "USD": 1 / USD_INR, "GBP": 0.79 / USD_INR, "AED": 3.67 / USD_INR, "AUD": 1.52 / USD_INR, "CAD": 1.36 / USD_INR}

def sparsh_monthly(tier, both=False):
    vit, esc, vis, pills = PRESETS.get(tier, PRESETS["comprehensive"])
    single = SOS + VITALS[vit] + esc * ESCORT_VISIT + vis * COMPANION_VISIT + (PILL_SORTING if pills else 0)
    second = round((single - SOS) * SECOND_PARENT_FACTOR) if both else 0
    return single + second

def build_quote(city, aegis, sparsh, rent_inr, tier, currency="INR", both_parents=False):
    aegis_inr = max(AEGIS_MIN_INR, round(rent_inr * AEGIS_RATE * CITY_FACTOR.get(city, 1.0))) if aegis else 0
    sparsh_inr = sparsh_monthly(tier, both_parents) if sparsh else 0
    discount = round((aegis_inr + sparsh_inr) * BUNDLE_DISCOUNT) if (aegis and sparsh) else 0
    net = aegis_inr + sparsh_inr - discount
    return {
        "city": city, "currency": currency,
        "aegis_inr": aegis_inr, "sparsh_inr": sparsh_inr, "discount_inr": discount, "net_inr": net,
        "net_usd": round(net / USD_INR), "net_local": round(net * RATE.get(currency, 1)),
    }
