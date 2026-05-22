import { NextRequest, NextResponse } from "next/server";

const WC_API = `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;
const AUTH = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

interface WCGatewaySetting {
  id: string; label: string; description: string;
  type: string; value: string; default: string;
  options?: Record<string, string>;
}

interface WCGateway {
  id: string; title: string; description: string;
  enabled: boolean; order: number;
  settings: Record<string, WCGatewaySetting>;
}

export interface PaymentSubOption {
  key: string; label: string; defaultValue: string;
  options: Array<{ value: string; label: string }>;
}

export async function GET(_request: NextRequest) {
  try {
    // WC REST v3 — all enabled gateways with full settings (installment sub-options, order, etc.)
    // Using v3 directly is more reliable than the custom WP endpoint because
    // wc_load_cart() in the WP endpoint may not have the correct cart session context,
    // causing is_available() to return false for cart-total-based rules.
    const v3Res = await fetch(`${WC_API}/payment_gateways`, {
      headers: { Authorization: `Basic ${AUTH}` },
      cache: "no-store",
    });
    const allGateways: WCGateway[] = v3Res.ok ? await v3Res.json() : [];

    const enabled = allGateways
      .filter((g) => g.enabled)
      .sort((a, b) => a.order - b.order)
      .map((g) => {
        const subOptions: PaymentSubOption[] = Object.values(g.settings ?? {})
          .filter((s) => {
            if (s.type === "select" || s.type === "radio") return s.options && Object.keys(s.options).length > 1;
            if (s.type === "multiselect") return s.value && String(s.value).trim().length > 0;
            return false;
          })
          .map((s) => {
            if (s.type === "multiselect") {
              const keys = String(s.value).split(",").map((v) => v.trim()).filter(Boolean);
              const opts = s.options ?? {};
              return { key: s.id, label: s.label, defaultValue: keys[0] ?? "", options: keys.map((k) => ({ value: k, label: opts[k] ? String(opts[k]) : k })) };
            }
            return {
              key: s.id, label: s.label, defaultValue: s.value || s.default,
              options: Object.entries(s.options!).map(([value, label]) => ({ value, label: String(label) })),
            };
          })
          .filter((s) => s.options.length > 0);

        return { id: g.id, title: g.title, description: g.description, subOptions };
      });

    return NextResponse.json(enabled);
  } catch {
    return NextResponse.json([]);
  }
}
