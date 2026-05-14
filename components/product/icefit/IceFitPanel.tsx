"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "1入": "記憶枕 1入（5/28陸續出貨）",
  "2入": "記憶枕 2入（5/28陸續出貨）",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>一觸即涼×完美貼合頸部 ×柔滑親膚</p>
        <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>柔軟布料，一觸即涼，瞬間降溫 1～3°C</li>
          <li>凹型曲面，緊貼肩頸，給肩膀溫柔的擁抱</li>
          <li>雙面躺感，柔韌支撐或蓬鬆彈性，自在切換</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/smartcurve/Pillow-Dimension_Mercury-04.webp" alt="IceFit Smart Curve 枕頭尺寸" width={500} height={302} className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-y-2">
          <div><span style={{ color: "#9ca3af" }}>長度</span><p className="font-medium" style={{ color: NAVY }}>60 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>寬度</span><p className="font-medium" style={{ color: NAVY }}>43 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>高度</span><p className="font-medium" style={{ color: NAVY }}>19.5 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>重量</span><p className="font-medium" style={{ color: NAVY }}>2.23 kg</p></div>
        </div>
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
      <ul className="space-y-2.5" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li><strong>外層布料</strong>：530克/平方米，67%滌綸，31%聚乙烯，2%氨綸，白色圓針織布</li>
        <li><strong>邊框網布</strong>：440克/平方米，6%人造絲，94%滌綸，海軍藍</li>
        <li><strong>內層布料</strong>：140公克/平方米，灰色聚酯汗布</li>
      </ul>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>枕套可洗滌，水溫建議不超過30°C</li>
        <li>禁止使用漂白劑、扭乾、熨燙，以免布料變形</li>
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

export function IceFitPanel({ product, variations }: Props) {
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
    <div className="space-y-6">
      <div className="hidden lg:block space-y-4">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>Lunio IceFit Smart Curve 智能涼感護頸枕</span>
        </nav>
        <div>
          <p style={{ fontSize: 16, color: "#9ca3af" }}>Lunio IceFit</p>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Smart Curve</h1>
          <p style={{ fontSize: 18, color: "#9ca3af", marginTop: 2 }}>智能涼感護頸枕</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
        {variations.length > 0 ? (
          <select className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }}
            defaultValue={variations[0]?.attributes[0]?.option ?? ""}>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              return <option key={v.id} value={opt}>{VARIATION_LABELS[opt] ?? opt}</option>;
            })}
          </select>
        ) : (
          <span className="px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: "#ddd", color: NAVY }}>記憶枕 1入</span>
        )}
      </div>

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

      <StickyCartBar productName="Lunio IceFit Smart Curve" subtitle="智能涼感護頸枕"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
