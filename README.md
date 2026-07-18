# Aqdaar

**Dhundo. Banao. Becho.** — Aapke idea se market tak, ek chhat ke neeche.

The marketing site for Aqdaar, which partners with founders, leaders, and
organizations who want to define categories, not follow them — from discovery,
to build, to market.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19, Node.js ≥ 20 |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion 12 |
| Mail | Nodemailer (contact form) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in SMTP details if you need the contact form
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` to `.env.local`. Everything in it is only needed by the
contact form — the rest of the site renders without any configuration.

| Variable | Required | Notes |
|---|---|---|
| `SMTP_HOST` | yes | Without this the form returns a 500 |
| `SMTP_PORT` | no | `465` (TLS) or `587` (STARTTLS). Defaults to `465` |
| `SMTP_USER` | yes | |
| `SMTP_PASS` | yes | |
| `CONTACT_TO` | no | Where enquiries land |
| `CONTACT_FROM` | no | The `From` header |

Nothing is committed — `.gitignore` covers `.env*`, with an exception for the
template. **If SMTP is unset the contact form fails for real visitors** with
"Email service is not configured yet", so set it before going live.

## Layout

```
src/
  app/                  routes (App Router)
    api/contact/        POST endpoint behind both contact forms
    blog/               index, [slug], and rss.xml
  components/
    intro/              first-open loading screen + the animation gate
    transition/         stair page transition (owns the app shell)
    ui/                 Reveal, PageHero, and other shared primitives
    <page>/             components scoped to one page
  lib/
    nav.ts              every route on the site, in one place
    blog.ts             post metadata
```

Adding a page? Put the route in `src/app/`, then add it to `ROUTES` in
`src/lib/nav.ts` — the navbar, the footer, and the transition's route warming
all read from there, so a page can't end up linked in one and missing from
another.

## Architecture notes

Two pieces are load-bearing and not obvious from reading them:

**`PageTransition` is the app shell, not a widget.** It wraps `{children}` in
the root layout and owns three things: the stair transition between pages, the
first-open loading screen, and the signal that tells entrance animations when
they may run. It never unmounts, which is what lets the intro decide "is this a
fresh load of the landing page?" exactly once.

**Route warming is the whole performance story.** The stairs can only swap the
route once they've fully covered the screen, so anything still loading at that
point is dead time on a black screen. Every route is warmed in the background
shortly after first paint, and a click waits for its route before the stairs
move. Note `router.prefetch` is a **no-op in development** — Next bails out of
it in `createPrefetchURL` to keep compile times down — so dev warms routes by
requesting them directly instead.

**Entrance animations are gated.** The landing hero animates on mount, so
without a gate it would play out and finish behind the loading screen, leaving a
dead hero on reveal. `useIntroReady()` (in `components/intro/ready.ts`) holds
them; it defaults to `true`, so every page outside the intro animates normally.

Otherwise each section owns its own animations and reads the design tokens in
`globals.css`, with durations and delays kept next to the components using them.
`prefers-reduced-motion` is respected globally in `globals.css`, and
`PageTransition` drops the stairs and the loading screen entirely for it.

## Deployment

This is **not a static site** and cannot be exported with `output: 'export'` —
`/api/contact` needs a Node runtime, and `/blog/rss.xml` is server-rendered.

Hosted on Hostinger **Node.js Web Apps** (requires a Business or Cloud plan;
Premium and Single do not support Node):

1. hPanel → **Websites → Add Website → Deploy Web App → Node.js Apps → Import Git Repository**
2. Authorize GitHub and select this repo. One hosting plan connects to one
   GitHub account at a time.
3. Build command `npm run build`, start command `npm run start -- -p $PORT`.
   Hostinger injects `PORT`; `next start` accepts `-p`, so no code change is
   needed.
4. Set the environment variables above **before** the first deploy.
5. Verify on the temporary URL before pointing a domain at it.

Pushes to `main` redeploy automatically.

## Gotchas

- **New component folders need a dev-server restart.** Tailwind v4's automatic
  content detection does not always pick up a brand-new directory while the dev
  server is running, so its classes silently never generate. New files inside an
  existing folder are fine.
- `next build` rewrites the `include` array in `tsconfig.json` to add its
  `distDir` types. Harmless, but it shows up as a diff.
