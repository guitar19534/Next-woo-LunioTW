import { NextRequest, NextResponse } from "next/server";
import { STORE_API, fetchWC, getCookieHeader, getNonceHeader, forwardSetCookies, extractNonce } from "../_proxy";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const nonce = getNonceHeader(req);

  const wcRes = await fetchWC(`${STORE_API}/cart/remove-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: getCookieHeader(req),
      Nonce: nonce,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await wcRes.json();
  const newNonce = extractNonce(wcRes, nonce);

  const res = NextResponse.json({ ...data, _nonce: newNonce }, { status: wcRes.status });
  forwardSetCookies(wcRes, res);
  return res;
}
