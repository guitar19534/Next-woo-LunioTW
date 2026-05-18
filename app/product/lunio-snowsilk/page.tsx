export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }       from "@/components/product/shared/ProductGalleryCustom";
import { SnowSilkPanel }              from "@/components/product/snowsilk/SnowSilkPanel";
import { SnowSilkFeatureCarousel }    from "@/components/product/snowsilk/SnowSilkFeatureCarousel";
import { SnowSilkLifestyleSlider }    from "@/components/product/snowsilk/SnowSilkLifestyleSlider";
import { SnowSilkCompareSection }     from "@/components/product/snowsilk/SnowSilkCompareSection";
import { ProductPreFooter }           from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-snowsilk";
const VIDEO_ID = "PLACEHOLDER_VIDEO_ID";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Snow Silk 智能涼被｜Lunio Taiwan",
  description: "Lunio Snow Silk 智能涼被。雙面涼感布料 Qmax 0.31，觸感絲滑，OEKO-TEX® 認證，可機洗，四季適用。",
  alternates: { canonical: "/product/lunio-snowsilk" },
  openGraph: {
    title: "Lunio Snow Silk 智能涼被",
    description: "雙面涼感 × 絲滑柔軟 × 輕盈透氣",
  },
};

export default async function SnowSilkPage() {
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
              <span style={{ color: "#aaa" }}>Lunio SnowSilk 智能涼被</span>
            </nav>
            <p style={{ fontSize: 14, color: "#9ca3af" }}>Lunio Snow Silk</p>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>智能涼被</h1>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <SnowSilkPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <SnowSilkFeatureCarousel />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <SnowSilkLifestyleSlider />

      {/* ── Video Section ────────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#000" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto text-center">
          <h2 className="font-bold mb-2" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>智能好眠系列</h2>
          <p className="mb-10" style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(255,255,255,0.6)" }}>享受智慧寢具　全面升級睡眠</p>
          <div className="mx-auto" style={{ maxWidth: 420 }}>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "9/16" }}>
              <iframe src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Lunio Snow Silk 智能涼被"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 適合對象 + 產品比較 ──────────────────────────────────────── */}
      <SnowSilkCompareSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
