// Renders a country flag as a real SVG (via the `flag-icons` package) instead
// of a Unicode flag emoji. Windows doesn't render regional-indicator flag
// emoji as flag pictures — it shows the two-letter code as plain text — so
// relying on the emoji glyph makes flags disappear for most Windows users.
const REGIONAL_INDICATOR_A = 0x1f1e6;

function flagEmojiToCode(emoji: string): string | null {
  const points = Array.from(emoji).map((c) => c.codePointAt(0) ?? 0);
  if (points.length !== 2) return null;
  const letters = points.map((p) =>
    p >= REGIONAL_INDICATOR_A && p <= REGIONAL_INDICATOR_A + 25
      ? String.fromCharCode(p - REGIONAL_INDICATOR_A + 65)
      : null,
  );
  if (letters[0] === null || letters[1] === null) return null;
  return (letters[0] + letters[1]).toLowerCase();
}

export function Flag({
  emoji,
  className,
  title,
}: {
  emoji: string;
  className?: string;
  title?: string;
}) {
  const code = flagEmojiToCode(emoji);
  if (!code) {
    // Not a country flag (e.g. the 🌍 "global" fallback) — the emoji itself
    // renders fine everywhere, so just keep it as text.
    return (
      <span className={className} aria-hidden={title ? undefined : true} aria-label={title}>
        {emoji}
      </span>
    );
  }
  return (
    <span
      className={['fi', `fi-${code}`, className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
