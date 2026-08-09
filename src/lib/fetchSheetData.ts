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
  const range = headerOnRow1Tabs.includes(tabName) ? 'A1:Z' : 'A2:Z';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(queryTab)}&range=${range}&headers=1`;
  
  const isDev = process.env.NODE_ENV === 'development';
  const fetchOptions = isDev 
    ? { cache: 'no-store' as const } 
    : { next: { revalidate: 60 } };
    
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet ${tabName}: ${res.statusText}`);
  }
  const text = await res.text();
  
  // Extract JSON string from visualization envelope (e.g. google.visualization.Query.setResponse(...))
  const jsonText = text.substring(47).slice(0, -2);
  const json = JSON.parse(jsonText);
  
  const headers = json.table.cols.map((col: any) => cleanKey(col.label));
  
  const rows = json.table.rows.map((row: any) => {
    const obj: any = {};
    headers.forEach((header: string, i: number) => {
      if (!header) return;
      const cell = row.c?.[i];
      let val = cell?.v ?? "";
      
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
