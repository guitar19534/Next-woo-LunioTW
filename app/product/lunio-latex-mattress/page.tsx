import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductBySlug, getProductVariations, getProductReviews } from "@/lib/woocommerce";
import { Gen4Section } from "@/components/home/gen4-section";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { Gen4ProductPanel } from "@/components/product/gen4/Gen4ProductPanel";
import { LayerCarousel } from "@/components/product/gen4/LayerCarousel";
import { YoutubeCarousel } from "@/components/product/gen4/YoutubeCarousel";
import { VideoReviewCarousel } from "@/components/product/gen4/VideoReviewCarousel";
import { VideoTabSection } from "@/components/product/gen4/VideoTabSection";
import { LayerSection } from "@/components/product/gen4/LayerSection";
import { ProductPreFooter } from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-latex-mattress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Gen4 石墨烯乳膠床墊｜100% 天然乳膠 × 骨科醫師聯合研發",
  description:
    "Lunio Gen4 石墨烯乳膠床墊，石墨烯導熱科技、九區人體工學、100% 天然乳膠。100 晚試睡保證，全台免費配送安裝。",
  alternates: { canonical: "/product/gen4" },
  openGraph: {
    title: "Lunio Gen4 石墨烯乳膠床墊",
    description: "石墨烯導熱技術 × 骨科醫師聯合研發 × 100 晚免費試睡保證",
  },
};

export default async function Gen4ProductPage() {
  const product = await getProductBySlug(SLUG);
  if (!product) notFound();

  const [variations, reviews] = await Promise.all([
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
          {/* Mobile-only: breadcrumb + title + rating above gallery */}
          <div className="lg:hidden mb-4 space-y-3">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>{product.name}</span>
            </nav>
            <div>
              <h1 className="leading-tight mb-1 font-semibold" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: "#17284b" }}>
                Lunio Gen4
              </h1>
              <p style={{ fontSize: "16px", color: "#aaa" }}>石墨烯乳膠床墊</p>
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

            {/* Info Panel */}
            <Gen4ProductPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons Strip ──────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="max-w-[1400px] w-[85%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-4">
            {[
              { icon: "/gen4/Icon-Gen4-01.webp", title: "冬暖夏涼",  sub: "4倍太空溫控科技" },
              { icon: "/gen4/Icon-Gen4-02.webp", title: "減輕腰酸背痛", sub: "9區支撐" },
              { icon: "/gen4/Icon-Gen4-03.webp", title: "翻身不受干擾", sub: "無彈簧設計" },
              { icon: "/gen4/Icon-Gen4-04.webp", title: "舒適度提高30%", sub: "與傳統床墊比較" },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3">
                <Image src={f.icon} alt={f.title} width={72} height={72} className="shrink-0" />
                <div>
                  <p className="font-semibold" style={{ fontSize: "14px", color: "#17284b" }}>{f.title}</p>
                  <p className="mt-0.5" style={{ fontSize: "12px", color: "#888" }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Layer Carousel ───────────────────────────────────────────── */}
      <LayerCarousel />

      {/* ── YouTube Carousel ─────────────────────────────────────────── */}
      <YoutubeCarousel />

      {/* ── 9-Zone Section ───────────────────────────────────────────── */}
      <section className="relative w-full bg-white">
        <Image
          src="/gen4/Gen4-zone.webp"
          alt="Lunio Gen4 9分區支撐設計"
          width={1920}
          height={900}
          className="w-full h-auto"
        />
        <div className="absolute top-[5%] left-0 right-0 text-center px-4">
          <h2 className="font-bold mb-1" style={{ fontSize: "clamp(13px, 2.5vw, 36px)", color: "#17284b", lineHeight: 1.3 }}>
            9分區支撐設計
          </h2>
          <p style={{ fontSize: "clamp(10px, 1.5vw, 18px)", color: "#5F6062" }}>
            減輕肩頸腰背痠痛
          </p>
        </div>
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
