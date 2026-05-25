import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { TopperTrifoldPanel } from "@/components/product/topper/TopperTrifoldPanel";
import { TrifoldLayerSection } from "@/components/product/topper/TrifoldLayerSection";
import { TrifoldFeatureSection } from "@/components/product/topper/TrifoldFeatureSection";
import { TrifoldCertCareSection } from "@/components/product/topper/TrifoldCertCareSection";
import { NoozPreFooter } from "@/components/shared/NoozPreFooter";

const SLUG = "nooz-topper-trifold";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Nooz FlexiRest Trifold Topper 三折疊日式床墊｜厚8公分 一墊多用 – Lunio" },
  description: "Nooz FlexiRest Trifold Topper 三折疊日式床墊。厚8公分，冰感記憶棉+高支撐泡棉，三折好收納，附手提袋。適合宿舍、露營、車宿、客房。全台本島免運。",
  alternates: { canonical: "/product/nooz-topper-trifold" },
  openGraph: {
    title: "Nooz FlexiRest Trifold Topper 三折疊日式床墊",
    description: "厚8公分 × 三折好收納 × 一墊多用",
  },
};

export default async function TopperTrifoldPage() {
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
              <span style={{ color: "#aaa" }}>FlexiRest Trifold Topper</span>
            </nav>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>
              Nooz FlexiRest Trifold Topper 三折疊日式床墊（厚8cm）
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
            <TopperTrifoldPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Layer Structure ───────────────────────────────────────────── */}
      <TrifoldLayerSection />

      {/* ── Icons / Videos / Feature blocks ──────────────────────────── */}
      <TrifoldFeatureSection />

      {/* ── Certifications + Care + CTA ──────────────────────────────── */}
      <TrifoldCertCareSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <NoozPreFooter
        productName="Nooz FlexiRest Trifold Topper"
        productHref="/product/nooz-topper-trifold"
      />
    </main>
  );
}
