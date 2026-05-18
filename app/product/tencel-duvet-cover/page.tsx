import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { DuvetCoverHero }               from "@/components/product/duvet-cover/DuvetCoverHero";
import { SnowWeaveBeddingFeatureCarousel } from "@/components/product/bedsheet/SnowWeaveBeddingFeatureCarousel";
import { DuvetCoverLifestyleSlider }     from "@/components/product/duvet-cover/DuvetCoverLifestyleSlider";
import { SnowWeaveBeddingVideoSection }  from "@/components/product/bedsheet/SnowWeaveBeddingVideoSection";
import { DuvetCoverCompareSection }      from "@/components/product/duvet-cover/DuvetCoverCompareSection";
import { ProductPreFooter }              from "@/components/shared/ProductPreFooter";

const SLUG = "tencel-duvet-cover";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Lunio Snow Weave 智能天絲涼感被套（3色）– 100%萊賽爾天絲，親膚涼爽" },
  description: "Lunio Snow Weave 智能天絲涼感被套。100% 奧地利萊賽爾天絲，60支紗×300織，天然涼感吸濕排汗，3色可選，全台免費配送。",
  alternates: { canonical: "/product/tencel-duvet-cover" },
  openGraph: {
    title: "Lunio Snow Weave 智能天絲涼感被套",
    description: "100%萊賽爾天絲 × 親膚涼爽 × 60支紗300織",
  },
};

export default async function TencelDuvetCoverPage() {
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

      <DuvetCoverHero product={product} variations={variations} />
      <SnowWeaveBeddingFeatureCarousel />
      <DuvetCoverLifestyleSlider />
      <SnowWeaveBeddingVideoSection />
      <DuvetCoverCompareSection />
      <ProductPreFooter />
    </main>
  );
}
