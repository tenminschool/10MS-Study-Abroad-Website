// ============================================================
// Google service-account auth (RS256 JWT → OAuth access token)
//
// Extracted from src/app/api/lead/route.ts so both consumers can share it:
//
//   - src/app/api/lead/route.ts  — writes leads   (scope: spreadsheets)
//   - src/lib/fetchSheetData.ts  — reads content  (scope: spreadsheets.readonly)
//
// Deliberately hand-rolled rather than using `googleapis`: the deploy target
// is workerd, which exposes crypto.subtle / btoa / atob as globals. The same
// code also runs under plain Node during `next build`, which is when the
// content pages are prerendered — Node 18+ exposes all three as globals too.
//
// Required env vars: GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY. Both must be
// present at BUILD time (prerendering), not just at runtime.
// ============================================================

export const SCOPE_SHEETS = 'https://www.googleapis.com/auth/spreadsheets';
export const SCOPE_SHEETS_READONLY = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export function b64url(data: ArrayBuffer | string): string {
  const bytes =
    typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function pemToArrayBuffer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '');
  const bin = atob(body);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

/** URL for the Sheets v4 `values` collection, e.g. api(id, "Leads!A1:B2"). */
export function sheetValuesUrl(id: string, path: string): string {
  return `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(path)}`;
}

/** True when the service-account credentials are configured. */
export function hasGoogleCredentials(): boolean {
  return Boolean(process.env.GOOGLE_SA_EMAIL && process.env.GOOGLE_SA_PRIVATE_KEY);
}

// A single build prerenders three pages that make five sheet reads between
// them; without this cache that is five JWT signings and five token requests.
// Keyed by scope, since read-only and read-write tokens are not interchangeable.
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

export async function getAccessToken(scope: string = SCOPE_SHEETS): Promise<string> {
  const cached = tokenCache.get(scope);
  if (cached && Date.now() < cached.expiresAt) return cached.token;

  const email = process.env.GOOGLE_SA_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY;
  if (!email || !privateKey) {
    throw new Error('missing GOOGLE_SA_EMAIL / GOOGLE_SA_PRIVATE_KEY');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsigned = `${header}.${claims}`;

  // Env vars may store newlines as literal \n (Vercel/Cloudflare dashboards) or
  // as real newlines (a quoted multi-line value in .env.local). Handle both.
  const pem = privateKey.replace(/\\n/g, '\n');
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(pem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${b64url(sig)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in?: number };

  // Retire the cached token a minute early so an in-flight request can't be
  // the one that discovers it expired.
  const ttl = (json.expires_in ?? 3600) - 60;
  tokenCache.set(scope, { token: json.access_token, expiresAt: Date.now() + ttl * 1000 });

  return json.access_token;
}
