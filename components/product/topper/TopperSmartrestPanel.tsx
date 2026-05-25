"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "標準單人": "【標準單人】現折2,835元",
  "單人加大": "【單人加大】現折3,285元",
  "標準雙人": "【標準雙人】現折4,335元",
  "雙人加大": "【雙人加大】現折4,785元",
};

const SIZE_DIMS: Record<string, string> = {
  "標準單人": "90 x 188 x 5 cm",
  "單人加大": "105 x 188 x 5 cm",
  "標準雙人": "150 x 188 x 5 cm",
  "雙人加大": "180 x 188 x 5 cm",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const SERVICES = [
  { src: "/ergo/Icon_payment_1-1.png", label: "12期0利率" },
  { src: "/ergo/Icon_Delivery_0.png",  label: "本島免費配送" },
  { src: "/ergo/Icon_Box.png",         label: "捲包床易安裝" },
];

interface Props { product: Product; variations: ProductVariation[]; }

export function TopperSmartrestPanel({ product, variations }: Props) {
  const sorted = [...variations].sort((a, b) => {
    const order = ["標準單人", "單人加大", "標準雙人", "雙人加大"];
    return order.indexOf(a.attributes[0]?.option ?? "") - order.indexOf(b.attributes[0]?.option ?? "");
  });

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    sorted.length > 0 ? sorted[0] : null
  );
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const handleVariationChange = useCallback((v: ProductVariation | null) => setSelectedVariation(v), []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;
  const selectedOpt = selectedVariation?.attributes[0]?.option ?? "";
  const sizeDim = SIZE_DIMS[selectedOpt] ?? "";

  return (
    <div className="space-y-5">
      {/* Desktop breadcrumb + title */}
      <div className="hidden lg:block space-y-2">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <Link href="/topper" className="hover:underline" style={{ color: BLUE }}>薄床墊</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>SmartRest Flip Topper</span>
        </nav>
        <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>
          Nooz SmartRest Flip Topper 翻轉床墊（厚5cm）
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>
            ({parseFloat(product.average_rating) > 0 ? product.average_rating : "5.0"})
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="font-bold" style={{ fontSize: 17, color: NAVY }}>包覆感 X 支撐力，幫小窩再升級</p>

      {/* Description */}
      <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.75 }}>
        5公分軟硬雙面薄墊，升級舊床，或當租屋床墊、宿舍床墊，隨心所欲
      </p>

      {/* Feature bullets */}
      <ul className="space-y-2.5" style={{ paddingLeft: 0, listStyle: "none" }}>
        {[
          { label: "軟硬雙面任選", desc: "冷凝記憶棉 / 扎實高支撐泡棉" },
          { label: "改善舊床軟硬度", desc: "小預算升級舊床墊" },
          { label: "可水洗透氣床套", desc: "柔軟排汗，舒適乾爽" },
        ].map((f) => (
          <li key={f.label} style={{ fontSize: 14.5, color: "#444" }}>
            <span className="font-bold" style={{ color: NAVY }}>• {f.label}</span>：{f.desc}
          </li>
        ))}
      </ul>

      {/* Size display */}
      {sizeDim && (
        <div className="rounded-lg px-4 py-2.5" style={{ backgroundColor: "#f0f4fa", fontSize: 14, color: "#555" }}>
          尺寸：{sizeDim}
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>
          NT${Number(price).toLocaleString()}
        </span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>
            NT${Number(regularPrice).toLocaleString()}
          </span>
        )}
      </div>

      {/* Size selector */}
      {sorted.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
          <select
            className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#fff" }}
            value={selectedOpt}
            onChange={(e) => {
              const v = sorted.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }}>
            {sorted.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              return <option key={v.id} value={opt}>{VARIATION_LABELS[opt] ?? opt}</option>;
            })}
          </select>
        </div>
      )}

      {/* Qty + CTA */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium" style={{ color: "#555" }}>數量</span>
        <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "#ddd" }}>
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>−</button>
          <span className="w-10 text-center text-sm font-medium" style={{ color: NAVY }}>{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>＋</button>
        </div>
        <button ref={ctaRef} type="button" disabled={adding}
          onClick={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
          className="flex-1 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: BLUE, fontSize: 16 }}>
          {adding ? "加入中..." : "立刻搶購"}
        </button>
      </div>

      {/* Service icons */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl py-4 px-3" style={{ backgroundColor: "#EEF3FB" }}>
        {SERVICES.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
            <Image src={s.src} alt={s.label} width={36} height={36} className="object-contain" />
            <span style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      <StickyCartBar productName="Nooz SmartRest" subtitle="翻轉床墊"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={sorted} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
