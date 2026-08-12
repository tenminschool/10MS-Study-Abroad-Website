// ============================================================
// POST /api/lead
//
// Ported from study-abroad-matcher/functions/api/lead.ts (a Cloudflare
// Pages Function) to a Next.js route handler — same logic, same env var
// names. Runs on the default Node.js runtime, NOT `runtime = 'edge'`:
// @opennextjs/cloudflare (how this app is deployed) does not support the
// Edge runtime. The Web Crypto / btoa / atob calls below still behave
// exactly as in the original because the deploy target is workerd, which
// exposes crypto.subtle, btoa and atob as globals either way.
//
// 1. Verifies Turnstile (if configured)
// 2. Re-runs the matching engine server-side — the student cannot
//    tamper with the rules, and the sheet records exactly what was
//    shown
// 3. Upserts a row into the Google Sheet, keyed on phone number
//
// Required env vars: GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY, SHEET_ID.
// Optional: SHEET_TAB (default "Leads"), TURNSTILE_SECRET.
// ============================================================

import { matchStudent } from '../../../matcher/engine/match';
import type { MatchOutput, StudentProfile } from '../../../matcher/engine/types';
import { getAccessToken, sheetValuesUrl as api } from '../../../lib/googleAuth';

interface Body {
  status: 'partial' | 'complete';
  profile: StudentProfile;
  attribution?: Record<string, string>;
  turnstileToken?: string;
  rulesVersion?: string;
}

const HEADERS = [
  'lead_id', 'created_at', 'updated_at', 'status',
  'name', 'phone', 'whatsapp', 'email', 'consent',
  'study_level', 'field', 'intake',
  'ssc_year', 'ssc_result', 'hsc_year', 'hsc_result', 'ug_year', 'ug_result',
  'backlogs', 'academic_index',
  'english_test', 'english_overall', 'english_bands', 'ielts_equivalent',
  'current_status', 'gap_years', 'gap_reason',
  'visa_refusal', 'refusal_details', 'passport_status',
  'budget_bdt', 'funding_source', 'priorities', 'preferred_countries', 'notes',
  'matches_strong', 'matches_possible', 'matches_unlikely', 'top_score',
  'utm_source', 'utm_medium', 'utm_campaign', 'referrer', 'device',
  'rules_version', 'suggested_universities', 'english_status',
];

// ------------------------------------------------------------
// Sheets helpers
//
// Service-account auth (RS256 JWT → access token) lives in src/lib/googleAuth.ts
// so the content-fetching path can share it. getAccessToken() defaults to the
// read/write spreadsheets scope this route needs.
// ------------------------------------------------------------

async function ensureHeaders(sheetId: string, token: string, tab: string) {
  const res = await fetch(`${api(sheetId, `${tab}!A1:BZ1`)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = (await res.json()) as { values?: string[][] };
  if (!json.values || json.values.length === 0) {
    await fetch(`${api(sheetId, `${tab}!A1`)}?valueInputOption=RAW`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [HEADERS] }),
    });
  }
}

/** Returns the 1-based sheet row for this phone, or null. */
async function findRowByPhone(
  sheetId: string,
  token: string,
  tab: string,
  phone: string,
): Promise<number | null> {
  const res = await fetch(`${api(sheetId, `${tab}!F:F`)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { values?: string[][] };
  const rows = json.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i]?.[0] ?? '').trim() === phone) return i + 1;
  }
  return null;
}

// ------------------------------------------------------------
// Row construction
// ------------------------------------------------------------

function resultStr(e: { value: number | null; system: string }): string {
  return e.value === null ? '' : `${e.value} (${e.system})`;
}

