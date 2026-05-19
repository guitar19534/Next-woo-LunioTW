"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { AddToCartButton } from "@/components/shop";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

// ── แก้ข้อความ dropdown ที่นี่ ─────────────────────────────────────────────
// key = ชื่อ option ใน WooCommerce | value = ข้อความที่แสดงใน dropdown
const VARIATION_LABELS: Record<string, string> = {
  "標準單人":   "【標準單人】現折6,000 贈好眠套組",
  "單人加大":   "【單人加大】現折7,000 贈好眠套組",
  "標準雙人":   "【標準雙人】現折10,000 贈好眠套組",
  "雙人加大":   "【雙人加大】現折12,000 贈好眠套組",
  "雙人特大":   "【雙人特大】現折14,000 贈好眠套組",
};

// ── Countdown — 12-hour autoloop per session ─────────────────────────────────
const SESSION_KEY = "lunio_countdown_end";
const DURATION_MS = 12 * 60 * 60 * 1000;

function getOrCreateEndTime(): number {
  if (typeof window === "undefined") return Date.now() + DURATION_MS;
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const end = Date.now() + DURATION_MS;
  localStorage.setItem(SESSION_KEY, String(end));
  return end;
}

function Countdown() {
  const [time, setTime] = useState({ h: "12", m: "00", s: "00" });

  useEffect(() => {
    let end = getOrCreateEndTime();

    function tick() {
      if (Date.now() >= end) {
        end = Date.now() + DURATION_MS;
        localStorage.setItem(SESSION_KEY, String(end));
      }
      const diff = end - Date.now();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-4">
      {[{ val: time.h, label: "HRS" }, { val: time.m, label: "MINS" }, { val: time.s, label: "SECS" }].map(({ val, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-md font-bold text-white"
            style={{ width: "52px", height: "44px", backgroundColor: "#1a1a1a", fontSize: "22px", letterSpacing: "1px" }}
          >
            {val}
          </div>
          <span className="text-[10px] font-medium mt-1" style={{ color: "#888", letterSpacing: "1px" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Panel ────────────────────────────────────────────────────────────────

interface Props {
  product: Product;
  variations: ProductVariation[];
}

export function Gen4ProductPanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);

  const handleVariationChange = useCallback((v: ProductVariation | null) => {
    setSelectedVariation(v);
  }, []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  // Size label from selected variation
  const sizeLabel = selectedVariation
    ? selectedVariation.attributes.map((a) => a.option).join(" / ")
    : null;

  return (
    <div className="space-y-5">

      {/* Breadcrumb + Title + Rating — hidden on mobile (shown above gallery instead) */}
      <div className="hidden lg:block space-y-5">
        <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>{product.name}</span>
        </nav>
        <div>
          <h1 className="leading-tight mb-1" style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "#17284b", fontWeight: 600 }}>
            Lunio Gen4
          </h1>
          <p style={{ fontSize: "20px", color: "#aaa", fontWeight: 400 }}>石墨烯乳膠床墊</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span className="text-sm" style={{ color: "#555" }}>
            (Google 評論)床墊評價 {parseFloat(product.average_rating) > 0 ? product.average_rating : "4.8"}
          </span>
        </div>
      </div>

      {/* Promo box */}
      <div className="rounded-xl border p-4" style={{ borderColor: "#e0e0e0", backgroundColor: "#fafafa" }}>
        <p className="text-center text-sm font-medium mb-3" style={{ color: "#17284b", letterSpacing: "0.05em" }}>
          ✦ 藝人明星瘋搶全台 Top 1 石墨烯乳膠床墊 ✦
        </p>
        <p className="text-sm font-bold mb-2" style={{ color: "#e03c3c" }}>【官網限定優惠】</p>
        <p className="text-sm mb-1" style={{ color: "#444", lineHeight: 1.7 }}>
          🎁好康 1：買床即贈限量好眠套組(保潔墊 1 入＋天絲床包 1 入)
        </p>
        <p className="text-sm" style={{ color: "#444", lineHeight: 1.7 }}>
          🎁好康 2：限量【加購Mercury記憶枕買一送一】
        </p>
        <Countdown />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: "26px", color: "#1C46B4" }}>
          NT${Number(price).toLocaleString()}
        </span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: "16px", color: "#bbb" }}>
            NT${Number(regularPrice).toLocaleString()}
          </span>
        )}
      </div>

      {/* Size info from variation short_description */}
      {selectedVariation?.description && (
        <p className="text-sm" style={{ color: "#555" }}>
          {selectedVariation.description.replace(/<[^>]*>/g, "").trim()}
        </p>
      )}

      {/* Variation selector — แก้ข้อความ dropdown ที่ VARIATION_LABELS ด้านบนไฟล์ */}
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>選擇尺寸</span>
          <select
            className="flex-1 border rounded-lg px-3 py-2.5 text-sm"
            style={{ borderColor: "#ddd", color: "#17284b", backgroundColor: "#1c46b41a" }}
            onChange={(e) => {
              const v = variations.find((v) =>
                v.attributes.some((a) => a.option === e.target.value)
              ) ?? null;
              handleVariationChange(v);
            }}
            defaultValue=""
          >
            <option value="" disabled>請選取一個選項</option>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              const label = VARIATION_LABELS[opt] ?? opt;
              return <option key={v.id} value={opt}>{label}</option>;
            })}
          </select>
        </div>
      )}

      {/* Quantity + Buy */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium" style={{ color: "#555" }}>數量</span>
        <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: "#ddd" }}>
          <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>−</button>
          <span className="w-10 text-center text-sm font-medium" style={{ color: "#17284b" }}>{qty}</span>
          <button type="button" onClick={() => setQty(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>＋</button>
        </div>
        <button
          ref={ctaRef}
          type="button"
          disabled={adding}
          onClick={async () => {
            const id = selectedVariation?.id ?? product.id;
            setAdding(true);
            await addItem(id, qty);
            setAdding(false);
          }}
          className="flex-1 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "#1C46B4", fontSize: "16px", letterSpacing: "0.05em" }}
        >
          {adding ? "加入中..." : "立刻搶購"}
        </button>
      </div>

      {/* Service line */}
      <p className="text-xs" style={{ color: "#222" }}>
        本島免運＋15年保固＋分期0利率＋舊床處理＋寄倉服務
      </p>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "4px 0" }} />

      {/* Accordion */}
      <div style={{ borderColor: "#e5e7eb" }}>
        {[
          {
            title: "產品詳情",
            defaultOpen: true,
            content: (
              <div className="text-sm space-y-3" style={{ color: "#444", lineHeight: 1.85 }}>
                <p className="font-bold" style={{ color: "#17284b" }}>讓太空科技，成為守護脊椎的溫柔力量</p>
                <p>加厚乳膠 × 9 區支撐，貼合身形，軟硬適中，減輕腰酸背痛</p>
                <p>四倍太空科技溫控，維持床墊恆溫散熱，整夜涼爽不悶熱</p>
                <p>躺在 Gen4 上，腰背自然放鬆，肌肉慢慢卸下緊繃</p>
                <p>每天醒來，少一點疼痛，多一點自在</p>
                <ul className="space-y-2 mt-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
                  <li><strong>減緩腰酸背痛</strong>：與骨科醫師合作研發，9 區支撐精準貼合曲線，讓腰背真正放鬆</li>
                  <li><strong>散熱透氣</strong>：SmartTech 4倍太空溫控，整晚舒適不悶熱</li>
                  <li><strong>深度好眠</strong>：深層睡眠提升 33%，吸震降干擾，翻身不影響枕邊人</li>
                  <li><strong>換床單更輕鬆</strong>：無彈簧設計，床墊輕盈，女性一人也能輕鬆更換</li>
                </ul>
              </div>
            ),
          },
          {
            title: "床墊尺寸",
            defaultOpen: false,
            content: (
              <div className="text-sm" style={{ color: "#444", lineHeight: 1.8 }}>
                <ul className="space-y-1 mb-4" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
                  <li>3 尺床墊｜標準單人：89 x 188 x 24 cm</li>
                  <li>3.5 尺床墊｜單人加大：104 x 188 x 24 cm</li>
                  <li>5 尺床墊｜標準雙人：150 x 188 x 24 cm</li>
                  <li>6 尺床墊｜雙人加大：180 x 188 x 24 cm</li>
                  <li>6 x 7 尺床墊｜雙人特大：180 x 210 x 24 cm</li>
                </ul>
                <p style={{ color: "#888" }}>床墊尺寸因手工製作誤差正負2cm屬正常</p>
              </div>
            ),
          },
          {
            title: "運送方式",
            defaultOpen: false,
            content: (
              <div className="text-sm" style={{ color: "#444", lineHeight: 1.8 }}>
                <ul className="space-y-1 mb-4" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
                  <li>真空裝箱設計，安裝運送更簡單</li>
                  <li>全台本島免運費</li>
                  <li>免費搬上樓</li>
                  <li>可協助舊床處理</li>
                  <li>床墊可寄倉</li>
                  <li>12期0利率</li>
                </ul>
                <p style={{ color: "#888" }}>我們有兩種物流可以選擇（新竹物流 & 搬家公司），請先在結帳時確認詳細內容，再於訂單備註中告訴我們您的選擇</p>
              </div>
            ),
          },
          {
            title: "清潔保養",
            defaultOpen: false,
            content: (
              <div className="text-sm" style={{ color: "#444", lineHeight: 1.8 }}>
                <ol className="space-y-2 mb-4" style={{ paddingLeft: "1.4em", listStyleType: "decimal" }}>
                  <li>Lunio 床墊表布及內部結構皆為科技機能設計，不可拆洗，表布起毛球或線頭屬正常現象，不影響使用</li>
                  <li>為避免髒汙滲透與細菌滋生，建議搭配防水防<strong>蟎</strong>保潔墊與床包，並定期以吸塵器清潔表面、勤換床單</li>
                  <li>床墊長期使用後出現「2.5 公分內」的人體壓痕屬正常，建議每 3～6 個月，將床墊頭尾對調即可改善</li>
                  <li>乳膠床墊請避免曝曬於高溫或紫外線環境，以維持材質彈性與壽命</li>
                </ol>
                <p className="mb-3" style={{ color: "#555" }}>想了解更多清潔與保養技巧：</p>
                <p className="mb-1">
                  <a href="https://lunio.com.tw/blog/latex-mattress-cleaning/" target="_blank" rel="noopener noreferrer"
                    style={{ color: "#17569E" }}>
                    【乳膠床墊清潔及保養指南】
                  </a>
                </p>
                <p>
                  <a href="https://lunio.com.tw/blog/clean-mattress/" target="_blank" rel="noopener noreferrer"
                    style={{ color: "#17569E" }}>
                    【床墊清潔大揭秘：7技巧讓您不再與塵蟎髒污共眠】
                  </a>
                </p>
              </div>
            ),
          },
        ].map((item) => (
          <AccordionItem key={item.title} title={item.title} defaultOpen={item.defaultOpen}>
            {item.content}
          </AccordionItem>
        ))}
      </div>

      <StickyCartBar
        productName="Lunio Gen4"
        subtitle="石墨烯乳膠床墊"
        price={price}
        regularPrice={regularPrice}
        isOnSale={isOnSale}
        variations={variations}
        selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange}
        variationLabels={VARIATION_LABELS}
        onAddToCart={async () => {
          const id = selectedVariation?.id ?? product.id;
          setAdding(true);
          await addItem(id, qty);
          setAdding(false);
        }}
        adding={adding}
        triggerRef={ctaRef}
      />

    </div>
  );
}

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({ title, defaultOpen, children }: { title: string; defaultOpen: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: "#e5e7eb" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        style={{ fontSize: "15px", fontWeight: 700, color: "#515f8c" }}
      >
        {title}
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" aria-hidden
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
