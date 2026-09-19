import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function isArtistSubdomain(request: Request): boolean {
  const host = request.headers.get("host") || request.headers.get("x-forwarded-host") || "";
  const hostname = host.split(":")[0].toLowerCase();
  return hostname === "artist.sonicbase.ink" || hostname.startsWith("artist.") && hostname.endsWith("sonicbase.ink") || hostname === "artist.localhost" || hostname.startsWith("artist.localhost:");
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Subdomain routing: artist.sonicbase.ink/* -> /artist/* (keep path, but map root to /artist)
      if (isArtistSubdomain(request)) {
        const url = new URL(request.url);
        // If on artist subdomain and path is / or not starting with /artist, rewrite to /artist
        // Keep /login, /forgot-password etc. as is for auth flow
        const publicAuthPaths = ["/login", "/forgot-password", "/reset-password"];
        const isPublicAuth = publicAuthPaths.some((p) => url.pathname === p || url.pathname.startsWith(p + "/"));
        if (url.pathname === "/") {
          url.pathname = "/artist";
          request = new Request(url.toString(), request);
        } else if (!url.pathname.startsWith("/artist") && !url.pathname.startsWith("/api") && !url.pathname.startsWith("/_") && !isPublicAuth && !url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff2?)$/)) {
          // For artist subdomain, treat any non-artist path as artist dashboard path
          // e.g., artist.sonicbase.ink/streams -> /artist/streams
          // But keep public site paths accessible via full URL if needed
          // For now, only rewrite root; other paths stay as is to allow explicit /artist/* links
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
