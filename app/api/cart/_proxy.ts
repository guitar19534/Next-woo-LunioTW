import { NextRequest, NextResponse } from "next/server";

export const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;

export function getCookieHeader(req: NextRequest) {
  return req.headers.get("cookie") ?? "";
}

export function getNonceHeader(req: NextRequest) {
  return req.headers.get("x-wc-nonce") ?? "";
}

// Strip domain from Set-Cookie so cookies are valid for our Next.js domain
function rewriteCookie(cookie: string) {
  return cookie.replace(/;\s*domain=[^;,]+/gi, "").replace(/;\s*samesite=none/gi, "");
}

export function forwardSetCookies(wcRes: Response, nextRes: NextResponse) {
  try {
    const cookies = wcRes.headers.getSetCookie?.() ?? [];
    if (cookies.length > 0) {
      cookies.forEach((c) => nextRes.headers.append("set-cookie", rewriteCookie(c)));
      return;
    }
  } catch {}
  const raw = wcRes.headers.get("set-cookie");
  if (raw) nextRes.headers.set("set-cookie", rewriteCookie(raw));
}

export function extractNonce(wcRes: Response, fallback = "") {
  return wcRes.headers.get("X-WC-Store-API-Nonce") ?? fallback;
}
