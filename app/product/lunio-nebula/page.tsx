import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }   from "@/components/product/shared/ProductGalleryCustom";
import { NebulaPanel }            from "@/components/product/nebula/NebulaPanel";
import { NebulaFeatureCarousel }  from "@/components/product/nebula/NebulaFeatureCarousel";
import { NebulaLifestyleSlider }  from "@/components/product/nebula/NebulaLifestyleSlider";
import { NebulaSleepSection }     from "@/components/product/nebula/NebulaSleepSection";
import { VideoReviewCarousel }    from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection }        from "@/components/product/gen4/VideoTabSection";
import { ProductPreFooter }       from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-nebula";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Lunio Nebula 經典記憶枕 – Lunio" },
  description: "Lunio Nebula 經典記憶枕。精細記憶棉蓬鬆有彈性，親膚枕套柔軟透氣，簡單就是經典。全台免費配送。",
  alternates: { canonical: "/product/lunio-nebula" },
  openGraph: {
    title: "Lunio Nebula 經典記憶枕",
    description: "精細記憶棉 × 柔軟透氣 × 簡單就是經典",
  },
};

export default async function NebulaPage() {
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
              <span style={{ color: "#aaa" }}>Lunio Nebula 經典記憶枕</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>Lunio Nebula</h1>
            <p style={{ fontSize: 16, color: "#aaa" }}>經典記憶枕</p>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <NebulaPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <NebulaFeatureCarousel />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <NebulaLifestyleSlider />

      {/* ── Target Audience + VS Comparison (dark) ───────────────────── */}
      <NebulaSleepSection />

      {/* ── Video Review + Tab ───────────────────────────────────────── */}
      <VideoReviewCarousel />
      <VideoTabSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
