# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing + lead-gen site for 10 Minute School's "Study Abroad" product: country/university browsing pages plus a
multi-step "destination matcher" quiz that scores a student's profile against destination rules and captures the
result as a lead. Next.js App Router, React, TypeScript, plain CSS files per route/component (no Tailwind/CSS-in-JS).

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config, eslint.config.mjs)
```

There is no test suite and no `tsc --noEmit`/typecheck script configured — `npm run build` is the closest thing to a
correctness check and will surface both type errors and lint-adjacent build failures.

## Breaking-changes warning (read this first)

`AGENTS.md` (pulled in above) flags that the installed Next.js/React versions are ahead of typical training data and
may have breaking API changes. Before using an unfamiliar Next.js API, check `node_modules/next/dist/docs/` if
`node_modules` is installed; if it isn't installed yet, run `npm install` first.

## Architecture

### Two parallel apps under one router

- `src/app/**` — the marketing site: home, `/destinations`, `/destinations/[country]/[university]/[program]`,
  `/programs`, `/scholarships`, `/resources`, `/compare`, `/contact`, legal pages. Server components by
  default; pages needing interactivity delegate to a colocated `*Client.tsx` component (e.g. `HomeClient.tsx`,
  `DestinationsClient.tsx`, `ScholarshipsClient.tsx`).
- `src/matcher/**` — a self-contained "destination matcher" module (originally a separate app called
  `study-abroad-matcher`, ported in wholesale) with its own data, i18n, engine, and components. It's mounted into the
  main app at `src/app/profile-match/page.tsx`, which just wires together `matcher/app/providers`, `matcher/components/*`, and
  `matcher/engine/match`. `src/matcher` has no dependency on `src/app`/`src/components`, so it could be lifted out
  intact.

Because of that history, **don't assume shared conventions between the two trees** — the matcher has its own CSS
file (`matcher/styles/matcher.css`), its own i18n system (`matcher/i18n/strings.ts` + `t()` from `useApp()`), and its
own types (`matcher/engine/types.ts`), independent of anything in `src/components` or `src/data`.

### Three separate, non-syncing sources of destination data

This is the biggest trap in the codebase — there is no single source of truth for "country info":

1. `src/data/destinations.ts` — static TS data, used by `/destinations/[country]/**` (country/university/program
   detail pages) via direct import.
2. `src/lib/fetchSheetData.ts` (`fetchSheet(tabName)`) — fetches a public Google Sheet (by `SHEET_ID`) as JSON via the
   `gviz/tq` endpoint at request time, remaps headers through `keyMappings`, and is imported by three server
   components — `src/app/page.tsx`, `src/app/destinations/page.tsx` (the listing page), and
   `src/app/scholarships/page.tsx` — but not by the `/destinations/[country]/**` detail pages, which use
   `src/data/destinations.ts` instead.
3. `src/matcher/data/destinations/*.json` — per-country research files (rules, costs, visa, scholarships) consumed
   only by the matcher engine, normalised through `matcher/engine/normalise.ts` and registered in
   `matcher/data/index.ts`.

`src/app/compare/page.tsx` additionally hardcodes its own small country/university dataset inline.

When asked to "update country data," clarify (or check) which of these four the request actually targets — editing
one does not propagate to the others. `gen_data.py`, `fix_css.py`, `update_css.py`, and `scripts/process-country-photos.py`
at the repo root are one-off content/CSS generation scripts, not part of the build; treat them as historical/manual
tools, not something imported at runtime.

### The matcher engine (`src/matcher/engine`)

- `match.ts` runs two passes per destination against a `StudentProfile`: Pass A is hard gates (produces a `block`
  reason and caps score at `BLOCKED_SCORE_CAP`), Pass B is a weighted fit score across academic/english/budget/
  priority/timing (weights in `WEIGHTS`). Tiers (`strong`/`possible`/`unlikely`) are cut at `TIER_STRONG`/
  `TIER_POSSIBLE`.
- Results are emitted as `Reason { kind, code, params }` — codes, never literal sentences — so the same result
  renders in English or Bangla via `matcher/i18n/strings.ts`. When adding a new reason, add the code to
  `ReasonCode` in `engine/types.ts` and a template in both languages in `i18n/strings.ts`; don't inline user-facing
  strings in the engine.
- `RULES_VERSION` in `matcher/data/index.ts` must be bumped on any change to destination rules data — it's recorded
  against every lead row so a counsellor can tell which ruleset produced a recommendation. To add a country: drop a
  research JSON into `matcher/data/destinations/`, add it to `editorial.json`, import it in `matcher/data/index.ts`.
- The engine has no DOM/React dependency (`engine/types.ts` header comment) so it runs identically client-side (quiz
  UI, instant feedback) and server-side (`src/app/api/lead/route.ts` re-runs `matchStudent()` on submit — the
  server is authoritative, the client-side result is not trusted for what gets written to the sheet).

### Language and theme sync (easy to regress)

Dark mode is currently force-disabled site-wide (see the inline script in `src/app/layout.tsx`) regardless of stored
preference — don't "fix" this without checking with the user first, it's intentional.

Language (`en`/`bn`) is trickier: `Navbar.tsx` (main site) and `matcher/app/providers.tsx` (`AppProvider`/`useApp`)
are two independent React trees that must agree on `lang`, with no shared parent state. They synchronize via:

1. An inline `<script>` in `layout.tsx` that reads `localStorage.getItem('lang')` and sets `data-lang`/`lang` on
   `<html>` before first paint (avoids a flash of the wrong language).
2. Both components initialize React state to `'en'` (matching SSR, which has no `localStorage`), then correct from
   `document.documentElement`'s `data-lang` attribute inside a `useLayoutEffect` that runs once post-hydration.
3. Toggling language writes `localStorage` and dispatches a `window` `langChange` event; both components listen for
   it.

If you touch language switching, all three parts (the inline script, the `useLayoutEffect` initial sync, and the
`langChange` listener) need to stay in sync in both `Navbar.tsx` and `matcher/app/providers.tsx` — this has regressed
before (see recent commit history) and is the first thing to check if language desyncs after a page-load change.

### Country flags

Render flags with the `<Flag>` component (`src/components/Flag.tsx` for the main app, `src/matcher/components/Flag.tsx`
for the matcher — separate implementations, same "don't assume shared conventions" split as above), backed by the
`flag-icons` package's SVGs. Do not use Unicode flag emoji (`🇺🇸`, `🇬🇧`, …) — they render as blank boxes on Windows.

### Lead capture (`src/app/api/lead/route.ts`)

Ported from a Cloudflare Pages Function, keeping the manual Web Crypto/`btoa`/`atob` JWT-signing code (Google
service-account auth, no `googleapis` SDK). It runs on the **default Node.js runtime** — do not add
`export const runtime = 'edge'`, `@opennextjs/cloudflare` does not support the Edge runtime and the deploy will
misbehave. The signing code is unaffected either way: the deploy target is workerd, which exposes `crypto.subtle`,
`btoa` and `atob` as globals regardless of the Next.js runtime setting. It upserts into a Google Sheet keyed by
normalized phone number (idempotent resubmits), optionally verifies Cloudflare Turnstile, and always returns `200`
with `ok:false` on sheet-write failure — the student's match result must not be lost just because sheet persistence
failed. Required env vars: `GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `SHEET_ID`; optional `SHEET_TAB` (default
`Leads`), `TURNSTILE_SECRET`. In production all of these are Worker **secrets**, not `vars` — see Deployment below.

### Launch config

`src/matcher/config.ts` (`CONFIG`) centralizes values that need to change before/around launch: counselling phone,
WhatsApp number/message, booking URL (falls back to WhatsApp until set), Turnstile site key, and
`showDraftDataWarning` (flip to `false` once destination data is verified/signed off).

### Deployment (Cloudflare Workers via OpenNext)

Deployed to a Cloudflare Worker with `@opennextjs/cloudflare`, driven by Cloudflare Workers Builds on push.
`wrangler.jsonc` and `open-next.config.ts` are **committed on purpose** — when they were missing, `wrangler deploy`
silently ran its interactive first-run setup in CI and regenerated a throwaway config on every build, which is what
broke the deploy (it named the Worker after `package.json`'s `study-abroad` and declared no `vars`).

Three things to keep straight when touching any of this:

- **`name` and the `WORKER_SELF_REFERENCE` service binding must both be `10ms-study-abroad`.** Workers Builds
  overrides the uploaded script name to match the Worker attached to the build, but it does *not* rewrite the
  service binding, so a stale name there fails the deploy with `code: 10143`. `WORKER_SELF_REFERENCE` itself is
  needed for ISR revalidation (the Worker calls itself).
- **The Google/Sheet credentials are Worker secrets, not `vars`.** Never add them to `wrangler.jsonc`: a deploy
  overwrites remote config with local, so config-declared vars can be wiped by an incomplete config, and wrangler
  prints `vars` in full in the build log (that is how a service-account private key once leaked). Set them with
  `npx wrangler secret put <NAME>`; mirror them into a local `.dev.vars` (gitignored) for `npm run preview`.
  `SHEET_ID` is a secret only on the lead-capture path — `src/app/api/lead/route.ts` reads `process.env.SHEET_ID`
  for the Leads spreadsheet. The content sheet behind the home/destinations/scholarships pages does not use it: its
  ID is a plain hardcoded literal at `src/lib/fetchSheetData.ts:1` (that sheet is published read-only, so it is not
  a secret). Two independent sources of truth — setting or rotating the `SHEET_ID` secret does not change what
  `fetchSheet()` reads, and editing the literal does not change where leads are written. If either spreadsheet
  moves, update both.
- **`workers_dev` and `preview_urls` are deliberately `false`.** Generated configs turn them back on.

Commands: `npm run build:worker` (build the Worker bundle), `npm run preview` (run it locally in workerd),
`npm run deploy` (deploy an already-built bundle). Workers Builds is configured to run the first and the last, so
`next build` runs once rather than twice. `@opennextjs/cloudflare` peer-requires `next >=16.2.11` on the 16.x line —
check that range before bumping Next, an unsatisfied peer only surfaces as an install-time warning.

### Design reference

`md/design.md` is 10 Minute School's unified brand/design system doc (tokens, components, page patterns, do's and
don'ts) — not specific to this repo and not wired into the build, but the reference to follow for any visual/UI work
(colors, spacing, typography, component styling) so new work matches the rest of 10MS's product surfaces.
