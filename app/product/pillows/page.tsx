import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }         from "@/components/product/shared/ProductGalleryCustom";
import { PillowLatexPanel }             from "@/components/product/pillowlatex/PillowLatexPanel";
import { PillowLatexFeatureCarousel }   from "@/components/product/pillowlatex/PillowLatexFeatureCarousel";
import { PillowLatexSupportZoneSection } from "@/components/product/pillowlatex/PillowLatexSupportZoneSection";
import { PillowLatexSleepSection }      from "@/components/product/pillowlatex/PillowLatexSleepSection";
import { VideoReviewCarousel }          from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }              from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }             from "@/components/shared/ProductPreFooter";

const SLUG = "pillows";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "乳膠枕｜Q彈支撐，舒緩肩頸緊繃與酸痛 – Lunio" },
  description: "Lunio 天然乳膠枕。泰國純天然乳膠，Q彈扎實支撐，舒緩肩頸緊繃與酸痛，天然防蟎抗菌，通風散熱，耐用壽命長。",
  alternates: { canonical: "/product/pillows" },
  openGraph: {
    title: "乳膠枕｜Lunio",
    description: "Q彈支撐 × 舒緩肩頸緊繃 × 天然防蟎抗菌",
  },
};

export default async function PillowLatexPage() {
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-[1400px] w-[85%] mx-auto">
          <div className="lg:hidden mb-4 space-y-2">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>Lunio 天然乳膠枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Lunio 天然乳膠枕</h1>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）{product.average_rating || "4.8"} 顆星</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <PillowLatexPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <PillowLatexFeatureCarousel />

      {/* ── Benefit + Support Zone Slider ────────────────────────────── */}
      <PillowLatexSupportZoneSection />

      {/* ── Sleep + VS Comparison (dark) ─────────────────────────────── */}
      <PillowLatexSleepSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
