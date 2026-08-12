import { getAccessToken, sheetValuesUrl, SCOPE_SHEETS_READONLY } from './googleAuth';

// The CONTENT spreadsheet (countries, scholarships, testimonials). Deliberately
// a literal and NOT process.env.SHEET_ID — that env var points at the separate
// *Leads* spreadsheet used by src/app/api/lead/route.ts. Two independent
// sources of truth; wiring the env var in here would repoint the whole
// marketing site at the leads sheet.
const SHEET_ID = "1IBQP4V9fIL1CCg64KA8wj5uihRnnOluw035aHpfFsfg";

const keyMappings: Record<string, string> = {
  'id': 'id',
  'name': 'name',
  'slug': 'slug',
  'flag_emoji': 'flag_emoji',
  'hero_image url': 'hero_image',
  'hero_image': 'hero_image',
  'tuitionrange': 'tuitionRange',
  'costofliving': 'costOfLiving',
  'numuniversities': 'numUniversitiesStr',
  'workpermit': 'workPermitStr',
  'whystudyhere': 'whyStudyHere',
  'popular_subjects': 'popular_subjects',
  'top_intakes': 'top_intakes',
  'visa_description': 'visa_description',
  'visa_processing': 'visa_processing',
  'country_slug': 'country_slug',
  'city': 'city',
  'world_ranking': 'world_ranking',
  'tuition_per_year': 'tuition_per_year',
  'accommodation_per_year': 'accommodation_per_year',
  'living_cost_per_month': 'living_cost_per_month',
  'ielts_requirement': 'ielts_requirement',
  'min_gpa': 'min_gpa',
  'intakes': 'intakes',
  'image url': 'image',
  'image': 'image',
  'country_id': 'country_id',
  'amount': 'amount',
  'level': 'level',
  'deadline': 'deadline',
  'desc': 'desc',
  'university': 'university',
  'quote': 'quote',
  'avatar url': 'avatar',
  'avatar': 'avatar',
  'approved?': 'approved',
  'approved': 'approved'
};

function cleanKey(label: string): string {
  if (!label) return '';
  const clean = label.split('\n')[0].split('(')[0].trim().toLowerCase();
  if (keyMappings[clean]) {
    return keyMappings[clean];
  }
  const snake = clean.replace(/\s+/g, '_');
  if (keyMappings[snake]) {
    return keyMappings[snake];
  }
  return snake;
}

function splitStringToArray(val: any): string[] {
  if (!val) return [];
  const str = String(val).trim();
  if (!str) return [];
  if (str.includes('|')) {
    return str.split('|').map(s => s.trim()).filter(Boolean);
  }
  if (str.includes(',')) {
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [str];
}

export async function fetchSheet(tabName: string) {
  // Tabs with leading/trailing spaces in spreadsheet
  let queryTab = tabName;
  if (tabName === 'Scholarships') {
    queryTab = ' Scholarships ';
  }

  // Most tabs reserve row 1 and put headers on row 2; a few have headers on row 1 instead.
  const headerOnRow1Tabs = ['Testimonials'];
  const cells = headerOnRow1Tabs.includes(tabName) ? 'A1:Z' : 'A2:Z';
  // Single quotes are required around the tab name — the Scholarships tab is
  // literally named " Scholarships " with leading/trailing spaces.
  const url = sheetValuesUrl(SHEET_ID, `'${queryTab}'!${cells}`);

  const isDev = process.env.NODE_ENV === 'development';
  const fetchOptions = isDev
    ? { cache: 'no-store' as const }
    : { next: { revalidate: 60 } };

  const token = await getAccessToken(SCOPE_SHEETS_READONLY);
  const res = await fetch(url, {
    ...fetchOptions,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    // Include the status code and body — `statusText` alone renders as a bare
    // "Unauthorized", which made a sheet-permission outage hard to diagnose.
    const body = await res.text().catch(() => '');
    throw new Error(
      `Failed to fetch sheet ${tabName}: ${res.status} ${res.statusText} ${body.slice(0, 300)}`.trim(),
    );
  }

  // FORMATTED_VALUE (the default renderOption) returns every cell as a string.
  const json = (await res.json()) as { values?: string[][] };
  const values = json.values ?? [];
  if (values.length === 0) return [];

  const headers = values[0].map((label) => cleanKey(String(label ?? '')));

  const rows = values.slice(1).map((row) => {
    const obj: any = {};
    headers.forEach((header: string, i: number) => {
      if (!header) return;
      // The Sheets API truncates trailing empty cells, so short rows are normal.
      const val = row[i] ?? "";

      // Parse specific fields to match codebase expectations
      if (header === 'whyStudyHere' || header === 'popular_subjects' || header === 'top_intakes' || header === 'intakes') {
        obj[header] = splitStringToArray(val);
      } else if (header === 'world_ranking' || header === 'tuition_per_year' || header === 'accommodation_per_year' || header === 'living_cost_per_month' || header === 'min_gpa') {
        const cleanVal = typeof val === 'string' ? val.replace(/[^0-9.]/g, '') : val;
        obj[header] = cleanVal !== "" ? Number(cleanVal) : 0;
      } else {
        obj[header] = typeof val === 'string' ? val.trim() : val;
      }
    });
    return obj;
  });

  return rows;
}

/**
 * fetchSheet() that degrades instead of throwing.
 *
 * The content pages are statically prerendered, so a throw in fetchSheet()
 * fails `next build` outright — which is how a change to the spreadsheet's
 * sharing settings once blocked every deploy on both Vercel and Cloudflare
 * even though nothing in the repo was broken. Content availability should not
 * gate shipping code, so callers pass a fallback and the failure is logged
 * loudly rather than thrown.
 *
 * Pages use `revalidate: 60`, so a page baked with fallback data is replaced
 * by real data at the next successful revalidation — no redeploy needed.
 */
export async function fetchSheetSafe(
  tabName: string,
  fallback: unknown[] = [],
): Promise<Awaited<ReturnType<typeof fetchSheet>>> {
  try {
    return await fetchSheet(tabName);
  } catch (err) {
    console.error(
      `[fetchSheet] "${tabName}" failed — serving ${fallback.length} fallback row(s). ` +
        `Check the service account still has Viewer access to the content sheet and that ` +
        `GOOGLE_SA_EMAIL / GOOGLE_SA_PRIVATE_KEY are set in this environment.`,
      err,
    );
    return fallback;
  }
}
