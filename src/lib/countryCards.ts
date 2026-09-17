import { splitStringToArray } from './fetchSheetData';

export interface CountryCardData {
  slug: string;            // image slug — file name under /images/countries, NOT the route slug
  name: string;
  flag: string;            // emoji string; rendered through <Flag emoji=...>, never shown raw
  imageAlt: { en: string; bn: string };
  chipLabel: string;       // Bangla country name shown in the image badge in both languages
  subjects: string;        // '' when unavailable
  workPermit: string;      // '' when unavailable
  exploreHref: string;
}

interface PresentationEntry {
  slug: string;
  displayName: string;
  flag: string;
  imageAlt: { en: string; bn: string };
  chipLabel: string;
  exploreHref: string;
  matchKeys: string[];
}

// Values not present in the sheet — image slug, flag, alt text, badge label and
// explore link, plus the sheet-row lookup keys. Copied verbatim from the former
// hardcoded array in CountryCarousel.tsx. Display order == card order.
// displayName is intentionally code-controlled, not read from the sheet's own
// `name` column — the sheet is matched against via matchKeys only.
const PRESENTATION_TABLE: PresentationEntry[] = [
  {
    slug: 'uk',
    displayName: 'United Kingdom',
    flag: '🇬🇧',
    imageAlt: {
      en: 'Student looking at Big Ben and the Houses of Parliament, United Kingdom',
      bn: 'বিগ বেন ও পার্লামেন্ট ভবনের সামনে একজন শিক্ষার্থী, যুক্তরাজ্য',
    },
    chipLabel: 'যুক্তরাজ্য',
    exploreHref: '/destinations/uk',
    matchKeys: ['uk', 'united kingdom'],
  },
  {
    slug: 'usa',
    displayName: 'United States',
    flag: '🇺🇸',
    imageAlt: {
      en: 'Student overlooking the New York City skyline, United States',
      bn: 'নিউ ইয়র্ক সিটির স্কাইলাইনের সামনে একজন শিক্ষার্থী, যুক্তরাষ্ট্র',
    },
    chipLabel: 'যুক্তরাষ্ট্র',
    exploreHref: '/destinations/united-states',
    matchKeys: ['usa', 'united-states', 'united states', 'us'],
  },
  {
    slug: 'canada',
    displayName: 'Canada',
    flag: '🇨🇦',
    imageAlt: {
      en: 'Student in front of the CN Tower, Canada',
      bn: 'সিএন টাওয়ারের সামনে একজন শিক্ষার্থী, কানাডা',
    },
    chipLabel: 'কানাডা',
    exploreHref: '/destinations/canada',
    matchKeys: ['canada'],
  },
  {
    slug: 'australia',
    displayName: 'Australia',
    flag: '🇦🇺',
    imageAlt: {
      en: 'Student in front of the Sydney Opera House, Australia',
      bn: 'সিডনি অপেরা হাউজের সামনে একজন শিক্ষার্থী, অস্ট্রেলিয়া',
    },
    chipLabel: 'অস্ট্রেলিয়া',
    exploreHref: '/destinations/australia',
    matchKeys: ['australia'],
  },
  {
    slug: 'new-zealand',
    displayName: 'New Zealand',
    flag: '🇳🇿',
    imageAlt: {
      en: 'Student with the Auckland skyline, New Zealand',
      bn: 'অকল্যান্ড স্কাইলাইনের সামনে একজন শিক্ষার্থী, নিউজিল্যান্ড',
    },
    chipLabel: 'নিউজিল্যান্ড',
    exploreHref: '/destinations/new-zealand',
    matchKeys: ['new-zealand', 'newzealand', 'new zealand'],
  },
  {
    slug: 'malaysia',
    displayName: 'Malaysia',
    flag: '🇲🇾',
    imageAlt: {
      en: 'Student in front of the Petronas Towers, Malaysia',
      bn: 'পেট্রোনাস টাওয়ারের সামনে একজন শিক্ষার্থী, মালয়েশিয়া',
    },
    chipLabel: 'মালয়েশিয়া',
    exploreHref: '/destinations/malaysia',
    matchKeys: ['malaysia'],
  },
  {
    slug: 'malta',
    displayName: 'Malta',
    flag: '🇲🇹',
    imageAlt: {
      en: 'Student overlooking Valletta harbour, Malta',
      bn: 'ভালেত্তা হারবারের সামনে একজন শিক্ষার্থী, মাল্টা',
    },
    chipLabel: 'মাল্টা',
    exploreHref: '/destinations/malta',
    matchKeys: ['malta'],
  },
];

// Treats an unconfirmed placeholder ("TODO — confirm ...") the same as missing
// data, so a stray placeholder left in the sheet can never leak onto the card.
function cleanField(val: string): string {
  const trimmed = val.trim();
  if (!trimmed) return '';
  if (trimmed.toUpperCase().startsWith('TODO')) return '';
  return trimmed;
}

function resolveSubjects(row: any): string {
  const raw = row?.popular_subjects ?? row?.popularSubjects;
  const list = Array.isArray(raw) ? raw.map((s) => String(s ?? '')) : splitStringToArray(raw);
  const cleaned = list.map((s) => cleanField(s)).filter(Boolean);
  return cleaned.slice(0, 3).join(', ');
}

function resolveWorkPermit(row: any): string {
  const raw = row?.workPermitStr ?? row?.workPermit ?? row?.work_permit;
  return cleanField(String(raw ?? ''));
}

export function getCountryCards(destinationRows: any[]): CountryCardData[] {
  const rows = destinationRows || [];
  const cards: CountryCardData[] = [];

  for (const entry of PRESENTATION_TABLE) {
    const row = rows.find((r: any) => {
      const slug = r?.slug !== undefined ? String(r.slug).trim().toLowerCase() : undefined;
      const id = r?.id !== undefined ? String(r.id).trim().toLowerCase() : undefined;
      const name = r?.name !== undefined ? String(r.name).trim().toLowerCase() : undefined;
      return (
        (slug !== undefined && entry.matchKeys.includes(slug)) ||
        (id !== undefined && entry.matchKeys.includes(id)) ||
        (name !== undefined && entry.matchKeys.includes(name))
      );
    });

    if (!row) {
      console.warn('[countryCards] skipping card with no matching sheet row', entry.slug);
      continue;
    }

    cards.push({
      slug: entry.slug,
      name: entry.displayName,
      flag: entry.flag,
      imageAlt: entry.imageAlt,
      chipLabel: entry.chipLabel,
      subjects: resolveSubjects(row),
      workPermit: resolveWorkPermit(row),
      exploreHref: entry.exploreHref,
    });
  }

  return cards;
}
