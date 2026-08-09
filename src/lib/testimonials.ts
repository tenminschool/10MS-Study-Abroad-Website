export interface TextTestimonial {
  type: 'text';
  name: string;
  university: string;
  quote: string;
  avatar?: string;
  countryName: string;
  countryFlag: string;
}

export interface VideoTestimonial {
  type: 'video';
  name: string;
  university: string;
  videoId: string;
  thumbnailUrl: string;
  countryName: string;
  countryFlag: string;
}

export type Testimonial = TextTestimonial | VideoTestimonial;

const YOUTUBE_ID_PATTERNS = [
  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  for (const pattern of YOUTUBE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getHomeTestimonials(rawRows: any[], destinationRows: any[]): Testimonial[] {
  const approvedRows = (rawRows || []).filter((row) => row?.approved?.trim() === 'YES');

  const testimonials: Testimonial[] = [];

  for (const row of approvedRows) {
    const dest = destinationRows.find((d: any) =>
      d.id?.toLowerCase() === row.country_id?.toLowerCase() ||
      d.slug?.toLowerCase() === row.country_id?.toLowerCase()
    );
    const countryName = dest ? dest.name : (row.country_id || 'Others');
    const countryFlag = dest ? dest.flag_emoji : '🌍';

    const isVideo = String(row.type ?? '').trim().toLowerCase().startsWith('video');

    if (isVideo) {
      const videoId = extractYouTubeId(row.link);
      if (!videoId) {
        console.warn('[testimonials] skipping video row with unparseable link', row);
        continue;
      }
      testimonials.push({
        type: 'video',
        name: row.name || '',
        university: row.university || '',
        videoId,
        thumbnailUrl: getYouTubeThumbnail(videoId),
        countryName,
        countryFlag,
      });
    } else {
      if (!row.quote?.trim()) {
        console.warn('[testimonials] skipping text row with empty quote', row);
        continue;
      }
      testimonials.push({
        type: 'text',
        name: row.name || '',
        university: row.university || '',
        quote: row.quote,
        avatar: row.avatar || undefined,
        countryName,
        countryFlag,
      });
    }
  }

  return testimonials;
}
