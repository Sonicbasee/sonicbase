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

export function getInstagramId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    if (!["reel", "p", "tv"].includes(parts[0])) return null;
    const id = parts[1];
    if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
    return id;
  } catch {
    return null;
  }
}

/**
 * Best-effort thumbnail for preview when no custom image is supplied.
 * Uses Instagram's media endpoint (no auth) — falls back if blocked.
 */
export function getInstagramThumbnailUrl(url: string): string | null {
  const id = getInstagramId(url);
  if (!id) return null;
  // Instagram media endpoint returns the cover image for reel/post
  // e.g. https://www.instagram.com/p/ABC123/media/?size=l
  // For reels this also works via /reel/
  try {
    const u = new URL(url);
    const type = u.pathname.split("/").filter(Boolean)[0];
    return `https://www.instagram.com/${type}/${id}/media/?size=l`;
  } catch {
    return `https://www.instagram.com/reel/${id}/media/?size=l`;
  }
}
