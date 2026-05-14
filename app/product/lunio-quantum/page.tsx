import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductBySlug, getProductVariations, getProductReviews } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { QTMProductPanel } from "@/components/product/qtm/QTMProductPanel";
import { FeatureCarousel } from "@/components/product/qtm/FeatureCarousel";
import { LayerCarousel } from "@/components/product/qtm/LayerCarousel";
import { YoutubeCarousel } from "@/components/product/qtm/YoutubeCarousel";
import { VideoReviewCarousel } from "@/components/product/qtm/VideoReviewCarousel";
import { VideoTabSection } from "@/components/product/qtm/VideoTabSection";
import { LayerSection } from "@/components/product/qtm/LayerSection";
import { ProductPreFooter } from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-quantum";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Quantum Max 獨立筒床墊｜頂級獨立筒 × 智慧溫控科技",
  description:
    "Lunio Quantum Max，頂級獨立筒彈簧 × SmartTemp 智慧溫控 × 100% 天然乳膠。100 晚試睡保證，全台免費配送安裝。",
  alternates: { canonical: "/product/lunio-quantum-max" },
  openGraph: {
    title: "Lunio Quantum Max 獨立筒床墊",
    description: "頂級獨立筒 × 智慧溫控科技 × 100 晚免費試睡保證",
  },
};

export default async function QTMProductPage() {
  const product = await getProductBySlug(SLUG);
  if (!product) notFound();

  const [variations] = await Promise.all([
    product.type === "variable" ? getProductVariations(product.id) : [],
    getProductReviews(product.id),
  ]);

  return (
    <main className="misans-page">
      <style>{`
        .misans-page, .misans-page * {
          font-family: 'MiSansTC', 'Noto Sans TC', sans-serif !important;
        }
      `}</style>

      {/* ── Hero: Gallery + Purchase Panel ───────────────────────────── */}
      <section className="bg-white pt-12 pb-20">
        <div className="max-w-[1400px] w-[85%] mx-auto">

          {/* Mobile: breadcrumb + title above gallery */}
          <div className="lg:hidden mb-4 space-y-3">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>{product.name}</span>
            </nav>
            <div>
              <h1 className="leading-tight mb-1 font-semibold" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: "#17284b" }}>
                Lunio Quantum Max
              </h1>
              <p style={{ fontSize: "16px", color: "#aaa" }}>高碳錳乳膠獨立筒</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span className="text-sm" style={{ color: "#555" }}>
                (Google 評論)床墊評價 {product.average_rating || "4.8"}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            {/* Gallery — sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            {/* Panel */}
            <QTMProductPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Carousel ─────────────────────────────────────────── */}
      <FeatureCarousel />

      {/* ── Layer Carousel ───────────────────────────────────────────── */}
      <LayerCarousel />

      {/* ── YouTube Carousel ─────────────────────────────────────────── */}
      <YoutubeCarousel />

      {/* ── Zone Section ─────────────────────────────────────────────── */}
      <section className="relative w-full bg-white">
        <Image
          src="/qtm/supportzone-PC.webp"
          alt="Lunio Quantum Max 9分區支撐設計"
          width={1920}
          height={900}
          className="w-full h-auto"
        />
        {/* <div className="absolute top-[5%] left-0 right-0 text-center px-4">
          <h2 className="font-bold mb-1" style={{ fontSize: "clamp(13px, 2.5vw, 36px)", color: "#17284b", lineHeight: 1.3 }}>
            9分區支撐設計
          </h2>
          <p style={{ fontSize: "clamp(10px, 1.5vw, 18px)", color: "#5F6062" }}>
            精準承托，減輕肩頸腰背痠痛
          </p>
        </div>*/}
      </section>

      {/* ── Video Review Carousel ────────────────────────────────────── */}
      <VideoReviewCarousel />

      {/* ── Video Tab Section ────────────────────────────────────────── */}
      <VideoTabSection />

      {/* ── Layer Section ────────────────────────────────────────────── */}
      <LayerSection />

      {/* ── Pre-Footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
