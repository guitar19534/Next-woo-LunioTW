import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }     from "@/components/product/shared/ProductGalleryCustom";
import { MercuryPanel }             from "@/components/product/mercury/MercuryPanel";
import { MercuryFeatureCarousel }   from "@/components/product/mercury/MercuryFeatureCarousel";
import { MercuryLayerSection }      from "@/components/product/mercury/MercuryLayerSection";
import { MercuryVideoSection }      from "@/components/product/mercury/MercuryVideoSection";
import { MercuryLifestyleSlider }   from "@/components/product/mercury/MercuryLifestyleSlider";
import { MercurySleepSection }      from "@/components/product/mercury/MercurySleepSection";
import { VideoReviewCarousel }      from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }          from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }         from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-mercury";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Mercury 石墨烯機能記憶枕｜Lunio Taiwan",
  description: "Lunio Mercury 石墨烯機能記憶枕。三層設計自由調整高度，石墨烯導熱科技冬暖夏涼，冷凝凝膠持續涼感。",
  alternates: { canonical: "/product/lunio-mercury" },
  openGraph: {
    title: "Lunio Mercury 石墨烯機能記憶枕",
    description: "石墨烯科技 × 三段高度任調 × 冷暖雙面任選",
  },
};

export default async function MercuryPage() {
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

          {/* Mobile breadcrumb + title */}
          <div className="lg:hidden mb-4 space-y-2">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>Lunio Mercury 石墨烯機能記憶枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Lunio Mercury</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>石墨烯機能記憶枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <MercuryPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <MercuryFeatureCarousel />

      {/* ── 3-Layer Section (dark) ────────────────────────────────────── */}
      <MercuryLayerSection />

      {/* ── Video Section (dark) ─────────────────────────────────────── */}
      <MercuryVideoSection />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <MercuryLifestyleSlider />

      {/* ── Target Audience + VS Comparison (dark) ───────────────────── */}
      <MercurySleepSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