function buildRow(
  leadId: string,
  createdAt: string,
  body: Body,
  matches: MatchOutput | null,
): (string | number)[] {
  const p = body.profile;
  const a = body.attribution ?? {};
  const bands = [p.bandListening, p.bandReading, p.bandWriting, p.bandSpeaking];
  const bandStr = bands.every((b) => b === null) ? '' : `L${bands[0] ?? '-'} R${bands[1] ?? '-'} W${bands[2] ?? '-'} S${bands[3] ?? '-'}`;

  return [
    leadId,
    createdAt,
    new Date().toISOString(),
    body.status,
    p.name,
    p.phone,
    p.whatsapp || p.phone,
    p.email,
    p.consent ? 'yes' : 'no',
    p.level ?? '',
    p.field,
    p.intakeChoice || (p.intake ?? ''),
    p.ssc.year ?? '',
    resultStr(p.ssc),
    p.hsc.year ?? '',
    resultStr(p.hsc),
    p.undergrad.year ?? '',
    resultStr(p.undergrad),
    p.backlogs,
    matches?.academicIndex ?? '',
    p.englishTest ?? '',
    p.englishOverall ?? '',
    bandStr,
    matches?.ieltsEquivalent ?? '',
    p.currentStatus,
    p.gapYears,
    p.gapReason,
    p.visaRefusal ? 'yes' : 'no',
    p.refusalDetails,
    p.passportStatus,
    p.budgetBDT ?? '',
    p.funding ?? '',
    p.priorities.join(', '),
    p.preferredCountries.join(', '),
    p.notes,
    matches?.strong.join(', ') ?? '',
    matches?.possible.join(', ') ?? '',
    matches?.unlikely.join(', ') ?? '',
    matches?.topScore ?? '',
    a.utm_source ?? '',
    a.utm_medium ?? '',
    a.utm_campaign ?? '',
    a.referrer ?? '',
    a.device ?? '',
    matches?.rulesVersion ?? body.rulesVersion ?? '',
    // What the student was shown, country by country, so the counsellor
    // opens the call from the same page the student is looking at.
    matches?.results
      .filter((r) => !r.blocked && r.universities.length > 0)
      .slice(0, 3)
      .map((r) => `${r.destinationId}: ${r.universities.map((u) => u.name).join(' | ')}`)
      .join('; ') ?? '',
    // Whether the English score is a real certificate, a prediction, or absent.
    p.englishTest === 'none' || p.englishTest === null
      ? 'none'
      : p.englishPredicted
        ? 'predicted'
        : 'taken',
  ];
}

// ------------------------------------------------------------
// Handler
// ------------------------------------------------------------

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export async function POST(request: Request): Promise<Response> {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: 'bad_json' }, 400);
  }

  const p = body.profile;
  // BD numbers arrive as 01XXXXXXXXX or +8801XXXXXXXXX; store the +880 form
  // so the upsert key is stable whichever way the student typed it.
  const normalisePhone = (raw: string): string | null => {
    const d = (raw ?? '').replace(/\D/g, '');
    if (/^8801[3-9]\d{8}$/.test(d)) return '+' + d;
    if (/^01[3-9]\d{8}$/.test(d)) return '+880' + d.slice(1);
    return null;
  };
  const phone = normalisePhone(p?.phone ?? '');
  if (!p?.name?.trim() || !phone) {
    return json({ error: 'invalid_profile' }, 400);
  }
  if (!p.consent) return json({ error: 'no_consent' }, 400);
  p.phone = phone;
  p.whatsapp = normalisePhone(p.whatsapp ?? '') ?? phone;

  // ---- Spam check ----
  const turnstileSecret = process.env.TURNSTILE_SECRET;
  if (turnstileSecret) {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: body.turnstileToken ?? '',
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    });
    const v = (await verify.json()) as { success: boolean };
    if (!v.success) return json({ error: 'failed_challenge' }, 403);
  }

  // ---- Authoritative match, computed here rather than in the browser ----
  const matches = body.status === 'complete' ? matchStudent(p) : null;

  // ---- Persist ----
  const sheetId = process.env.SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SA_EMAIL || !process.env.GOOGLE_SA_PRIVATE_KEY) {
    console.error('lead capture is not configured (missing GOOGLE_SA_EMAIL / GOOGLE_SA_PRIVATE_KEY / SHEET_ID)');
    return json({ ok: false, matches, error: 'not_configured' }, 200);
  }

  const tab = process.env.SHEET_TAB || 'Leads';
  try {
    const token = await getAccessToken();
    await ensureHeaders(sheetId, token, tab);

    const existing = await findRowByPhone(sheetId, token, tab, phone);
    const now = new Date().toISOString();

    if (existing) {
      // Preserve the original created_at.
      const prev = await fetch(`${api(sheetId, `${tab}!B${existing}`)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const prevJson = (await prev.json()) as { values?: string[][] };
      const createdAt = prevJson.values?.[0]?.[0] ?? now;
      const leadPrev = await fetch(`${api(sheetId, `${tab}!A${existing}`)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const leadJson = (await leadPrev.json()) as { values?: string[][] };
      const leadId = leadJson.values?.[0]?.[0] ?? crypto.randomUUID();

      const put = await fetch(`${api(sheetId, `${tab}!A${existing}`)}?valueInputOption=RAW`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [buildRow(leadId, createdAt, body, matches)] }),
      });
      if (!put.ok) throw new Error(`sheet update ${put.status}: ${await put.text()}`);
    } else {
      const append = await fetch(`${api(sheetId, `${tab}!A1`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [buildRow(crypto.randomUUID(), now, body, matches)] }),
      });
      if (!append.ok) throw new Error(`sheet append ${append.status}: ${await append.text()}`);
    }
  } catch (err) {
    // The student still gets their result — losing the lead is our problem, not theirs.
    console.error('sheet write failed', err);
    return json({ ok: false, matches, error: 'sheet_write_failed' }, 200);
  }

  return json({ ok: true, matches });
}
