"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

// ── แก้ข้อความ dropdown ที่นี่ ─────────────────────────────────────────────
const VARIATION_LABELS: Record<string, string> = {
  // ── 床墊單買 ──────────────────────────────────────────────────────────────
  "標準單人":               "【標準單人】現折10,000",
  "單人加大":               "【單人加大】現折11,000",
  "標準雙人":               "【標準雙人】現折12,000",
  "雙人加大":               "【雙人加大】現折15,000",
  "雙人特大":               "【雙人特大】現折15,000",
  // ── 床墊＋記憶枕買1送1 ────────────────────────────────────────────────────
  "標準單人+記憶枕買1送1":  "【標準單人】＋記憶枕買1送1 現折16,780",
  "單人加大+記憶枕買1送1":  "【單人加大】＋記憶枕買1送1 現折17,780",
  "標準雙人+記憶枕買1送1":  "【標準雙人】＋記憶枕買1送1 現折18,780",
  "雙人加大+記憶枕買1送1":  "【雙人加大】＋記憶枕買1送1 現折21,780",
  "雙人特大+記憶枕買1送1":  "【雙人特大】＋記憶枕買1送1 現折21,780",
};

// ── Countdown — 12-hour autoloop ─────────────────────────────────────────────
const SESSION_KEY = "lunio_qtm_countdown_end";
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

interface Props {
  product: Product;
  variations: ProductVariation[];
}

export function QTMProductPanel({ product, variations }: Props) {
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

  return (
    <div className="space-y-5">

      {/* Breadcrumb + Title — desktop only */}
      <div className="hidden lg:block space-y-5">
        <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>{product.name}</span>
        </nav>
        <div>
          <h1 className="leading-tight mb-1" style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "#17284b", fontWeight: 600 }}>
            Lunio Quantum Max
          </h1>
          <p style={{ fontSize: "20px", color: "#aaa", fontWeight: 400 }}>高碳錳乳膠獨立筒</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span className="text-sm" style={{ color: "#555" }}>
            (Google 評論)床墊評價 {product.average_rating || "4.8"}
          </span>
        </div>
      </div>

      {/* Promo box */}
      <div className="rounded-xl border p-4" style={{ borderColor: "#e0e0e0", backgroundColor: "#fafafa" }}>
        <p className="text-sm font-bold mb-2" style={{ color: "#e03c3c" }}>【官網限定優惠】</p>
        <p className="text-sm mb-1" style={{ color: "#444", lineHeight: 1.7 }}>
          🎁 好康一：加購記憶枕買一送一
        </p>
        <p className="text-sm" style={{ color: "#444", lineHeight: 1.7 }}>
          🎁 🎁 好康二：限100組：標準雙人床＋天絲床包（含床包、枕套)＋天絲保潔墊＋工學枕2
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

      {selectedVariation?.description && (
        <p className="text-sm" style={{ color: "#555" }}>
          {selectedVariation.description.replace(/<[^>]*>/g, "").trim()}
        </p>
      )}

      {/* Variation selector */}
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

      {/* Qty + Buy */}
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

      <p className="text-xs" style={{ color: "#222" }}>
        本島免運＋15年保固＋分期0利率＋舊床處理＋寄倉服務
      </p>

      <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "4px 0" }} />

      {/* Accordion */}
      <div>
        {[
          {
            title: "產品詳情",
            defaultOpen: true,
            content: (
              <div className="text-sm space-y-3" style={{ color: "#444", lineHeight: 1.85 }}>
                <p><strong>即便枕邊人在翻身，你的夢境依然安穩</strong> Quantum Max 疊加「三重減震」設計 加厚天絲表布、天然乳膠、五區獨立筒，Q 彈偏硬 讓枕邊的翻身不打擾你的美夢</p>
                <ul className="space-y-2 mt-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
                  <li><strong>柔軟天絲，靜音微涼</strong>：蓬鬆柔軟帶微涼，降低翻身噪音，整晚安穩舒適</li>
                  <li><strong>天然乳膠，Q 彈支撐</strong>：不軟不硬，貼合身形又不深陷</li>
                  <li><strong>雙層石墨烯，冬暖夏涼</strong>：高效導熱，整晚維持恆溫舒適</li>
                  <li><strong>五區獨立筒，腰背服貼</strong>：均勻支撐脊椎，全身放鬆伸展</li>
                  <li><strong>德國科技散熱</strong>：帶走體溫蓄熱，整夜乾爽不悶熱</li>
                  <li><strong>石墨烯床沿加固：既好睡</strong>，也好坐，上下床更輕鬆（非傳統硬式彈簧）</li>
                  <li><strong>側睡不壓肩</strong>：肩膀減壓設計，側睡更放鬆</li>
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
                  <li>6 X 7 尺床墊｜雙人特大：180 x 210 x 24 cm</li>
                </ul>
                <p style={{ color: "#444" }}>床墊尺寸因手工製作誤差正負2cm屬正常</p>
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
                <p style={{ color: "#444" }}>我們有兩種物流可以選擇（新竹物流 &amp; 搬家公司），請先在結帳時確認詳細內容，再於訂單備註中告訴我們您的選擇</p>
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
                  <li>為避免髒汙滲透與細菌滋生，建議搭配防水防蟎保潔墊與床包，並定期以吸塵器清潔表面、勤換床單</li>
                  <li>床墊長期使用後出現「2.5 公分內」，的人體壓痕屬正常，建議每 3～6 個月，將床墊頭尾對調即可改善</li>
                  <li>乳膠床墊請避免曝曬於高溫或紫外線環境，以維持材質彈性與壽命</li>
                </ol>
                <p className="mb-3" style={{ color: "#555" }}>想了解更多清潔與保養技巧：</p>
                <p className="mb-1">
                  <a href="https://lunio.com.tw/blog/latex-mattress-cleaning/" target="_blank" rel="noopener noreferrer" style={{ color: "#17569E" }}>
                    【乳膠床墊清潔及保養指南】
                  </a>
                </p>
                <p>
                  <a href="https://lunio.com.tw/blog/clean-mattress/" target="_blank" rel="noopener noreferrer" style={{ color: "#17569E" }}>
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
        productName="Lunio Quantum Max"
        subtitle="高碳錳乳膠獨立筒"
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
