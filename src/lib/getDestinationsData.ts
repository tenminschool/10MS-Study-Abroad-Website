import { fetchSheetSafe } from './fetchSheetData';
import {
  destinations as staticDestinations,
  universities as staticUniversities,
  programs as staticPrograms,
  type Destination,
  type University,
  type Program,
  type Scholarship,
} from '@/data/destinations';

function matchesCountry(dest: { id?: string; slug?: string; name?: string }, countryId: string | undefined): boolean {
  if (!countryId) return false;
  const needle = countryId.toLowerCase();
  return dest.id?.toLowerCase() === needle || dest.slug?.toLowerCase() === needle || dest.name?.toLowerCase() === needle;
}

function buildVisaOverview(row: any): Destination['visa_overview'] {
  // Fallback rows (static data) already carry a structured visa_overview — keep it as-is.
  if (row.visa_overview) return row.visa_overview;
  if (!row.visa_processing) return undefined;
  // The sheet has no requirements-list column today (only flat visa_processing/visa_description),
  // so requirements is always empty here — the country page shows visa_description as plain text
  // under the processing badge instead of an empty "Key Requirements" bullet list.
  const requirements = Array.isArray(row.visa_requirements) ? row.visa_requirements : [];
  return { processing: row.visa_processing, requirements };
}

function buildScholarshipsList(row: any, rawScholarships: any[]): Scholarship[] {
  // Fallback rows (static data) already carry a nested scholarships_list — keep it as-is.
  if (Array.isArray(row.scholarships_list)) return row.scholarships_list;
  return rawScholarships
    .filter(s => matchesCountry(row, s.country_id))
    .map(s => ({
      name: s.name || '',
      amount: s.amount || '',
      desc: s.desc || '',
      level: s.level || undefined,
      deadline: s.deadline || undefined,
    }));
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\([^)]*\)/g, '') // drop parenthetical suffixes, e.g. "(MIT)"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// The University tab is real but hand-maintained and messy:
// - Country association is only filled on the first row of each country's block (blank cells
//   below inherit the country above), so it needs forward-filling.
// - Its "slug" column is reused as a group/tier tag (e.g. "GO8", "Russell Group") shared by
//   several different universities, not a unique per-row identifier — using it verbatim would
//   collide multiple universities onto the same page URL. The slug is derived from the
//   university name instead.
// - Some rows aren't one-row-per-university at all: they cram a numbered list of names into a
//   single cell with no tuition/IELTS/GPA/etc. Those rows (and any row whose country doesn't
//   match a site destination) are skipped rather than rendered as broken/empty cards.
function normalizeUniversities(rawRows: any[], destinations: Destination[]): University[] {
  const usedSlugs = new Set<string>();
  let lastId = '';
  const result: University[] = [];

  for (const row of rawRows) {
    if (row.id) lastId = row.id;

    // Real per-university rows always carry a city and a tuition figure; the crammed
    // multi-name rows carry neither.
    if (!row.city || typeof row.tuition_per_year !== 'number' || row.tuition_per_year <= 0) continue;
    if (!row.name) continue;

    // country_slug is only ever populated on the one row where it's set (it isn't a
    // forward-filled column like `id` is) — carrying it forward across blocks previously
    // caused every later block to silently resolve to whichever destination that one
    // value matched, once set.
    const country = destinations.find(d => matchesCountry(d, row.country_slug) || matchesCountry(d, lastId));
    if (!country) continue; // no matching site destination (e.g. a country not offered on the site)

    let slug = slugify(row.name);
    if (!slug) continue;
    if (usedSlugs.has(slug)) {
      let i = 2;
      while (usedSlugs.has(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }
    usedSlugs.add(slug);

    result.push({
      id: slug,
      name: row.name,
      slug,
      country_slug: country.slug,
      city: row.city,
      // No column in the sheet carries this today (the sheet's rank column has no header
      // label, so it isn't read at all) — 0 is treated as "unranked" by the pages that show it.
      world_ranking: 0,
      intakes: Array.isArray(row.intakes) ? row.intakes : [],
      description: row.description || '',
      campus_life_notes: row.campus_life_notes || '',
      tuition_per_year: row.tuition_per_year,
      accommodation_per_year: typeof row.accommodation_per_year === 'number' ? row.accommodation_per_year : 0,
      living_cost_per_month: typeof row.living_cost_per_month === 'number' ? row.living_cost_per_month : 0,
      ielts_requirement: row.ielts_requirement || '',
      min_gpa: row.min_gpa ?? '',
      image: row.image || undefined,
      hasScholarship: Boolean(row.hasScholarship),
    });
  }

  return result;
}

/**
 * Sheet-backed replacement for importing `destinations`/`universities`/`programs`
 * directly from `@/data/destinations`. Reads the `Destinations`, `University`, and
 * `Scholarships` tabs (falling back per-tab to the static data on outage, same as
 * every other sheet-backed page) and joins scholarships onto each destination the
 * same way `src/app/scholarships/page.tsx` already joins scholarships to a country.
 *
 * There is no Programs tab in the sheet, so `programs` is returned as-is from the
 * static file — program-level content isn't sheet-driven yet.
 */
export async function getDestinationsData(): Promise<{
  destinations: Destination[];
  universities: University[];
  programs: Program[];
}> {
  const [rawDestinations, rawUniversities, rawScholarships] = await Promise.all([
    fetchSheetSafe('Destinations', staticDestinations),
    fetchSheetSafe('University', []),
    fetchSheetSafe('Scholarships', []),
  ]);

  const destinations: Destination[] = (rawDestinations as any[]).map(row => ({
    ...row,
    scholarships_list: buildScholarshipsList(row, rawScholarships as any[]),
    visa_overview: buildVisaOverview(row),
    testimonials: row.testimonials ?? [],
  }));

  const normalizedUniversities = normalizeUniversities(rawUniversities as any[], destinations);
  if (normalizedUniversities.length === 0) {
    console.error('[getDestinationsData] "University" tab produced no usable rows — serving static university data instead.');
  }

  return {
    destinations,
    universities: normalizedUniversities.length > 0 ? normalizedUniversities : staticUniversities,
    programs: staticPrograms,
  };
}
