/**
 * Graphene / Gen4 Feature Section
 * Matches the "Lunio Gen 4 石墨烯乳膠床墊" deep-feature section on lunio.com.tw
 * Layout: full-width heading → 5-icon feature grid → product CTA
 */

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/woocommerce.d";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" stroke="#3c7ae4" strokeWidth="2" />
        <path d="M16 28 C16 20 32 20 32 28" stroke="#3c7ae4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="22" r="2" fill="#3c7ae4" />
        <circle cx="30" cy="22" r="2" fill="#3c7ae4" />
        <path d="M20 32h8" stroke="#3c7ae4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "冬暖夏涼",
    subtitle: "4 倍太空溫控科技",
    desc: "石墨烯導熱層配合 NASA 太空相變材料，夏季散熱，冬季保溫，全年舒適。",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="16" rx="8" stroke="#3c7ae4" strokeWidth="2" />
        <path d="M16 20 V16 C16 12 20 10 24 10 C28 10 32 12 32 16 V20" stroke="#3c7ae4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="28" r="3" fill="#3c7ae4" />
      </svg>
    ),
    title: "減輕腰酸背痛",
    subtitle: "9 區人體工學支撐",
    desc: "9 區差異化支撐設計，肩部柔軟、腰部加固，完整貼合脊椎自然曲線。",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 36 H40 V30 C40 26 36 24 32 24 H16 C12 24 8 26 8 30 V36Z" stroke="#3c7ae4" strokeWidth="2" />
        <path d="M14 24 V18 C14 14 18 12 22 12 H26 C30 12 34 14 34 18 V24" stroke="#3c7ae4" strokeWidth="2" />
        <circle cx="24" cy="18" r="3" fill="#3c7ae4" />
      </svg>
    ),
    title: "翻身不受干擾",
    subtitle: "無彈簧乳膠結構",
    desc: "無獨立筒彈簧，乳膠點彈性設計，完全隔離動作傳遞，雙人無干擾。",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 8 L28 20 L40 20 L30 28 L34 40 L24 32 L14 40 L18 28 L8 20 L20 20Z" stroke="#3c7ae4" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "涼爽透氣 12 小時",
    subtitle: "德國 KIKOO® 散熱層",
    desc: "德國認證 KIKOO 透氣層，導熱係數提升 30 倍，持續散熱長達 12 小時。",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 36 L24 12 L36 36" stroke="#3c7ae4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 28 H32" stroke="#3c7ae4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="40" r="3" fill="#3c7ae4" />
      </svg>
    ),
    title: "舒適度提高 30%",
    subtitle: "與傳統獨立筒對比",
    desc: "臨床測試顯示，Lunio Gen4 相較傳統獨立筒，深層睡眠時間提升 30%。",
  },
] as const;

interface GrapheneSectionProps {
  product?: Product;
}

export function GrapheneSection({ product }: GrapheneSectionProps) {
  const image = product?.images?.[0];
  const price = product ? parseInt(product.price || "0") : 0;

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="tracking-[5px] uppercase font-medium mb-3"
            style={{ fontSize: "11px", color: "#3c7ae4" }}
          >
            GRAPHENE TECHNOLOGY · 石墨烯科技
          </p>
          <h2 className="font-bold text-[#212020]">
            涼感透氣，解決腰酸背痛
            <br />
            <mark className="font-bold">耐用 15 年</mark>
          </h2>
          {/* Google rating badge */}
          <div className="inline-flex items-center gap-2 mt-5 bg-white border border-[#E4E4E4] rounded-full px-4 py-2">
            <span style={{ fontSize: "13px", color: "#888888" }}>Google 評分</span>
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 16l-6.2 4.3 2.4-7.4L0 8.4h7.6z" />
                </svg>
              ))}
            </span>
            <span className="font-semibold text-[#212020]" style={{ fontSize: "13px" }}>
              4.8 / 5
            </span>
          </div>
        </div>

        {/* ── 5 Feature blocks ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-14 md:mb-20">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[8px] p-6 flex flex-col items-center text-center gap-4 border border-[#E4E4E4] hover:border-[#3c7ae4]/30 hover:shadow-md transition-all duration-300"
            >
              <div>{f.icon}</div>
              <div>
                <p
                  className="font-semibold text-[#212020] leading-tight"
                  style={{ fontSize: "14px" }}
                >
                  {f.title}
                </p>
                <p
                  className="font-medium mt-0.5 leading-tight"
                  style={{ fontSize: "11px", color: "#3c7ae4" }}
                >
                  {f.subtitle}
                </p>
              </div>
              <p
                className="text-[#5F6062] leading-relaxed"
                style={{ fontSize: "12px" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Product spotlight ── */}
        {product && (
          <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-[8px] p-8 md:p-12 border border-[#E4E4E4]">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-[8px] overflow-hidden bg-[#F8F8F8]">
              {image?.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-[#E4E4E4]" />
              )}
            </div>

            {/* Info */}
            <div className="space-y-4">
              <p
                className="tracking-[4px] uppercase font-medium"
                style={{ fontSize: "10px", color: "#3c7ae4" }}
              >
                FLAGSHIP MODEL
              </p>
              <h3 className="font-bold text-[#212020] leading-tight">
                {product.name}
              </h3>
              {product.short_description && (
                <div
                  className="text-[#5F6062] leading-relaxed product-desc-gs"
                  style={{ fontSize: "13px" }}
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}
              {price > 0 && (
                <p
                  className="font-bold"
                  style={{ fontSize: "22px", color: "#3c7ae4" }}
                >
                  NT${price.toLocaleString()}
                  <span
                    className="font-normal text-[#888888] ml-1"
                    style={{ fontSize: "13px" }}
                  >
                    起
                  </span>
                </p>
              )}
              <Link href={`/shop/${product.slug}`} className="btn-lunio inline-flex">
                立刻選購
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-desc-gs ul { list-style: none; padding: 0; margin: 0; }
        .product-desc-gs li { padding-left: 1em; position: relative; margin-bottom: 6px; }
        .product-desc-gs li::before { content: "·"; position: absolute; left: 0; color: #3c7ae4; font-weight: 700; }
      `}</style>
    </section>
  );
}
