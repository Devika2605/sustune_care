# Sustune Care

**Protected Care. Sustained Dignity.**

Website and client platform for Sustune Care, a service for non-resident Indians (NRIs) who need their property and their parents looked after in India.

- **Aegis**: property stewardship (tenant scouting, rental management, maintenance and interiors, global sourcing)
- **Sparsh**: parental care (24/7 SOS, doctor escorts, daily errands, companionship)

Launch hubs: Hyderabad (HQ), Bengaluru and Delhi NCR.

## Repository layout

```
Sustune_Care/
├── frontend/   Next.js 14 website and client portal   -> see frontend/README.md
├── backend/    FastAPI service (leads, auth, portal)  -> see backend/README.md
└── README.md   this file
```

## How the pieces fit

```
Browser ──► Next.js (port 3000) ──/api/*──► FastAPI (port 8000) ──► SQLite (dev) / Postgres (prod)
```

The browser only talks to the Next.js origin. Next.js forwards `/api/*` to FastAPI, so the login cookie is first-party and no CORS setup is needed in production.

## Quick start (development)

You need Node.js 20+ and Python 3.11+.

**1. Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # defaults are fine for development
uvicorn app.main:app --reload      # http://localhost:8000/docs
```

**2. Frontend** (in a second terminal)
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev                        # http://localhost:3000
```

**Development logins** (created only when `ENV` is not `production`)

| Role | Email | Password |
|---|---|---|
| Client | demo@sustunecare.com | demo1234 |
| Admin | admin@sustunecare.com | the `ADMIN_PASSWORD` in `backend/.env`, or `ChangeMe123!` if empty |

## Pages

| Route | Purpose |
|---|---|
| `/` | Dual-hero landing page, estimator, trust section |
| `/aegis` | Property services, pricing comparison, sample inspection report |
| `/sparsh` | Parental care pillars, care-plan builder, story video |
| `/portal-preview` | Demo of the client dashboard (sample data) |
| `/contact` | Consultation form and WhatsApp hand-off |
| `/about`, `/privacy`, `/terms` | Company and legal pages (privacy and terms are drafts) |
| `/login`, `/portal`, `/admin` | Real client portal and lead tracker (need the API) |

## Brand

All visual rules follow the Sustune Care Brand Guidelines (SC-BGM-2026).

| Token | Hex |
|---|---|
| Deep Marine Blue | `#0D3B66` |
| Cerulean Flow | `#0073B7` |
| Imperial Gold | `#C99738` |
| Burnished Bronze (gold text on white) | `#8B601C` |
| Emerald Vitality | `#0A8754` |
| Pure Slate Gray | `#1E293B` |
| Cool Mist Tint | `#F1F5F9` |

Fonts: Plus Jakarta Sans (headings) and Inter (body). Never place white text on Imperial Gold.

## Contact details used on the site

Edit once in `frontend/lib/config.ts`.

- India: +91 89856 34239
- WhatsApp: +1 206 713 6114
- Email: contact@sustunecare.com
- Location: Hyderabad, Telangana, India

## Deployment overview

| Part | Suggested host | Key settings |
|---|---|---|
| Frontend | AWS Amplify Hosting (Next.js SSR) | `API_URL`, `NEXT_PUBLIC_SITE_URL`, optional video URLs |
| Backend | AWS App Runner, Render or similar | `ENV=production`, `SECRET_KEY`, `ADMIN_PASSWORD`, `DATABASE_URL` (Postgres) |

Details are in the two sub-READMEs.

## Before launch checklist

- [ ] Replace `frontend/public/brand/emblem.png` with the true vector or high-resolution logo
- [ ] Upload videos and set the two video URLs
- [ ] Get all prices approved, then update `frontend/lib/pricing.ts` and `backend/app/pricing.py` together
- [ ] Replace the sample testimonials and metrics with real ones, or set `NEXT_PUBLIC_SHOW_SAMPLE_PROOF=false`
- [ ] Have a lawyer replace the privacy policy and terms; add the registered company name
- [ ] Add leadership names and bios to `/about`
- [ ] Confirm what "Global sourcing" covers in Aegis
- [ ] Switch to Postgres, set strong secrets, and enable HTTPS
- [ ] Remove or label any content that is not yet true (certifications, partner hospitals, statistics)

## Team workflow

- Work on a branch, open a pull request, and run `npm run build` (frontend) before merging.
- Never commit `.env`, `.env.local`, `*.db` or video files.