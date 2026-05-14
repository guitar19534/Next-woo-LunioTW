import { NextResponse } from "next/server";
import { getFeaturedProducts } from "@/lib/woocommerce";

export async function GET() {
  try {
    const products = await getFeaturedProducts(4);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
