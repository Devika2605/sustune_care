# Sustune Care: Frontend

Next.js 14 (App Router) website and client portal.

**Stack:** React 18, TypeScript, Tailwind CSS 3, Framer Motion, Lucide icons, Playfair Display and Inter (via Fontsource, no external font requests).

## Run it

```bash
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks and lints) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check only |

The pages that need data (`/contact` submission, `/login`, `/portal`, `/admin`) require the backend to be running. Everything else works without it.

## Environment variables

| Variable | Used for | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, social preview | `https://www.sustunecare.com` |
| `API_URL` | Where Next.js forwards `/api/*` (server-side only) | `http://localhost:8000` |
| `NEXT_PUBLIC_INTRO_VIDEO_URL` | Intro video on the home page | `/intro.mp4` (from `public/`) |
| `NEXT_PUBLIC_STORY_VIDEO_URL` | Story video on `/sparsh` | `/sparsh.mp4` (from `public/`) |
| `NEXT_PUBLIC_AEGIS_VIDEO_URL` | Video on `/aegis` | `/aegis.mp4` (from `public/`) |
| `NEXT_PUBLIC_HERO_IMAGE` | Optional hero artwork, e.g. `/brand/hero.webp` placed in `public/brand/` | empty (built-in artwork) |
| `NEXT_PUBLIC_SHOW_SAMPLE_PROOF` | Show the illustrative stats bar figures and testimonials | `true` |

On Amplify, set these under **Hosting, Environment variables**. `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Folder map

```
frontend/
├── app/                      Routes (one folder per URL)
│   ├── layout.tsx            Fonts, header, footer, skip link, metadata
│   ├── page.tsx              Home
│   ├── aegis/  sparsh/  contact/  portal-preview/  about/  privacy/  terms/
│   ├── login/  portal/  admin/   Client-side pages that call the API
│   ├── icon.png  apple-icon.png  opengraph-image.png
│   └── sitemap.ts  robots.ts  not-found.tsx
├── components/
│   ├── ui/                   Button, Section, Card, Tabs, Modal, Logo, VideoPlayer, PageHero, Art, ModuleCard, CtaBand
│   ├── layout/               Header, Footer, QuickDesk (WhatsApp button)
│   ├── home/                 Hero, StatsBar, Problem, Pillars, Calculator, Testimonials
│   ├── aegis/                PlansTable, ReportCard, WhyAegis
│   ├── sparsh/               CareConfigurator, Story
│   ├── portal/               PortalPreview (sidebar dashboard demo)
│   └── contact/              ContactForm
├── lib/
│   ├── config.ts             Phone, WhatsApp, email, cities, nav (edit contact details here)
│   ├── content.ts            All copy and sample data
│   ├── pricing.ts            Prices and calculators (must match backend/app/pricing.py)
│   ├── api.ts                Typed calls to the backend
│   └── cn.ts                 Class-name helper
├── public/brand/emblem.png   Logo (replace with the true vector or hi-res file)
├── tailwind.config.ts        Brand colours (sc-*) and fonts
└── next.config.mjs           /api proxy, security headers, redirects
```

## Common edits

| I want to change... | Edit |
|---|---|
| Phone, WhatsApp, email, address | `lib/config.ts` |
| Service descriptions, FAQs, sample report, portal demo data | `lib/content.ts` |
| Prices (all in ₹), discount, currencies, exchange rates | `lib/pricing.ts` and `backend/app/pricing.py` |
| Colours, fonts | `tailwind.config.ts`, `app/globals.css` |
| Office addresses, country list | `lib/config.ts` |
| Hero artwork | Drop an image in `public/brand/` and set `NEXT_PUBLIC_HERO_IMAGE` |
| Add a page | Create `app/<name>/page.tsx`, add it to `NAV` in `lib/config.ts` and to `app/sitemap.ts` |
| Logo | Replace `public/brand/emblem.png` (or change `components/ui/Logo.tsx`) |

Tailwind class names use the prefix `sc-`, for example `bg-sc-marine`, `text-sc-bronze`, `border-sc-gold`.

## Design and accessibility rules

- Use champagne gold (`sc-gold`) as a background or on navy. On light backgrounds, use Bronze (`sc-bronze`) for gold-coloured text.
- Never put white text on gold; use navy (`text-sc-marine`).
- Keep the logo at 48px tall or larger.
- Every interactive control needs a visible label and keyboard access. Tabs support arrow keys.
- Respect reduced motion (already handled in `globals.css` and the hero animation).
- Mark any content that is not real yet with `SampleBadge`.

## Authentication

Login sets an httpOnly cookie from the API. No token is stored in JavaScript. `/portal` and `/admin` redirect to `/login` on a 401.

## Interactive features worth knowing

- **Watch Our Story** (home hero) opens a dialog with the intro video. It plays `/intro.mp4` unless `NEXT_PUBLIC_INTRO_VIDEO_URL` is set.
- **Pillar arrows** switch which pillar's details show below the two cards.
- **Calculator** (home) has Aegis and Sparsh tabs, a currency selector, and passes the quote to the contact form.
- **Aegis** rent box updates the pricing table; the report card has Overview, Photos, Maintenance and Documents tabs and a full-report dialog.
- **Sparsh** care plan has per-service switches with frequency selectors and a live total.
- **Portal demo** sidebar switches views; Add Property, Raise Ticket, Book Appointment and Request Visit work on sample data only and are not saved.

## Videos

Do not commit video files. Upload them to S3 with CloudFront, YouTube or Vimeo, then paste the URL into the environment variables. `VideoPlayer` accepts an `.mp4` link, a local file such as `/aegis.mp4` placed in `frontend/public/`, or a normal YouTube/Vimeo link (watch, youtu.be and embed forms are converted automatically).

## Deploying to AWS Amplify

1. Connect the repository and set the app root to `frontend`.
2. Build command `npm run build`, output handled automatically for Next.js.
3. Set the environment variables above. `API_URL` must be the public HTTPS URL of the backend.
4. Add the custom domain and force HTTPS.

## Troubleshooting

| Problem | Fix |
|---|---|
| Form says "Something went wrong" | Backend is not running or `API_URL` is wrong |
| Login works but `/portal` redirects back to login | Open the site via the Next.js URL, not the API URL, so the cookie is first-party |
| New env value has no effect | Restart `npm run dev`; for `NEXT_PUBLIC_*` on Amplify, redeploy |
| Port 3000 busy | `npm run dev -- -p 3001` |