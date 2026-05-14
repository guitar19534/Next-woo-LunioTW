import { NextRequest, NextResponse } from "next/server";
import { STORE_API, getCookieHeader, getNonceHeader, forwardSetCookies, extractNonce } from "../_proxy";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const nonce = getNonceHeader(req);

  const wcRes = await fetch(`${STORE_API}/cart/remove-coupon`, {
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
