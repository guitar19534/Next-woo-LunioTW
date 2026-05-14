import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/woocommerce";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  // Validate order_key from query param — prevents random order enumeration
  const key = req.nextUrl.searchParams.get("key");

  try {
    const order = await getOrder(orderId);

    if (key && order.order_key !== key) {
      return NextResponse.json({ error: "Invalid order key" }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
}
