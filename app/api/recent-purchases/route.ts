import { NextResponse } from "next/server";

const WP_URL = process.env.WORDPRESS_URL ?? "https://lunio.com.tw";
const CK     = process.env.WC_CONSUMER_KEY ?? "";
const CS     = process.env.WC_CONSUMER_SECRET ?? "";

// Category ID configured in Woo Notification plugin → "Lunio" category
const LUNIO_CATEGORY_ID = 484;

const LAST_NAMES = ["王", "李", "張", "陳", "林", "吳", "黃", "劉", "楊", "蔡", "鄭", "許", "何", "謝", "高"];
const GENDERS    = ["先生", "小姐"];
const CITIES     = ["台北", "新北", "桃園", "新竹", "台中", "台南", "高雄", "嘉義", "屏東", "宜蘭", "花蓮", "基隆"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutesAgo(): string {
  const pick = Math.random();
  if (pick < 0.3) {
    const m = Math.floor(Math.random() * 55) + 5;
    return `${m} 分鐘前`;
  } else if (pick < 0.7) {
    const h = Math.floor(Math.random() * 5) + 1;
    const m = Math.floor(Math.random() * 4) * 15;
    return m > 0 ? `${h} 小時 ${m} 分鐘前` : `${h} 小時前`;
  } else {
    const h = Math.floor(Math.random() * 12) + 6;
    return `${h} 小時前`;
  }
}

// Filter out gift/internal products
const EXCLUDE_KEYWORDS = ["贈品", "贈", "限量", "U型枕", "擁抱枕 - 灰"];

function isValidProduct(name: string): boolean {
  return !EXCLUDE_KEYWORDS.some((kw) => name.includes(kw));
}

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wc/v3/products?category=${LUNIO_CATEGORY_ID}&per_page=30&status=publish&consumer_key=${CK}&consumer_secret=${CS}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`WC API ${res.status}`);

    const products = await res.json();

    const items = (products as Record<string, unknown>[])
      .filter((p) => isValidProduct(p.name as string))
      .filter((p) => Array.isArray(p.images) && (p.images as unknown[]).length > 0)
      .map((p) => {
        const img = ((p.images as Record<string, string>[])[0])?.src ?? "";
        const price = p.sale_price || p.price;
        return {
          name:    `${randomItem(LAST_NAMES)}${randomItem(GENDERS)}（${randomItem(CITIES)}）`,
          product: (p.name as string).replace(/\s*\(.*?\)\s*/g, "").trim(),
          slug:    p.slug as string,
          img,
          price:   price ? `NT$${Number(price).toLocaleString()}` : "",
          ago:     randomMinutesAgo(),
        };
      });

    // Shuffle so each request has a different order
    items.sort(() => Math.random() - 0.5);

    return NextResponse.json(items);
  } catch (err) {
    console.error("[recent-purchases]", err);
    return NextResponse.json([], { status: 500 });
  }
}
