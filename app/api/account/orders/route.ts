import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const wpUrl = process.env.WORDPRESS_URL;
  const wcKey = process.env.WC_CONSUMER_KEY;
  const wcSecret = process.env.WC_CONSUMER_SECRET;
  if (!wpUrl || !wcKey || !wcSecret) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const customerId = req.nextUrl.searchParams.get("customer");
  if (!customerId) {
    return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
  }

  const auth = Buffer.from(`${wcKey}:${wcSecret}`).toString("base64");
  const page = req.nextUrl.searchParams.get("page") ?? "1";

  const wcRes = await fetch(
    `${wpUrl}/wp-json/wc/v3/orders?customer=${customerId}&per_page=10&page=${page}&orderby=date&order=desc`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  if (!wcRes.ok) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: wcRes.status });
  }

  const orders = await wcRes.json();
  const total = wcRes.headers.get("X-WP-Total") ?? "0";
  const totalPages = wcRes.headers.get("X-WP-TotalPages") ?? "1";

  return NextResponse.json({ orders, total: parseInt(total), totalPages: parseInt(totalPages) });
}
