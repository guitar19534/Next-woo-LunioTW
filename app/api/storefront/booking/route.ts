import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.WORDPRESS_URL ?? "https://lunio.com.tw";
const FORM_ID = "71181";
const AUTHOR  = "1";
const POST_ID = "31919";

async function fetchToken(): Promise<{ token: string; cookies: string }> {
  const res = await fetch(`${WP_URL}/storefront/`, { cache: "no-store" });
  const html = await res.text();
  const match = html.match(/data-token="([^"]+)"/);
  const token = match ? match[1] : "";
  const cookies = res.headers.get("set-cookie") ?? "";
  return { token, cookies };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, cookies } = await fetchToken();

    const fd = new URLSearchParams();
    fd.append("action",               "wpforms_submit");
    fd.append("wpforms[id]",          FORM_ID);
    fd.append("wpforms[author]",      AUTHOR);
    fd.append("wpforms[post_id]",     POST_ID);
    fd.append("wpforms[token]",       token);
    fd.append("wpforms[submit]",      "wpforms-submit");
    fd.append("wpforms[fields][1]",   body.name ?? "");
    fd.append("wpforms[fields][4]",   body.phone ?? "");
    fd.append("wpforms[fields][3]",   body.email ?? "");
    fd.append("wpforms[fields][6]",   body.store ?? "");
    fd.append("wpforms[fields][2][date]", body.date ?? "");
    fd.append("wpforms[fields][15]",  body.time ?? "");
    fd.append("wpforms[fields][16]",  body.period ?? "");

    if (body.turnstileToken) {
      fd.append("cf-turnstile-response", body.turnstileToken);
    }

    const ajaxRes = await fetch(`${WP_URL}/wp-admin/admin-ajax.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(cookies ? { Cookie: cookies } : {}),
      },
      body: fd.toString(),
    });

    const result = await ajaxRes.json();

    if (result.success) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, errors: result.data?.errors ?? {} },
      { status: 400 }
    );
  } catch (err) {
    console.error("[storefront/booking]", err);
    return NextResponse.json({ ok: false, errors: { general: "伺服器錯誤，請稍後再試" } }, { status: 500 });
  }
}
