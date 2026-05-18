export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }       from "@/components/product/shared/ProductGalleryCustom";
import { ButterflyPanel }             from "@/components/product/butterfly/ButterflyPanel";
import { ButterflyFeatureCarousel }   from "@/components/product/butterfly/ButterflyFeatureCarousel";
import { ButterflyZoneSection }       from "@/components/product/butterfly/ButterflyZoneSection";
import { ButterflyLifestyleSlider }   from "@/components/product/butterfly/ButterflyLifestyleSlider";
import { ButterflyVideoSection }      from "@/components/product/butterfly/ButterflyVideoSection";
import { ButterflySleepSection }      from "@/components/product/butterfly/ButterflySleepSection";
import { VideoReviewCarousel }        from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }            from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }           from "@/components/shared/ProductPreFooter";

const SLUG = "nooz-butterfly";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nooz Ergo Butterfly 蝶形記憶枕｜Lunio Taiwan",
  description: "Nooz Ergo Butterfly 蝶形記憶枕。蝶形輪廓凹槽貼合，柔軟竹纖維枕套，適合入門工學枕。",
  alternates: { canonical: "/product/nooz-butterfly" },
  openGraph: {
    title: "Nooz Ergo Butterfly 蝶形記憶枕",
    description: "蝶形輪廓 × 凹槽貼合 × 柔軟竹纖維",
  },
};

export default async function ButterflyPage() {
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
              <span style={{ color: "#aaa" }}>Nooz Ergo Butterfly 蝶形記憶枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Nooz Ergo Butterfly</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>蝶形記憶枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <ButterflyPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <ButterflyFeatureCarousel />

      {/* ── Zone Section (dark navy) ──────────────────────────────────── */}
      <ButterflyZoneSection />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <ButterflyLifestyleSlider />

      {/* ── Video Section (dark, horizontal 16:9) ────────────────────── */}
      <ButterflyVideoSection />

      {/* ── Sleep Positions + VS Comparison (dark) ───────────────────── */}
      <ButterflySleepSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
