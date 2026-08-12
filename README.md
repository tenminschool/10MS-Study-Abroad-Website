# 10 Minute School — Study Abroad

Marketing and lead-gen site for 10 Minute School's **Study Abroad** product: country/university browsing pages
plus a multi-step **destination matcher** quiz that scores a student's profile against destination rules and
captures the result as a lead.

Built with Next.js (App Router), React, and TypeScript. Styling is plain CSS files per route/component — no
Tailwind, no CSS-in-JS. Deployed to Cloudflare Workers via OpenNext.

> **Note for AI coding agents:** read [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md) before making changes.
> The installed Next.js/React versions are ahead of most training data and have breaking API changes; `CLAUDE.md`
> also documents several non-obvious traps in this codebase (see [Things to know](#things-to-know) below).

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also the closest thing to a typecheck — no separate tsc/test script)
npm run start    # run the production build locally
npm run lint      # eslint (flat config, eslint.config.mjs)
```

### Environment variables

Lead capture (`src/app/api/lead/route.ts`) needs a `.env.local` (gitignored) with:

- `GOOGLE_SA_EMAIL` (required) — Google service-account email used to sign requests to Sheets
- `GOOGLE_SA_PRIVATE_KEY` (required) — service-account private key (PEM)
- `SHEET_ID` (required) — spreadsheet leads are written to
- `SHEET_TAB` (optional) — sheet tab name, defaults to `Leads`
- `TURNSTILE_SECRET` (optional) — enables Cloudflare Turnstile verification on the lead form

Without these, the app still runs — the lead API returns `ok:false` gracefully instead of failing the request.

## Project structure

Two largely independent trees live under one router — don't assume shared conventions between them.

```text
src/
├── app/            # marketing site: home, /destinations, /programs, /scholarships,
│                   # /resources, /compare, legal pages, and the lead-capture API route
├── components/     # shared UI for the main site (Navbar, Footer, Carousel, Flag, ...)
├── data/           # static destination data used by /destinations/[country]/** detail pages
├── lib/            # fetchSheetData.ts (Google Sheet → JSON at request time), testimonials
└── matcher/        # self-contained "destination matcher" quiz module (own data, i18n, engine,
                    # components, CSS) mounted at /profile-match — has no dependency on src/app
```

### The matcher (`src/matcher/`)

A ported sub-app with its own conventions: `matcher/styles/matcher.css`, its own i18n
(`matcher/i18n/strings.ts` + `t()` from `useApp()`), and its own types (`matcher/engine/types.ts`).

- `engine/match.ts` scores a `StudentProfile` against each destination in two passes — hard gates, then a
  weighted fit score — producing a `strong` / `possible` / `unlikely` tier.
- Results are coded (`Reason { kind, code, params }`), never literal strings, so the UI can render in English or
  Bangla.
- Destination research data lives in `matcher/data/destinations/*.json`, normalised through
  `matcher/engine/normalise.ts` and registered in `matcher/data/index.ts`. Bump `RULES_VERSION` there whenever
  rules data changes.
- Runs identically client-side (instant quiz feedback) and server-side — `src/app/api/lead/route.ts` re-runs
  `matchStudent()` on submit, since the server result (not the client's) is authoritative.

### Destination data — three sources, not one

There is **no single source of truth** for "country info" in this repo:

1. `src/data/destinations.ts` — static TS data used by the `/destinations/[country]/**` detail pages.
2. `src/lib/fetchSheetData.ts` — fetches a public Google Sheet at request time; used by the home, `/destinations`
   listing, and `/scholarships` pages (not by the detail pages above).
3. `src/matcher/data/destinations/*.json` — used only by the matcher engine.

`src/app/compare/page.tsx` also hardcodes its own small dataset inline. When updating country data, check which
of these the change actually needs to touch — editing one does not propagate to the others.

## Deployment

Deployed to a Cloudflare Worker (`10ms-study-abroad`) via `@opennextjs/cloudflare`, driven by Cloudflare Workers
Builds on push to `main`. `wrangler.jsonc` and `open-next.config.ts` are committed on purpose — do not delete or
regenerate them.

```bash
npm run build:worker   # build the Worker bundle
npm run preview        # run it locally in workerd
npm run deploy          # deploy an already-built bundle
```

Google/Sheets credentials are Worker **secrets**, not `vars` — set with `npx wrangler secret put <NAME>` and
mirror into `.dev.vars` (gitignored) for `npm run preview`. Never add them to `wrangler.jsonc`.

## Things to know

- **Dark mode is force-disabled** site-wide (`src/app/layout.tsx`) regardless of stored preference — intentional,
  don't "fix" without checking first.
- **Language sync (`en`/`bn`)** is split across two independent React trees (`Navbar.tsx` and
  `matcher/app/providers.tsx`) that agree via `localStorage`, an inline pre-hydration `<script>` in `layout.tsx`,
  and a `langChange` window event. All three parts need to move together — this has regressed before.
- **Flags**: always use the `<Flag>` component (separate implementations in `src/components/` and
  `src/matcher/components/`), backed by the `flag-icons` package. Never use Unicode flag emoji — they render as
  blank boxes on Windows.
- **Lead API runs on the Node.js runtime, not Edge** — `@opennextjs/cloudflare` does not support Edge, and the
  manual Web Crypto JWT-signing code for Google auth works fine under it regardless.
- `gen_data.py`, `fix_css.py`, `update_css.py`, and `scripts/process-country-photos.py` are one-off content/CSS
  generation scripts, not part of the build — historical/manual tools only.
- `md/design.md` is 10 Minute School's brand/design reference — not wired into the build, but the source of truth
  for any visual/UI work.
