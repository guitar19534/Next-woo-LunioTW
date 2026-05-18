import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import {
  getProducts,
  getAllProductCategories,
  getProductCategoryBySlug,
  getProductTagBySlug,
} from "@/lib/woocommerce";
import { ProductGrid } from "@/components/shop";
import ShopFilters from "@/components/shop/ShopFilters";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";

export const metadata: Metadata = {
  title: "全部商品｜Lunio Taiwan",
  description: "探索 Lunio 全系列乳膠床墊、記憶枕、寢具配件，找到最適合你的好眠夥伴。",
};

export const dynamic = "auto";
export const revalidate = 600;

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
  }>;
}

const SORT_OPTIONS = [
  { value: "",             label: "預設排序" },
  { value: "popularity",  label: "最熱銷" },
  { value: "date",        label: "最新上架" },
  { value: "price",       label: "價格由低至高" },
  { value: "price-desc",  label: "價格由高至低" },
  { value: "rating",      label: "評分最高" },
];

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { page: pageParam, category, tag, search, sort } = params;

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const productsPerPage = 16;

  let orderby: "date" | "price" | "popularity" | "rating" | undefined;
  let order: "asc" | "desc" | undefined;
  switch (sort) {
    case "popularity":  orderby = "popularity"; break;
    case "rating":      orderby = "rating"; break;
    case "date":        orderby = "date";  order = "desc"; break;
    case "price":       orderby = "price"; order = "asc";  break;
    case "price-desc":  orderby = "price"; order = "desc"; break;
  }

  const [categoryData, tagData] = await Promise.all([
    category ? getProductCategoryBySlug(category) : undefined,
    tag      ? getProductTagBySlug(tag)            : undefined,
  ]);

  const [productsResponse, categories] = await Promise.all([
    getProducts(page, productsPerPage, {
      category: categoryData?.id,
      tag: tagData?.id,
      search,
      orderby,
      order,
    }),
    getAllProductCategories(),
  ]);

  const { data: products, headers } = productsResponse;
  const { total, totalPages } = headers;

  function pageUrl(p: number) {
    const q = new URLSearchParams();
    if (p > 1)    q.set("page", String(p));
    if (category) q.set("category", category);
    if (tag)      q.set("tag", tag);
    if (search)   q.set("search", search);
    if (sort)     q.set("sort", sort);
    return `/shop${q.toString() ? `?${q}` : ""}`;
  }

  function filterUrl(updates: Record<string, string | undefined>) {
    const q = new URLSearchParams();
    const merged = { category, tag, search, sort, ...updates };
    Object.entries(merged).forEach(([k, v]) => { if (v) q.set(k, v); });
    return `/shop${q.toString() ? `?${q}` : ""}`;
  }

  const activeCategory = categoryData?.name;
  const hasFilters = !!(category || tag || search || sort);

  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#f8faff", minHeight: "100vh" }}>
      <style>{`
        .lunio-product-card {
          display: flex; flex-direction: column;
          background: #fff; border: 1px solid #e8edf4;
          border-radius: 16px; overflow: hidden;
          text-decoration: none;
          transition: box-shadow .25s, transform .25s;
        }
        .lunio-product-card:hover {
          box-shadow: 0 10px 36px rgba(60,122,228,0.13);
          transform: translateY(-4px);
        }
        .lunio-product-card .lpc-img img {
          transition: transform .4s ease;
        }
        .lunio-product-card:hover .lpc-img img {
          transform: scale(1.04);
        }
      `}</style>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #eaedf3", padding: "clamp(28px,4vw,48px) 0 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>

          {/* Title + clear */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 800, color: NAVY, margin: 0 }}>
              {activeCategory ?? "全部商品"}
            </h1>
            {hasFilters && (
              <Link href="/shop" style={{ fontSize: 13, color: BLUE, marginLeft: "auto", textDecoration: "none", fontWeight: 600 }}>
                清除篩選 ×
              </Link>
            )}
          </div>

          {/* Client filter bar */}
          <div style={{ paddingBottom: 20 }}>
            <ShopFilters
              categories={categories}
              currentCategory={category}
              currentSearch={search}
              currentSort={sort}
              total={total}
            />
          </div>

        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(32px,4vw,48px) 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
              <p style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>找不到符合條件的商品</p>
              <p style={{ fontSize: 14, marginBottom: 24 }}>試試調整篩選條件或搜尋其他關鍵字</p>
              <Link href="/shop" style={{
                display: "inline-flex", padding: "11px 32px", borderRadius: 30,
                background: BLUE, color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
              }}>查看全部商品</Link>
            </div>
          ) : (
            <ProductGrid products={products} columns={4} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 48, flexWrap: "wrap" }}>
              {page > 1 && (
                <Link href={pageUrl(page - 1)} style={pgStyle(false)}>← 上一頁</Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                .map((n, i, arr) => (
                  <span key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {i > 0 && arr[i - 1] !== n - 1 && <span style={{ color: "#ccc" }}>…</span>}
                    <Link href={pageUrl(n)} style={pgStyle(n === page)}>{n}</Link>
                  </span>
                ))}
              {page < totalPages && (
                <Link href={pageUrl(page + 1)} style={pgStyle(false)}>下一頁 →</Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── TAB FILTER ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(32px,4vw,48px) 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
          <MattressTabFilter />
        </div>
      </section>

    </main>
  );
}

function pgStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    height: 40,
    padding: "0 14px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    textDecoration: "none",
    background: active ? "#3c7ae4" : "#fff",
    color: active ? "#fff" : "#555",
    border: `1.5px solid ${active ? "#3c7ae4" : "#e4e8f0"}`,
    transition: "all .15s",
  };
}
