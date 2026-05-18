import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { SnowWeaveBeddingHero }           from "@/components/product/bedsheet/SnowWeaveBeddingHero";
import { SnowWeaveBeddingFeatureCarousel } from "@/components/product/bedsheet/SnowWeaveBeddingFeatureCarousel";
import { SnowWeaveBeddingLifestyleSlider } from "@/components/product/bedsheet/SnowWeaveBeddingLifestyleSlider";
import { SnowWeaveBeddingVideoSection }   from "@/components/product/bedsheet/SnowWeaveBeddingVideoSection";
import { SnowWeaveBeddingCompareSection } from "@/components/product/bedsheet/SnowWeaveBeddingCompareSection";
import { ProductPreFooter }               from "@/components/shared/ProductPreFooter";

const SLUG = "tencel-bedsheet";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Snow Weave 智能天絲床包組｜Lunio Taiwan",
  description: "Lunio Snow Weave 智能天絲床包組。100% 奧地利天絲萊賽爾，60支紗×300織，115gsm，3色可選，360°彈力床包。",
  alternates: { canonical: "/product/tencel-bedsheet" },
  openGraph: {
    title: "Lunio Snow Weave 智能天絲床包組（床包+枕套）3色",
    description: "親膚微涼 × 簡約優雅 × 臥室升級",
  },
};

export default async function TencelBedsheetPage() {
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

      {/* ── Hero (gallery + panel with color switcher) ─────────────── */}
      <SnowWeaveBeddingHero product={product} variations={variations} />

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <SnowWeaveBeddingFeatureCarousel />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <SnowWeaveBeddingLifestyleSlider />

      {/* ── Video Section ────────────────────────────────────────────── */}
      <SnowWeaveBeddingVideoSection />

      {/* ── 適合對象 + 產品比較 (dark) ──────────────────────────────── */}
      <SnowWeaveBeddingCompareSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
