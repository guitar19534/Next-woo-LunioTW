import { NextResponse } from "next/server";

// DEV ONLY — remove before production
// Visit: /api/checkout/payment-methods-debug
// Shows raw settings for all enabled payment gateways

const WC_API = `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;
const AUTH = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const res = await fetch(`${WC_API}/payment_gateways`, {
    headers: { Authorization: `Basic ${AUTH}` },
    cache: "no-store",
  });

  const gateways = res.ok ? await res.json() : [];

  // Return full settings for enabled gateways
  const debug = gateways
    .filter((g: { enabled: boolean }) => g.enabled)
    .map((g: { id: string; title: string; settings: Record<string, unknown> }) => ({
      id: g.id,
      title: g.title,
      settings: Object.entries(g.settings ?? {}).map(([key, s]) => {
        const setting = s as Record<string, unknown>;
        return {
          key,
          type: setting.type,
          label: setting.label,
          value: setting.value,
          default: setting.default,
          options: setting.options,
        };
      }),
    }));

  return NextResponse.json(debug, { headers: { "Content-Type": "application/json" } });
}
