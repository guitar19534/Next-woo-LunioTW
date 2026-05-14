"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductVariation } from "@/lib/woocommerce.d";
import { ShoppingBag, ChevronDown } from "lucide-react";

interface Props {
  /** ชื่อ + subtitle แสดงใน bar */
  productName: string;
  subtitle: string;
  /** ราคา */
  price: string;
  regularPrice?: string;
  isOnSale?: boolean;
  /** Variations */
  variations: ProductVariation[];
  selectedVariation: ProductVariation | null;
  onVariationChange: (v: ProductVariation | null) => void;
  variationLabels: Record<string, string>;
  /** Add to cart */
  onAddToCart: () => void;
  adding: boolean;
  /** Ref ที่ main CTA button — bar จะโผล่เมื่อปุ่มนี้หายจาก viewport */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function StickyCartBar({
  productName, subtitle,
  price, regularPrice, isOnSale,
  variations, selectedVariation, onVariationChange, variationLabels,
  onAddToCart, adding,
  triggerRef,
}: Props) {
  const [visible, setVisible] = useState(false);
  const hasBeenSeen = useRef(false);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // user scrolled to the button — mark as seen
          hasBeenSeen.current = true;
        }
        // only show bar after user has seen the button and scrolled past it
        setVisible(hasBeenSeen.current && !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerRef]);

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        fontFamily: "'MiSansTC','Noto Sans TC',sans-serif",
        backgroundColor: "#fff",
        borderTop: "1px solid #e5e7eb",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.10)",
      }}
    >
      <div className="max-w-[1400px] w-[90%] mx-auto py-3 md:py-3.5">

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-center gap-5">

          {/* Product info */}
          <div className="flex-shrink-0 min-w-0">
            <p className="font-bold leading-tight" style={{ fontSize: 15, color: "#17284b" }}>{productName}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{subtitle}</p>
          </div>

          <div className="w-px h-8 flex-shrink-0" style={{ backgroundColor: "#e5e7eb" }} />

          {/* Variation selector */}
          {variations.length > 0 && (
            <div className="relative flex-shrink-0" style={{ minWidth: 200 }}>
              <select
                value={selectedVariation?.attributes[0]?.option ?? ""}
                onChange={(e) => {
                  const v = variations.find((v) =>
                    v.attributes.some((a) => a.option === e.target.value)
                  ) ?? null;
                  onVariationChange(v);
                }}
                className="appearance-none w-full pl-3 pr-8 py-2 rounded-xl text-sm outline-none cursor-pointer"
                style={{
                  border: "1.5px solid #e2e8f0",
                  fontSize: 13,
                  color: "#17284b",
                  backgroundColor: "#f8faff",
                  fontFamily: "'MiSansTC','Noto Sans TC',sans-serif",
                }}
              >
                <option value="" disabled>請選擇尺寸</option>
                {variations.map((v) => {
                  const opt = v.attributes[0]?.option ?? "";
                  return <option key={v.id} value={opt}>{variationLabels[opt] ?? opt}</option>;
                })}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }} />
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-shrink-0 ml-auto">
            <span className="font-bold" style={{ fontSize: 20, color: "#1C46B4" }}>
              NT${Number(price).toLocaleString()}
            </span>
            {isOnSale && regularPrice && (
              <span className="line-through" style={{ fontSize: 13, color: "#bbb" }}>
                NT${Number(regularPrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={onAddToCart}
            disabled={adding}
            className="flex items-center gap-2 flex-shrink-0 px-7 py-2.5 rounded-2xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#1C46B4", fontSize: 14, letterSpacing: "0.04em" }}
          >
            <ShoppingBag size={16} />
            {adding ? "加入中..." : "立刻搶購"}
          </button>
        </div>

        {/* ── Mobile layout ── */}
        <div className="flex md:hidden items-center gap-3">

          {/* Variation (compact) */}
          {variations.length > 0 && (
            <div className="relative flex-1 min-w-0">
              <select
                value={selectedVariation?.attributes[0]?.option ?? ""}
                onChange={(e) => {
                  const v = variations.find((v) =>
                    v.attributes.some((a) => a.option === e.target.value)
                  ) ?? null;
                  onVariationChange(v);
                }}
                className="appearance-none w-full pl-3 pr-7 py-2.5 rounded-xl text-sm outline-none cursor-pointer truncate"
                style={{
                  border: "1.5px solid #e2e8f0",
                  fontSize: 12,
                  color: "#17284b",
                  backgroundColor: "#f8faff",
                  fontFamily: "'MiSansTC','Noto Sans TC',sans-serif",
                }}
              >
                <option value="" disabled>請選擇尺寸</option>
                {variations.map((v) => {
                  const opt = v.attributes[0]?.option ?? "";
                  return <option key={v.id} value={opt}>{variationLabels[opt] ?? opt}</option>;
                })}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }} />
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="text-right">
              <p className="font-bold leading-none" style={{ fontSize: 16, color: "#1C46B4" }}>
                NT${Number(price).toLocaleString()}
              </p>
              {isOnSale && regularPrice && (
                <p className="line-through" style={{ fontSize: 11, color: "#bbb" }}>
                  NT${Number(regularPrice).toLocaleString()}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onAddToCart}
              disabled={adding}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
              style={{ backgroundColor: "#1C46B4", fontSize: 13 }}
            >
              <ShoppingBag size={14} />
              {adding ? "加入中..." : "立刻搶購"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
