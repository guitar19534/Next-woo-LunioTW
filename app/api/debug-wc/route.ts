import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.WORDPRESS_URL ?? "";
  const ck = process.env.WC_CONSUMER_KEY ?? "";
  const cs = process.env.WC_CONSUMER_SECRET ?? "";

  if (!base || !ck || !cs) {
    return NextResponse.json({ error: "env vars missing", base: !!base, ck: !!ck, cs: !!cs });
  }

  const url = `${base}/wp-json/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=1&status=publish`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 NextJS/1.0", "Content-Type": "application/json" },
      cache: "no-store",
    });

    const text = await res.text();
    return NextResponse.json({
      status: res.status,
      cf_ray: res.headers.get("cf-ray"),
      server: res.headers.get("server"),
      body_preview: text.slice(0, 600),
    });
  } catch (e) {
    return NextResponse.json({ fetch_error: String(e) });
  }
}
