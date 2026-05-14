"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "1入": "饅頭枕 1入",
  "2入": "饅頭枕 2入",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>Q彈扎實支撐，翻身輕鬆</p>
        <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>泰國天然乳膠，Q彈扎實，支撐力十足</li>
          <li>天然防蟎抗菌，有效隔絕過敏原</li>
          <li>透氣散熱，整夜涼爽舒眠</li>
          <li>耐用壽命長，不易扁塌變形</li>
          <li>完美貼合頸椎曲線，減輕肩頸壓力</li>
          <li>柔軟彈性，翻身輕鬆不費力</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/pillowlatex/Size-and-weight_PC.webp" alt="天然乳膠枕尺寸" width={500} height={302} className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-y-2">
          <div><span style={{ color: "#9ca3af" }}>長度</span><p className="font-medium" style={{ color: NAVY }}>68 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>寬度</span><p className="font-medium" style={{ color: NAVY }}>42 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>高度</span><p className="font-medium" style={{ color: NAVY }}>10 cm</p></div>
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
        <li><strong>枕芯</strong>：100% 天然乳膠（泰國產）</li>
        <li><strong>枕套</strong>：棉質可拆洗枕套</li>
      </ul>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>枕套可機洗，水溫建議不超過30°C</li>
        <li>乳膠枕芯請勿機洗或直接日曬</li>
        <li>建議陰涼通風處晾乾</li>
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

export function PillowLatexPanel({ product, variations }: Props) {
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
          <span style={{ color: "#aaa" }}>Lunio 天然乳膠枕</span>
        </nav>
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Lunio 天然乳膠枕</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）{product.average_rating || "4.8"} 顆星</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>規格</span>
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
        </div>
      )}

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

      <StickyCartBar productName="Lunio 天然乳膠枕" subtitle=""
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
