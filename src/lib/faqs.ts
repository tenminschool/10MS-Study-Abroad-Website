import { extractYouTubeId } from './testimonials';

export interface FaqVideo {
  title: string;    // the question text (Bangla in the sheet today); shown as-is in both languages
  videoId: string;  // 11-char YouTube id parsed out of the sheet's `link`
}

export function getHomeFaqs(rawRows: any[]): FaqVideo[] {
  const rows = rawRows || [];

  const faqs: FaqVideo[] = [];

  for (const row of rows) {
    const isApproved = String(row?.approved ?? '').trim().toLowerCase() === 'yes';
    if (!isApproved) continue;

    const isVideo = String(row?.type ?? '').trim().toLowerCase().startsWith('video');
    if (!isVideo) {
      console.warn('[faqs] skipping non-video row', row);
      continue;
    }

    const link = typeof row?.link === 'string' ? row.link : String(row?.link ?? '');
    const videoId = extractYouTubeId(link);
    if (!videoId) {
      console.warn('[faqs] skipping row with unparseable link', row);
      continue;
    }

    const title = String(row?.title ?? '').trim();
    if (!title) {
      console.warn('[faqs] skipping row with empty title', row);
      continue;
    }

    faqs.push({ title, videoId });
  }

  return faqs;
}
