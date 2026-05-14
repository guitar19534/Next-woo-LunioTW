import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }     from "@/components/product/shared/ProductGalleryCustom";
import { IceFitPanel }              from "@/components/product/icefit/IceFitPanel";
import { IceFitFeatureCarousel }    from "@/components/product/icefit/IceFitFeatureCarousel";
import { IceFitLayerSection }       from "@/components/product/icefit/IceFitLayerSection";
import { IceFitVideoSection }       from "@/components/product/icefit/IceFitVideoSection";
import { IceFitLifestyleSlider }    from "@/components/product/icefit/IceFitLifestyleSlider";
import { IceFitSleepSection }       from "@/components/product/icefit/IceFitSleepSection";
import { VideoReviewCarousel }      from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }          from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }         from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-icefit";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio IceFit Smart Curve 智能涼感護頸枕｜Lunio Taiwan",
  description: "Lunio IceFit Smart Curve 智能涼感護頸枕。一觸即涼降溫1～3°C，凹型曲面完美貼合肩頸，三層枕芯雙面躺感。",
  alternates: { canonical: "/product/lunio-icefit" },
  openGraph: {
    title: "Lunio IceFit Smart Curve 智能涼感護頸枕",
    description: "一觸即涼 × 完美貼合頸部 × 雙面躺感",
  },
};

export default async function IceFitPage() {
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
              <span style={{ color: "#aaa" }}>Lunio IceFit Smart Curve 智能涼感護頸枕</span>
            </nav>
            <p style={{ fontSize: 14, color: "#aaa" }}>Lunio IceFit</p>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Smart Curve</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>智能涼感護頸枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <IceFitPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <IceFitFeatureCarousel />

      {/* ── Layer Section (dark) ─────────────────────────────────────── */}
      <IceFitLayerSection />

      {/* ── Video Section (dark, vertical) ───────────────────────────── */}
      <IceFitVideoSection />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <IceFitLifestyleSlider />

      {/* ── Target + VS Comparison (dark) ────────────────────────────── */}
      <IceFitSleepSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
