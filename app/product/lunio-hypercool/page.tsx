import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { HyperCoolPanel }           from "@/components/product/hypercool/HyperCoolPanel";
import { HyperCoolFeatureCarousel } from "@/components/product/hypercool/HyperCoolFeatureCarousel";
import { HyperCoolZoneSection }     from "@/components/product/hypercool/HyperCoolZoneSection";
import { HyperCoolLifestyleSlider } from "@/components/product/hypercool/HyperCoolLifestyleSlider";
import { HyperCoolVideoSection }    from "@/components/product/hypercool/HyperCoolVideoSection";
import { HyperCoolSleepSection }    from "@/components/product/hypercool/HyperCoolSleepSection";
import { VideoReviewCarousel }      from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }          from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }         from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-hypercool";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio HyperCool 智能工學護頸枕｜Lunio Taiwan",
  description: "HyperCool 智能工學護頸枕。4大專區精準支撐，適合全睡姿，HexaCool涼感布料，減少落枕翻身。",
  alternates: { canonical: "/product/lunio-hypercool" },
  openGraph: {
    title: "Lunio HyperCool 智能工學護頸枕",
    description: "智慧專區支撐 × 適合全睡姿 × 減少落枕與翻身",
  },
};

export default async function HyperCoolPage() {
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
              <span style={{ color: "#aaa" }}>Lunio HyperCool 智能工學護頸枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Lunio HyperCool</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>智能工學護頸枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <HyperCoolPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons Carousel ────────────────────────────────────── */}
      <HyperCoolFeatureCarousel />

      {/* ── 4-Zone Section ───────────────────────────────────────────── */}
      <HyperCoolZoneSection />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <HyperCoolLifestyleSlider />

      {/* ── Video Section (dark) ─────────────────────────────────────── */}
      <HyperCoolVideoSection />

      {/* ── Sleep Positions + VS Comparison (dark) ───────────────────── */}
      <HyperCoolSleepSection />

      {/* ── Video Review Carousel ────────────────────────────────────── */}
      <VideoReviewCarousel />

      {/* ── Video Tab Section ────────────────────────────────────────── */}
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
