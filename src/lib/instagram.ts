/**
 * Instagram embed helper.
 * Converts public Instagram URLs to embeddable iframe src.
 * Works without API token for public posts/reels.
 *
 * Supported inputs:
 *  - https://www.instagram.com/reel/ABC123/
 *  - https://www.instagram.com/p/ABC123/
 *  - https://www.instagram.com/tv/ABC123/
 *  - with query params, trailing slash, etc.
 * Returns null for profile URLs (https://www.instagram.com/username/) — not embeddable as reel.
 */

export function toInstagramEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    // already an embed url — normalize
    if (trimmed.includes("/embed")) {
      const u = new URL(trimmed);
      // strip search params that break embed
      return `https://www.instagram.com${u.pathname}`;
    }

    const u = new URL(trimmed);
    if (!u.hostname.includes("instagram.com")) return null;

    const parts = u.pathname.split("/").filter(Boolean); // ["reel","ABC123"]
    if (parts.length < 2) return null;

    const type = parts[0];
    const id = parts[1];

    if (!["reel", "p", "tv"].includes(type)) return null;
    // id is shortcode like "DG..." — allow alphanumeric, _ , -
    if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;

    return `https://www.instagram.com/${type}/${id}/embed`;
  } catch {
    return null;
  }
}

export function isInstagramReelUrl(url: string): boolean {
  return toInstagramEmbedUrl(url) !== null;
}
