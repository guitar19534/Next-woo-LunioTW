import { NextRequest, NextResponse } from "next/server";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;
const WC_API    = `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;
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

interface StorePaymentMethod {
  name: string;
  title: string;
  description: string;
}

export interface PaymentSubOption {
  key: string;
  label: string;
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
}

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";

    // 1. Store API: get available methods with PHP filters applied
    //    (respects woocommerce_available_payment_gateways hook)
    const storeRes = await fetch(`${STORE_API}/payment-methods`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    const storeMethods: StorePaymentMethod[] = storeRes.ok ? await storeRes.json() : [];
    const availableIds = new Set(storeMethods.map((m) => m.name));

    // 2. REST API v3: get full settings (installment options, etc.)
    const v3Res = await fetch(`${WC_API}/payment_gateways`, {
      headers: { Authorization: `Basic ${AUTH}` },
      cache: "no-store",
    });
    const allGateways: WCGateway[] = v3Res.ok ? await v3Res.json() : [];

    // 3. Merge: only show gateways that Store API says are available
    const enabled = allGateways
      .filter((g) => g.enabled && availableIds.has(g.id))
      .sort((a, b) => a.order - b.order)
      .map((g) => {
        const storeMethod = storeMethods.find((m) => m.name === g.id);
        const subOptions: PaymentSubOption[] = Object.values(g.settings ?? {})
          .filter((s) => {
            if (s.type === "select" || s.type === "radio") {
              return s.options && Object.keys(s.options).length > 1;
            }
            if (s.type === "multiselect") {
              return s.value && String(s.value).trim().length > 0;
            }
            return false;
          })
          .map((s) => {
            if (s.type === "multiselect") {
              const selectedKeys = String(s.value).split(",").map((v) => v.trim()).filter(Boolean);
              const opts = s.options ?? {};
              const options = selectedKeys.map((k) => ({
                value: k,
                label: opts[k] ? String(opts[k]) : k,
              }));
              return { key: s.id, label: s.label, defaultValue: options[0]?.value ?? "", options };
            }
            return {
              key: s.id,
              label: s.label,
              defaultValue: s.value || s.default,
              options: Object.entries(s.options!).map(([value, label]) => ({ value, label: String(label) })),
            };
          })
          .filter((s) => s.options.length > 0);

        return {
          id: g.id,
          title: storeMethod?.title ?? g.title,
          description: storeMethod?.description ?? g.description,
          subOptions,
        };
      });

    return NextResponse.json(enabled);
  } catch {
    return NextResponse.json([]);
  }
}
