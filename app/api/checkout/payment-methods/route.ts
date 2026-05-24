import { NextRequest, NextResponse } from "next/server";

const LUNIO_WP     = `${process.env.WORDPRESS_URL}/wp-json/lunio/v1`;
const LUNIO_SECRET = process.env.LUNIO_API_SECRET ?? "lunio-headless-secret-2025";
const WC_API       = `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;
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

export async function GET(request: NextRequest) {
  try {
    const total = parseFloat(request.nextUrl.searchParams.get("total") ?? "0");

    // 1. Custom WP endpoint — forward the browser's WC session cookie so wc_load_cart()
    //    loads the real cart; is_available() then evaluates against actual cart contents.
    //    Falls back to null (= show all) if the endpoint fails or returns empty.
    let availableIds: Set<string> | null = null;
    if (total > 0) {
      try {
        const wpRes = await fetch(
          `${LUNIO_WP}/payment-methods?total=${total}`,
          {
            headers: {
              "X-Lunio-Secret": LUNIO_SECRET,
              "Cookie": request.headers.get("cookie") ?? "",
            },
            signal: AbortSignal.timeout(8000),
            cache: "no-store",
          }
        );
        if (wpRes.ok) {
          const available: Array<{ id: string }> = await wpRes.json();
          console.log("[payment-methods] WP returned:", available.map(g => g.id));
          if (available.length > 0) {
            availableIds = new Set(available.map((m) => m.id));
          }
        } else {
          console.error("[payment-methods] WP error:", wpRes.status, await wpRes.text().catch(() => ""));
        }
      } catch (err) {
        console.error("[payment-methods] WP fetch failed:", String(err));
      }
    }

    // 2. WC REST v3 — full gateway settings (installment sub-options, order, etc.)
    const v3Res = await fetch(`${WC_API}/payment_gateways`, {
      headers: { Authorization: `Basic ${AUTH}` },
      cache: "no-store",
    });
    const allGateways: WCGateway[] = v3Res.ok ? await v3Res.json() : [];

    // 3. Filter: must be enabled; if WP filtering succeeded, also must be in availableIds
    const enabled = allGateways
      .filter((g) => g.enabled && (availableIds === null || availableIds.has(g.id)))
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
