"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "記憶枕 1入": "記憶枕 1入",
  "記憶枕 2入": "記憶枕 2入（優惠組）",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>石墨烯科技 × 三段高度任調 × 冷暖雙面任選</p>
        <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>三層枕芯設計，可自由調整枕頭高度</li>
          <li>石墨烯導熱科技，冬暖又夏涼</li>
          <li>冷凝凝膠結合記憶棉，持續涼感舒眠一整夜</li>
          <li>雙面皆可睡，恆溫或涼感，自由選擇</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/mercury/Pillow-Dimension_Mercury.webp" alt="Mercury 枕頭尺寸" width={400} height={300} className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-y-3">
          <div><span style={{ color: "#9ca3af" }}>高度</span><p className="font-medium" style={{ color: NAVY }}>12 cm（最高）</p></div>
          <div><span style={{ color: "#9ca3af" }}>寬度</span><p className="font-medium" style={{ color: NAVY }}>40 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>長度</span><p className="font-medium" style={{ color: NAVY }}>60 cm</p></div>
        </div>
        <p className="mt-3" style={{ fontSize: 13, color: "#9ca3af" }}>枕頭為可塑性材質，實際高度正負2cm屬正常</p>
      </div>
    ),
  },
  {
    title: "運送方式",
    content: <p style={{ fontSize: 14, color: "#374151" }}>單買配件統一使用新竹物流出貨</p>,
  },
  {
    title: "材質",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-2" style={{ color: NAVY }}>枕頭芯</p>
        <ol className="space-y-1.5 mb-4" style={{ paddingLeft: "1.2em", listStyleType: "decimal" }}>
          <li>Diamond Fusion® 記憶海綿（石墨注入記憶海綿）</li>
          <li>AdaptCore 記憶海綿（聚氨酯海綿/PU 海綿）</li>
          <li>AirGel 記憶海綿（冷凝膠注入記憶海綿）</li>
        </ol>
        <p className="font-bold mb-1" style={{ color: NAVY }}>內枕頭套</p>
        <p className="mb-4">100% 滌綸，無拉鍊</p>
        <p className="font-bold mb-1" style={{ color: NAVY }}>外枕頭套</p>
        <p>Space Eclipse 枕頭套，附拉鍊（人造絲纖維素纖維40% / 聚酯纖維60%）</p>
      </div>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>枕套不可洗滌，建議搭配枕頭套使用</li>
        <li>建議定期使用吸塵器，清除枕頭上的灰塵與毛屑</li>
      </ul>
    ),
  },
];

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-gray-100">
      {ACCORDION_ITEMS.map((item, i) => (
        <div key={i} className="border-b border-gray-100">
          <button type="button" onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-0 py-5 text-left">
            <span className="font-semibold" style={{ fontSize: 15, color: NAVY }}>{item.title}</span>
            <ChevronDown size={16} style={{ color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {open === i && <div className="pb-4">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

interface Props { product: Product; variations: ProductVariation[]; }

export function MercuryPanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const handleVariationChange = useCallback((v: ProductVariation | null) => setSelectedVariation(v), []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  return (
    <div className="space-y-6">
      {/* Desktop breadcrumb + title */}
      <div className="hidden lg:block space-y-4">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>Lunio Mercury 石墨烯機能記憶枕</span>
        </nav>
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Lunio Mercury</h1>
          <p style={{ fontSize: 18, color: "#9ca3af", marginTop: 2 }}>石墨烯機能記憶枕</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {parseFloat(product.average_rating) > 0 ? product.average_rating : "4.8"}</span>
        </div>
      </div>

      {/* Size note */}
      <p style={{ fontSize: 14, color: "#6b7280" }}>尺寸：60 x 40 x 12 (最高) cm</p>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

      {/* Variation */}
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
          <select className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }} defaultValue="">
            <option value="" disabled>請選取一個選項</option>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              return <option key={v.id} value={opt}>{VARIATION_LABELS[opt] ?? opt}</option>;
            })}
          </select>
        </div>
      )}

      {/* Qty + Buy */}
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

      <div className="h-px bg-gray-100" /><p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: "0.02em" }}>本島免運+門市試躺+專業服務</p>
      <Accordion />

      <StickyCartBar productName="Lunio Mercury" subtitle="石墨烯機能記憶枕"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
