"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "1入": "記憶枕 1入（6/12陸續出貨）",
  "2入": "記憶枕 2入（56/12陸續出貨）",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>蝶形輪廓 × 凹槽貼合 × 柔軟竹纖維</p>
        <div className="space-y-1.5">
          <p>躺下時，頭部自然落進中間的凹槽</p>
          <p>兩側微微抬高的弧度，穩穩托住頸部與肩膀</p>
          <p>讓你都能找到剛剛好的舒服位置</p>
        </div>
        <div className="space-y-1.5 mt-4">
          <p>蝴蝶枕套是柔軟的竹纖維材質</p>
          <p>觸感細緻、透氣清爽，拆洗也方便</p>
          <p>適合第一次嘗試工學枕，為日常睡眠，換一點更好的感受</p>
        </div>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/butterfly/BTF-Dimension-PC.webp" alt="Butterfly 枕頭尺寸" width={500} height={264} className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-y-2">
          <p>高度：11 / 6 cm</p>
          <p>寬度：35 cm</p>
          <p>長度：60 cm</p>
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
      <ul className="space-y-2.5" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>枕芯：記憶棉</li>
        <li>內枕套：100%聚酯纖維</li>
        <li>外枕套：竹纖維枕套（60% 聚酯纖維 / 40% 竹纖維黏膠）</li>
      </ul>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>記憶枕芯不可下水洗滌。</li>
        <li>外層枕套可拆洗，水溫建議不超過30°C</li>
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

export function ButterflyPanel({ product, variations }: Props) {
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
          <span style={{ color: "#aaa" }}>Nooz Ergo Butterfly 蝶形記憶枕</span>
        </nav>
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Nooz Ergo Butterfly</h1>
          <p style={{ fontSize: 18, color: "#9ca3af", marginTop: 2 }}>蝶形記憶枕</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
        </div>
      </div>

      <p style={{ fontSize: 14, color: "#6b7280" }}>尺寸：長60×寬35×高11/6 cm</p>

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
            }} defaultValue={variations[0]?.attributes[0]?.option ?? ""}>
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

      <div className="h-px bg-gray-100" /><p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: "0.02em" }}>本島免運+專業服務</p>
      <Accordion />

      <StickyCartBar productName="Nooz Ergo Butterfly" subtitle="蝶形記憶枕"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
