"use client";

/**
 * Product Showcase — Interactive tab switcher
 * Matches the #choice-1 / #js-flip-1 flip-card section on lunio.com.tw
 * Server fetches products; this client component handles the tab interaction.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/woocommerce.d";

// Labels matching the live site's product showcase tabs
const TAB_LABELS = ["最好睡", "最高C/P值", "入門首選"] as const;

interface ProductShowcaseProps {
  products: (Product | undefined)[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const valid = products.filter(Boolean) as Product[];
  const [active, setActive] = useState(0);

  // Auto-rotate every 4 seconds (matches the live site's 3s flip + 1s transition)
  useEffect(() => {
    if (valid.length <= 1) return;
    const id = setInterval(
      () => setActive((prev) => (prev + 1) % valid.length),
      4000
    );
    return () => clearInterval(id);
  }, [valid.length]);

  if (!valid.length) return null;

  const current = valid[active];
  const image = current?.images?.[0];
  const price = parseInt(current?.price || "0");
  const regularPrice = current?.regular_price
    ? parseInt(current.regular_price)
    : 0;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="tracking-[5px] uppercase font-medium mb-3"
            style={{ fontSize: "11px", color: "#3c7ae4" }}
          >
            CHOOSE YOUR MATTRESS
          </p>
          <h2 className="font-bold text-[#212020]">選擇最適合你的床墊</h2>
          <p className="text-[#888888] mt-3" style={{ fontSize: "15px" }}>
            從入門到頂級，每一款都經過嚴格品質認證
          </p>
        </div>

        {/* Tab selectors */}
        <div className="flex justify-center gap-0 mb-8 md:mb-12 border border-[#E4E4E4] rounded-full w-fit mx-auto overflow-hidden">
          {valid.map((product, idx) => (
            <button
              key={product.id}
              onClick={() => setActive(idx)}
              className="px-5 md:px-8 py-2.5 text-sm font-medium transition-all duration-300"
              style={{
                fontSize: "13px",
                letterSpacing: "1px",
                backgroundColor: active === idx ? "#3c7ae4" : "transparent",
                color: active === idx ? "#ffffff" : "#5F6062",
              }}
            >
              {TAB_LABELS[idx] ?? `商品 ${idx + 1}`}
            </button>
          ))}
        </div>

        {/* Product card */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div
            className="relative aspect-[4/3] rounded-[8px] overflow-hidden bg-[#F8F8F8] order-1 md:order-1"
          >
            {image?.src ? (
              <Image
                key={current.id}
                src={image.src}
                alt={image.alt || current.name}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#E4E4E4] flex items-center justify-center text-[#888888] text-sm">
                {current.name}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="order-2 space-y-5">
            {/* Tab dot indicators */}
            <div className="flex gap-2">
              {valid.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  active === idx ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: active === idx ? "#3c7ae4" : "#E4E4E4",
                  }}
                  aria-label={`商品 ${idx + 1}`}
                />
              ))}
            </div>

            <div>
              <h3
                className="font-bold text-[#212020] leading-tight"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                {current.name}
              </h3>

              {current.short_description && (
                <div
                  className="text-[#5F6062] mt-4 leading-relaxed product-desc"
                  style={{ fontSize: "14px" }}
                  dangerouslySetInnerHTML={{ __html: current.short_description }}
                />
              )}
            </div>

            {/* Price */}
            {price > 0 && (
              <div className="flex items-baseline gap-3">
                <span
                  className="font-bold"
                  style={{ fontSize: "24px", color: "#3c7ae4" }}
                >
                  NT${price.toLocaleString()}
                </span>
                {regularPrice > price && (
                  <span
                    className="text-[#888888] line-through"
                    style={{ fontSize: "14px" }}
                  >
                    NT${regularPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[#888888]" style={{ fontSize: "12px" }}>
                  起
                </span>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={`/shop/${current.slug}`} className="btn-lunio">
                立刻選購
              </Link>
              <Link
                href={`/shop/${current.slug}`}
                className="btn-lunio-outline"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-desc ul { list-style: none; padding: 0; margin: 0; }
        .product-desc li { padding-left: 1em; position: relative; margin-bottom: 4px; }
        .product-desc li::before { content: "·"; position: absolute; left: 0; color: #3c7ae4; font-weight: 700; }
      `}</style>
    </section>
  );
}
