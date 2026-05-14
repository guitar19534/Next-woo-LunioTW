import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) return NextResponse.json({ error: "Server error" }, { status: 500 });

  // Forward WP auth cookies to WordPress REST API
  const cookieHeader = req.headers.get("cookie") ?? "";
  const hasAuthCookie = cookieHeader
    .split(";")
    .some((c) => c.trim().toLowerCase().startsWith("wordpress_logged_in"));

  if (!hasAuthCookie) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  // Get WP user info
  const wpRes = await fetch(`${wpUrl}/wp-json/wp/v2/users/me?context=edit`, {
    headers: { Cookie: cookieHeader },
  });

  if (!wpRes.ok) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const wpUser = await wpRes.json();

  // Get WC customer info using admin key (filter by email)
  const wcKey = process.env.WC_CONSUMER_KEY;
  const wcSecret = process.env.WC_CONSUMER_SECRET;
  const auth = Buffer.from(`${wcKey}:${wcSecret}`).toString("base64");

  let wcCustomer = null;
  try {
    const wcRes = await fetch(
      `${wpUrl}/wp-json/wc/v3/customers?email=${encodeURIComponent(wpUser.email)}`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    if (wcRes.ok) {
      const customers = await wcRes.json();
      wcCustomer = customers[0] ?? null;
    }
  } catch { /* ignore */ }

  return NextResponse.json({
    id: wpUser.id,
    name: wpUser.name,
    email: wpUser.user_email ?? wpUser.email,
    firstName: wcCustomer?.first_name ?? wpUser.first_name ?? "",
    lastName: wcCustomer?.last_name ?? wpUser.last_name ?? "",
    wcCustomerId: wcCustomer?.id ?? null,
    billing: wcCustomer?.billing ?? null,
    shipping: wcCustomer?.shipping ?? null,
    avatarUrl: wpUser.avatar_urls?.["96"] ?? null,
  });
}
