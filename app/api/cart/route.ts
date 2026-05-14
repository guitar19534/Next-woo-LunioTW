import { NextRequest, NextResponse } from "next/server";
import { STORE_API, getCookieHeader, getNonceHeader, forwardSetCookies, extractNonce } from "./_proxy";

export async function GET(req: NextRequest) {
  const wcRes = await fetch(`${STORE_API}/cart`, {
    headers: { Cookie: getCookieHeader(req) },
    cache: "no-store",
  });

  const data = await wcRes.json();
  const nonce = extractNonce(wcRes);

  const res = NextResponse.json({ ...data, _nonce: nonce }, { status: wcRes.status });
  forwardSetCookies(wcRes, res);
  return res;
}

export async function DELETE(req: NextRequest) {
  const nonce = getNonceHeader(req);

  const wcRes = await fetch(`${STORE_API}/cart/items`, {
    method: "DELETE",
    headers: {
      Cookie: getCookieHeader(req),
      Nonce: nonce,
    },
    cache: "no-store",
  });

  const data = await wcRes.json();
  const newNonce = extractNonce(wcRes, nonce);

  const res = NextResponse.json({ ...data, _nonce: newNonce }, { status: wcRes.status });
  forwardSetCookies(wcRes, res);
  return res;
}
