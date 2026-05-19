import { NextResponse } from "next/server";

const WC_API = `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;
const AUTH = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

interface WCGatewaySetting {
  id: string;
  label: string;
  description: string;
  type: string;
  value: string;
  default: string;
  options?: Record<string, string>;
}

interface WCGateway {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  order: number;
  settings: Record<string, WCGatewaySetting>;
}

export interface PaymentSubOption {
  key: string;
  label: string;
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
}

export async function GET() {
  try {
    const res = await fetch(`${WC_API}/payment_gateways`, {
      headers: { Authorization: `Basic ${AUTH}` },
      cache: "no-store",
    });

    if (!res.ok) return NextResponse.json([]);

    const gateways: WCGateway[] = await res.json();

    // These gateways are hidden by WooCommerce plugin conditionals on the WP checkout
    // (e.g. restricted by cart total or product type) — exclude to match WP behavior
    const HIDDEN_GATEWAYS = new Set(["ctbc_installments", "suntech_buysafemul"]);

    const enabled = gateways
      .filter((g) => g.enabled && !HIDDEN_GATEWAYS.has(g.id))
      .sort((a, b) => a.order - b.order)
      .map((g) => {
        // Extract user-facing settings (installment periods etc.)
        const subOptions: PaymentSubOption[] = Object.values(g.settings ?? {})
          .filter((s) => {
            if (s.type === "select" || s.type === "radio") {
              return s.options && Object.keys(s.options).length > 1;
            }
            if (s.type === "multiselect") {
              // Admin-selected values (e.g. "3,6,12") become customer choices
              return s.value && String(s.value).trim().length > 0;
            }
            return false;
          })
          .map((s) => {
            if (s.type === "multiselect") {
              // Convert "3,6,12" → [{ value:"3", label:"分3期" }, ...]
              const selectedKeys = String(s.value)
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);
              const opts = s.options ?? {};
              const options = selectedKeys.map((k) => ({
                value: k,
                label: opts[k] ? String(opts[k]) : k,
              }));
              return {
                key: s.id,
                label: s.label,
                defaultValue: options[0]?.value ?? "",
                options,
              };
            }
            // select / radio
            return {
              key: s.id,
              label: s.label,
              defaultValue: s.value || s.default,
              options: Object.entries(s.options!).map(([value, label]) => ({
                value,
                label: String(label),
              })),
            };
          })
          .filter((s) => s.options.length > 0);

        return {
          id: g.id,
          title: g.title,
          description: g.description,
          subOptions,
        };
      });

    return NextResponse.json(enabled);
  } catch {
    return NextResponse.json([]);
  }
}
