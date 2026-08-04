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
  `/programs`, `/scholarships`, `/resources`, `/compare`, `/counseling`, `/contact`, legal pages. Server components by
  default; pages needing interactivity delegate to a colocated `*Client.tsx` component (e.g. `HomeClient.tsx`,
  `DestinationsClient.tsx`, `ProgramsClient.tsx`).
- `src/matcher/**` — a self-contained "destination matcher" module (originally a separate app called
  `study-abroad-matcher`, ported in wholesale) with its own data, i18n, engine, and components. It's mounted into the
  main app at `src/app/quiz/page.tsx`, which just wires together `matcher/app/providers`, `matcher/components/*`, and
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
   `gviz/tq` endpoint at request time, remaps headers through `keyMappings`, and is used only by the
   `/destinations` **listing** page (`src/app/destinations/page.tsx`), not the detail pages.
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

### Lead capture (`src/app/api/lead/route.ts`)

Edge runtime route (`export const runtime = 'edge'`), ported from a Cloudflare Pages Function — kept on Edge
specifically so the manual Web Crypto/`btoa`/`atob` JWT-signing code (Google service-account auth, no `googleapis`
SDK) behaves the same as the original. It upserts into a Google Sheet keyed by normalized phone number (idempotent
resubmits), optionally verifies Cloudflare Turnstile, and always returns `200` with `ok:false` on sheet-write
failure — the student's match result must not be lost just because sheet persistence failed. Required env vars:
`GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `SHEET_ID`; optional `SHEET_TAB` (default `Leads`), `TURNSTILE_SECRET`.

### Launch config

`src/matcher/config.ts` (`CONFIG`) centralizes values that need to change before/around launch: counselling phone,
WhatsApp number/message, booking URL (falls back to WhatsApp until set), Turnstile site key, and
`showDraftDataWarning` (flip to `false` once destination data is verified/signed off).
