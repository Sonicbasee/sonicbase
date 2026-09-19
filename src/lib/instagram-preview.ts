import { createServerFn } from "@tanstack/react-start";

function decodeHtml(str: string) {
  return str.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export const getInstagramPreview = createServerFn({ method: "GET" })
  .validator((data: { url: string }) => data)
  .handler(async ({ data }) => {
    const url = data.url?.trim();
    if (!url || !url.includes("instagram.com")) return null;
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (!res.ok) return null;
      const html = await res.text();
      const ogImageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
      const ogVideoMatch = html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/);
      const ogImage = ogImageMatch ? decodeHtml(ogImageMatch[1]) : null;
      const ogVideo = ogVideoMatch ? decodeHtml(ogVideoMatch[1]) : null;
      if (!ogImage && !ogVideo) return null;
      return { thumbnailUrl: ogImage, videoUrl: ogVideo };
    } catch {
      return null;
    }
  });
