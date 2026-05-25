"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "標準單人": "【標準單人】現折5,980",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const SERVICES = [
  { src: "/ergo/Icon_payment_1-1.png", label: "12期0利率" },
  { src: "/ergo/Icon_Delivery_0.png",  label: "本島免費配送" },
  { src: "/ergo/Icon_Box.png",         label: "捲包床易安裝" },
];

interface Props { product: Product; variations: ProductVariation[]; }

export function TopperTrifoldPanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    variations.length > 0 ? variations[0] : null
  );
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const handleVariationChange = useCallback((v: ProductVariation | null) => setSelectedVariation(v), []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  return (
    <div className="space-y-5">
      {/* Desktop breadcrumb + title */}
      <div className="hidden lg:block space-y-2">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <Link href="/topper" className="hover:underline" style={{ color: BLUE }}>薄床墊</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>FlexiRest Trifold Topper</span>
        </nav>
        <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>
          Nooz FlexiRest Trifold Topper 三折疊日式床墊（厚8cm）
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>
            ({parseFloat(product.average_rating) > 0 ? product.average_rating : "5.0"})
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="font-bold" style={{ fontSize: 17, color: NAVY }}>輕鬆展開，隨處享受一夜好眠</p>

      {/* Feature bullets */}
      <ul className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
        {[
          "三折疊設計，收納超方便，附提袋好搬又防髒",
          "一墊多用，可當客房床墊、宿舍床墊、兒童床墊、露營睡墊、車宿床墊、沙發椅墊、瑜伽墊",
          "冰感記憶棉+高支撐泡棉，上層柔軟貼合，下層扎實支撐，剛剛好的舒適感",
          "透氣床罩，涼爽舒適，親膚柔和",
          "防滑床底套，要躺要坐都穩固不移位",
        ].map((f) => (
          <li key={f} style={{ fontSize: 14.5, color: "#444", lineHeight: 1.7 }}>{f}</li>
        ))}
      </ul>

      {/* Size display */}
      <div className="rounded-lg px-4 py-2.5" style={{ backgroundColor: "#f0f4fa", fontSize: 14, color: "#555" }}>
        尺寸：90 x 188 x 8 cm
      </div>

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
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
          <select
            className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#fff" }}
            defaultValue={variations[0]?.attributes[0]?.option ?? ""}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }}>
            {variations.map((v) => {
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

      <StickyCartBar productName="Nooz FlexiRest" subtitle="三折疊日式床墊"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
