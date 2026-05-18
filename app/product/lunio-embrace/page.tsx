import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }     from "@/components/product/shared/ProductGalleryCustom";
import { EmbracePanel }             from "@/components/product/embrace/EmbracePanel";
import { EmbraceFeatureCarousel }   from "@/components/product/embrace/EmbraceFeatureCarousel";
import { EmbraceLayerSection }      from "@/components/product/embrace/EmbraceLayerSection";
import { EmbraceVideoSection }      from "@/components/product/embrace/EmbraceVideoSection";
import { EmbraceLifestyleSlider }   from "@/components/product/embrace/EmbraceLifestyleSlider";
import { EmbraceTargetSection }     from "@/components/product/embrace/EmbraceTargetSection";
import { VideoReviewCarousel }      from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }          from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }         from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-embrace";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Lunio Embrace 多功能擁抱枕｜沙發靠枕、床頭靠枕推薦 – Lunio乳膠床墊" },
  description: "Lunio Embrace 多功能擁抱枕。環腰溫暖擁抱，天鵝絨可拆洗枕套，碎記憶棉填充，追劇閱讀、沙發靠枕必備。",
  alternates: { canonical: "/product/lunio-embrace" },
  openGraph: {
    title: "Lunio Embrace 多功能擁抱枕",
    description: "沙發靠枕、床頭靠枕推薦 × 環腰溫暖擁抱 × 天鵝絨可拆洗",
  },
};

export default async function EmbracePage() {
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
              <span style={{ color: "#aaa" }}>Lunio Embrace 多功能擁抱枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Lunio Embrace</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>多功能擁抱枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <EmbracePanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <EmbraceFeatureCarousel />

      {/* ── Layer Section (dark) ─────────────────────────────────────── */}
      <EmbraceLayerSection />

      {/* ── Video Section (dark) ─────────────────────────────────────── */}
      <EmbraceVideoSection />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <EmbraceLifestyleSlider />

      {/* ── Target + Comparison (dark) ───────────────────────────────── */}
      <EmbraceTargetSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
