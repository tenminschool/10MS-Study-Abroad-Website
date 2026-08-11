// Rewrites a Google Drive "share" link into a directly-loadable image URL.
// A plain drive.google.com share link serves an HTML viewer page, not image
// bytes, so it can't be used as an <img src> as-is. lh3.googleusercontent.com
// is an unofficial but widely-relied-on endpoint (the same one Drive/Photos
// use for embeds) that serves the raw file for a public ("Anyone with the
// link") Drive file. It's undocumented and could change, but is more
// reliable for hotlinking than the alternative uc?export=view form.
const DRIVE_ID_PATTERNS = [
  /drive\.google\.com\/file\/d\/([\w-]+)/,
  /drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([\w-]+)/,
];

export function resolveDriveImageUrl(url: string): string {
  for (const pattern of DRIVE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}
