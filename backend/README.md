# Sustune Care: Backend API

FastAPI service for lead capture, quotes, authentication, the client portal and the admin lead tracker.

**Stack:** Python 3.11+, FastAPI, SQLAlchemy 2, Pydantic 2, PyJWT, SQLite (development) or Postgres (production).

## Run it

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload      # http://localhost:8000
```

Interactive docs are at `http://localhost:8000/docs` in development only. They are switched off when `ENV=production`.

On first start the database is created and seeded:

- an admin user (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
- in development only: a demo client `demo@sustunecare.com` / `demo1234` with sample properties, a parent, vitals and appointments

To reset development data, stop the server and delete `sustune.db`.

## Environment variables

| Variable | Purpose | Notes |
|---|---|---|
| `ENV` | `development` or `production` | In production the API refuses to start with a weak secret or admin password |
| `SECRET_KEY` | Signs login tokens | 32+ characters in production. Generate: `python -c "import secrets; print(secrets.token_urlsafe(48))"` |
| `ADMIN_EMAIL` | First admin account | Default `admin@sustunecare.com` |
| `ADMIN_PASSWORD` | First admin password | 12+ characters in production |
| `DATABASE_URL` | Database | `sqlite:///./sustune.db` or `postgresql+psycopg://user:pass@host/db` |
| `CORS_ORIGINS` | Allowed browser origins | Comma separated; only needed if the browser calls the API directly |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_TO` | Email alert on new lead | Optional |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_NOTIFY_TO` | WhatsApp Cloud API alert on new lead | Optional |

## Folder map

```
backend/
├── app/
│   ├── main.py        Routes
│   ├── security.py    Password hashing, tokens, cookie auth, rate limiter
│   ├── schemas.py     Request and response validation
│   ├── models.py      Database tables (User, Lead, Property, Parent, Vital, Appointment)
│   ├── database.py    Engine and session
│   ├── pricing.py     Quote engine (mirror of frontend/lib/pricing.ts)
│   ├── seed.py        First-run data
│   └── notify.py      Email and WhatsApp notifications
├── requirements.txt
└── .env.example
```

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | none | Health check |
| POST | `/api/quote` | none | Price estimate in rupees (also returns USD and the chosen currency) |
| POST | `/api/leads` | none | Save a consultation request (rate limited: 5 per 10 min per IP) |
| POST | `/api/auth/login` | none | Sign in, sets httpOnly cookie (rate limited: 8 per min per IP) |
| POST | `/api/auth/logout` | cookie | Clear cookie |
| GET | `/api/auth/me` | cookie | Current user |
| GET | `/api/portal/me` | cookie | Client's properties, parents, vitals, appointments |
| GET | `/api/admin/leads` | admin | List leads (`?status=new`) |
| PATCH | `/api/admin/leads/{id}` | admin | Set status: new, contacted, scheduled, won, lost |
| GET | `/api/admin/clients` | admin | List clients and their parents |
| POST | `/api/admin/parents/{id}/vitals` | admin | Record a vitals reading |
| POST | `/api/admin/parents/{id}/appointments` | admin | Add or log an appointment |

Tools such as curl or Postman may send `Authorization: Bearer <token>` instead of the cookie.

### Lead request example

```json
{
  "name": "Asha Rao", "email": "asha@example.com", "phone": "+1 206 555 0100",
  "country": "USA", "interest": "both", "city": "Hyderabad",
  "preferred_slot": "Saturday 9 am PST", "message": "",
  "quote_monthly_usd": 117, "consent": true, "website": ""
}
```

`interest` must be `aegis`, `sparsh` or `both`. `consent` must be `true`. `website` is a bot trap and must stay empty.

## Security built in

- Passwords hashed with PBKDF2-SHA256 (200,000 rounds)
- Login token stored in an httpOnly, SameSite=Lax cookie (Secure in production)
- Rate limits on login and lead submission
- Input validation on every request body
- Production refuses weak `SECRET_KEY` or admin password
- API docs disabled in production

## Prices

`app/pricing.py` holds placeholder rates (in rupees) until the business approves them. Keep it identical to `frontend/lib/pricing.ts`, because visitors see the frontend numbers and the server records the quote.

The lead table stores the estimate in the `quote_monthly_usd` column, so the website converts the rupee estimate to dollars before sending it. The admin page shows it as a dollar figure.

## Deploying

1. Create a Postgres database and set `DATABASE_URL`.
2. Set `ENV=production`, `SECRET_KEY` and `ADMIN_PASSWORD`.
3. Run `uvicorn app.main:app --host 0.0.0.0 --port 8000` (App Runner, Render, ECS or a VM behind HTTPS).
4. Give the public URL to the frontend as `API_URL`.

## Troubleshooting

| Problem | Fix |
|---|---|
| Startup error about `SECRET_KEY` or `ADMIN_PASSWORD` | You set `ENV=production` with a weak value; set a stronger one |
| `429 Too many attempts` | Wait a minute; limits are per IP |
| `attempt to write a readonly database` | You deleted `sustune.db` while the server was running; stop it and restart |
| New lead not emailed | SMTP variables are empty or wrong; leads are still saved |
