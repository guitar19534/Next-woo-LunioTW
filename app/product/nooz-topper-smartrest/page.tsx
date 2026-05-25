import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { TopperSmartrestPanel } from "@/components/product/topper/TopperSmartrestPanel";
import { SmartrestLayerSection } from "@/components/product/topper/SmartrestLayerSection";
import { SmartrestFeatureSection } from "@/components/product/topper/SmartrestFeatureSection";
import { SmartrestTabSection } from "@/components/product/topper/SmartrestTabSection";
import { NoozPreFooter } from "@/components/shared/NoozPreFooter";

const SLUG = "nooz-topper-smartrest";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Nooz SmartRest Flip Topper 翻轉床墊｜厚5公分 雙面軟硬任選 – Lunio" },
  description: "Nooz SmartRest Flip Topper 翻轉床墊。厚5公分，雙面翻轉軟硬任選，CoolRest涼感記憶層×CloudComfort支撐層。改善舊床舒適度，可水洗透氣床套，全台本島免運。",
  alternates: { canonical: "/product/nooz-topper-smartrest" },
  openGraph: {
    title: "Nooz SmartRest Flip Topper 翻轉床墊",
    description: "厚5公分 × 雙面翻轉 × 改善舊床舒適度",
  },
};

export default async function TopperSmartrestPage() {
  const product = await getProductBySlug(SLUG);
  if (!product) notFound();

  const variations = product.type === "variable"
    ? await getProductVariations(product.id)
    : [];

  return (
    <main className="misans-page">
      <style>{`
        .misans-page, .misans-page * {
          font-family: 'MiSansTC', 'Noto Sans TC', sans-serif !important;
        }
      `}</style>

      {/* ── Hero: Gallery + Panel ─────────────────────────────────────── */}
      <section className="pt-12 pb-20" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="max-w-[1400px] w-[85%] mx-auto">

          {/* Mobile title */}
          <div className="lg:hidden mb-4 space-y-2">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <a href="/topper" className="hover:underline" style={{ color: "#17569E" }}>薄床墊</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>SmartRest Flip Topper</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>
              Nooz SmartRest Flip Topper 翻轉床墊（厚5cm）
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                ({product.average_rating || "5.0"})
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <TopperSmartrestPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── 3-Layer Structure ─────────────────────────────────────────── */}
      <SmartrestLayerSection />

      {/* ── Icons / Videos / Lifestyle / Feature blocks ───────────────── */}
      <SmartrestFeatureSection />

      {/* ── Target audience / Size / Service tabs + Care ─────────────── */}
      <SmartrestTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <NoozPreFooter
        productName="Nooz SmartRest Flip Topper"
        productHref="/product/nooz-topper-smartrest"
      />
    </main>
  );
}
