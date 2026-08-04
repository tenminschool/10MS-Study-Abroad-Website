// ============================================================
// Edit these before launch.
// ============================================================

export const CONFIG = {
  /** Shown on the results page as call-to-action buttons. */
  counsellingPhone: '+8809612916910',
  whatsappNumber: '8801792608084',
  whatsappMessage: {
    en: 'Hi, I just used the destination matcher and would like to talk about my options.',
    bn: 'হ্যালো, আমি ডেস্টিনেশন ম্যাচার ব্যবহার করেছি এবং আমার অপশনগুলো নিয়ে কথা বলতে চাই।',
  },
  /** Booking page for the free consultation. Until this is set, booking buttons fall back to WhatsApp. */
  bookingUrl: 'https://forms.gle/AF7Brcz5zCebVUuz6',

  /** Where the free Mini Mock Test promo sends students (English step, "No" branch). */
  mockTestUrl: 'https://10minuteschool.com/product/ielts-programme/',

  /** Cloudflare Turnstile site key (public). Leave empty to disable in local dev. */
  turnstileSiteKey: '',

  /** Set false once the destination data has been verified and signed off. */
  showDraftDataWarning: true,
}
