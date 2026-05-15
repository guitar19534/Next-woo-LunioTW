"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainMenu, productMenu, storeMenu, aboutMenu, mattressMenuExtra, pillowMenuExtra } from "@/menu.config";

type DropdownKey = "床墊" | "枕頭" | "寢具配件";
type SimpleDropdownKey = "門市試躺" | "關於Lunio";
type CategoryDef = {
  label: string; labelEn: string; href: string;
  items: readonly { label: string; href: string }[];
};

// ── Full product data for right card (image + info) ──────────────────────────
type ProductCard = {
  imageSrc: string; badge: string; title: string; sub: string; price: string; href: string;
};

const PRODUCT_DATA: Record<string, ProductCard> = {
  // 床墊
  "/product/lunio-latex-mattress": {
    imageSrc: "/gen4/Lunio-Gen4-Pro_26-1.webp", badge: "熱銷第一",
    title: "Gen4 石墨烯乳膠床墊", sub: "石墨烯 × 100% 天然乳膠 × 骨科醫師研發",
    price: "從 NT$28,800", href: "/product/lunio-latex-mattress",
  },
  "/product/lunio-quantum": {
    imageSrc: "/qtm/Quantum-Max_15-1200_0.webp", badge: "新品推薦",
    title: "Quantum Max 乳膠獨立筒", sub: "高碳錳鋼獨立筒 × 100% 天然乳膠 × 9區支撐",
    price: "從 NT$24,800", href: "/product/lunio-quantum",
  },
  "/product/nooz-helix": {
    imageSrc: "/helix/Helix-cover.webp", badge: "CP值超高",
    title: "NOOZ Helix 乳膠獨立筒", sub: "天然乳膠 × 獨立筒 × 五星飯店躺感",
    price: "從 NT$4,720", href: "/product/nooz-helix",
  },
  "/product/nooz-sunset": {
    imageSrc: "/images/nooz/sku_Sunset-Pro_compressed.webp", badge: "腰背首選",
    title: "NOOZ Sunset Pro 乳膠床墊", sub: "100% 天然乳膠 × 活性碳支撐層 × 硬床首選",
    price: "從 NT$4,720", href: "/product/nooz-sunset",
  },
  "/product/nooz-moonlight": {
    imageSrc: "/images/nooz/sku_Moonlight-Plus_compressed.webp", badge: "涼感必備",
    title: "NOOZ Moonlight Plus 記憶床墊", sub: "冷凝記憶層 × 整夜清爽透氣",
    price: "從 NT$3,672", href: "/product/nooz-moonlight",
  },
  "/topper": {
    imageSrc: "/images/nooz/sku_Topper_compressed.webp", badge: "輕巧好搬",
    title: "FlexiRest Topper 日式薄墊", sub: "雙面軟硬翻轉 × 收納方便 × 宿舍必備",
    price: "從 NT$1,890", href: "/topper",
  },
  // 枕頭
  "/product/lunio-hypercool": {
    imageSrc: "/hypercool/cover_HyperCool-PC.webp", badge: "顧客最愛",
    title: "HyperCool 智能工學護頸枕", sub: "冰涼凝膠 × 人體工學 × 雙面設計",
    price: "從 NT$1,790", href: "/product/lunio-hypercool",
  },
  "/product/lunio-icefit": {
    imageSrc: "/smartcurve/cover_SmartCurve.webp", badge: "",
    title: "IceFit SmartCurve 涼感護頸枕", sub: "涼感纖維 × 曲線支撐 × 側睡仰睡",
    price: "從 NT$1,290", href: "/product/lunio-icefit",
  },
  "/product/lunio-nebula": {
    imageSrc: "/hypercool/Hypercool.webp", badge: "",
    title: "Nebula 經典記憶枕", sub: "記憶海綿 × 透氣設計 × 舒壓釋重",
    price: "從 NT$590", href: "/product/lunio-nebula",
  },
  // 寢具配件
  "/product/lunio-snowweave": {
    imageSrc: "/snowweave/SnowWeave-Cartoon.webp", badge: "新品上架",
    title: "SnowWeave 智能天絲被套", sub: "天絲纖維 × 全年溫度調節 × 親膚柔滑",
    price: "從 NT$2,490", href: "/product/lunio-snowweave",
  },
  "/product/tencel-bedsheet": {
    imageSrc: "/snowweave/Benefit1.webp", badge: "",
    title: "SnowWeave 天絲床包組", sub: "天絲 × 親膚柔滑 × 多尺寸",
    price: "從 NT$1,290", href: "/product/tencel-bedsheet",
  },
};

// Alias for crossfade image lookup (kept for backwards compat)
const PRODUCT_IMAGES = Object.fromEntries(
  Object.entries(PRODUCT_DATA).map(([k, v]) => [k, v.imageSrc])
);

// ── Default featured card per category ───────────────────────────────────────
const FEATURED: Record<DropdownKey, ProductCard> = {
  "床墊":    PRODUCT_DATA["/product/lunio-latex-mattress"],
  "枕頭":    PRODUCT_DATA["/product/lunio-hypercool"],
  "寢具配件": PRODUCT_DATA["/product/lunio-snowweave"],
};

const DROPDOWNS: Record<DropdownKey, CategoryDef> = {
  "床墊": productMenu.mattresses,
  "枕頭": productMenu.pillows,
  "寢具配件": productMenu.bedding,
};

type ExtraCol = { items: readonly { label: string; href: string }[] };
const EXTRA_COLUMNS: Partial<Record<DropdownKey, readonly ExtraCol[]>> = {
  "床墊": mattressMenuExtra,
  "枕頭": pillowMenuExtra,
};

// Items that should show a NEW badge
const NEW_BADGE_HREFS = new Set(["/product/lunio-hypercool"]);

const SIMPLE_DROPDOWNS_KEYS = new Set<string>(["門市試躺", "關於Lunio"]);

const FLAT_LINKS = (Object.entries(mainMenu) as [string, string][]).filter(
  ([key]) => !(key in DROPDOWNS) && !SIMPLE_DROPDOWNS_KEYS.has(key)
);

// ── Nav link style ─────────────────────────────────────────────────────────────
function navLinkClass(active: boolean, dark: boolean) {
  return cn(
    "flex items-center gap-1 h-[70px] px-5",
    "text-[14.5px] font-medium whitespace-nowrap select-none tracking-normal",
    "border-b-2 transition-colors duration-300",
    active
      ? "text-[#3c7ae4] border-[#3c7ae4]"
      : dark
        ? "text-white border-transparent hover:text-[#3c7ae4] hover:border-[#3c7ae4]"
        : "text-[#212020] border-transparent hover:text-[#3c7ae4] hover:border-[#3c7ae4]"
  );
}

// ── Product link with optional thumbnail ──────────────────────────────────────
function ProductLink({
  item, isNew, onClose, onEnter, onLeave,
}: {
  item: { label: string; href: string };
  isNew?: boolean;
  onClose: () => void;
  onEnter: (href: string) => void;
  onLeave: () => void;
}) {
  const isViewAll = item.label.endsWith("→");

  if (isViewAll) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-1.5 px-3 py-2 mt-1 text-[12.5px] font-medium text-[#3c7ae4] hover:text-[#17284b] transition-colors"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#f0f4fb] transition-colors duration-150"
      onClick={onClose}
      onMouseEnter={() => onEnter(item.href)}
      onMouseLeave={onLeave}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150 group-hover:bg-[#3c7ae4]"
        style={{ background: "#c8d5e8" }}
      />
      <span className="text-[13.5px] text-[#5F6062] group-hover:text-[#17284b] transition-colors duration-150 leading-snug">
        {item.label}
      </span>
      {isNew && (
        <span style={{ fontSize: 9, fontWeight: 700, background: "#f5892a", color: "#fff", padding: "2px 6px", borderRadius: 4, letterSpacing: "0.5px", flexShrink: 0 }}>
          NEW
        </span>
      )}
    </Link>
  );
}

// ── Dropdown panel ─────────────────────────────────────────────────────────────
function DropdownPanel({
  dropKey, category, extraColumns, onClose, onMouseEnter, onMouseLeave,
}: {
  dropKey: DropdownKey; category: CategoryDef;
  extraColumns?: readonly ExtraCol[];
  onClose: () => void; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const defaultCard = FEATURED[dropKey];
  const [card, setCard] = React.useState<ProductCard>(defaultCard);
  const [visible, setVisible] = React.useState(true);
  const [offsetX, setOffsetX] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const fadeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useLayoutEffect(() => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const overflow = rect.right - window.innerWidth + 16;
    const next = overflow > 0 ? -overflow : 0;
    setOffsetX((prev) => (prev === next ? prev : next));
  }, []);

  React.useEffect(() => {
    setCard(defaultCard);
    setVisible(true);
  }, [defaultCard]);

  function crossfadeTo(next: ProductCard) {
    if (next.href === card.href) return;
    clearTimeout(fadeTimer.current);
    setVisible(false);
    fadeTimer.current = setTimeout(() => { setCard(next); setVisible(true); }, 130);
  }

  function handleLinkEnter(href: string) {
    const data = PRODUCT_DATA[href];
    if (data) crossfadeTo(data);
  }

  function handleLinkLeave() {
    crossfadeTo(defaultCard);
  }

  return (
    <div
      ref={panelRef}
      role="menu"
      className="absolute top-full left-0 z-50 bg-white"
      style={{
        width: extraColumns?.length ? `${720 + extraColumns.length * 170}px` : "720px",
        borderRadius: "0 0 16px 16px",
        borderTop: "2.5px solid #3c7ae4",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
        animation: "dropdown-in 0.16s ease-out",
        letterSpacing: "1px",
        transform: offsetX ? `translateX(${offsetX}px)` : undefined,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[16px] text-[#17284b]">{category.label}</span>
            <span className="uppercase tracking-[2px] text-[10px] font-medium text-gray-300">
              {category.labelEn}
            </span>
          </div>
          <Link
            href={category.href}
            className="flex items-center gap-1 text-[12px] font-medium text-[#3c7ae4] hover:text-[#17284b] transition-colors px-3 py-1.5 rounded-full hover:bg-[#f0f4fb]"
            onClick={onClose}
          >
            查看全部
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="border-t border-gray-100 mb-4" />

        {/* Content: links + featured card */}
        <div className="flex gap-4">

          {/* Col 1: product links */}
          <div className="flex-1 flex flex-col gap-0.5 min-w-0">
            {category.items.map((item) => (
              <ProductLink
                key={item.href}
                item={item}
                isNew={NEW_BADGE_HREFS.has(item.href)}
                onClose={onClose}
                onEnter={handleLinkEnter}
                onLeave={handleLinkLeave}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-100 flex-shrink-0" />

          {/* Extra columns */}
          {extraColumns?.map((col, ci) => (
            <React.Fragment key={ci}>
              <div className="flex flex-col gap-0.5" style={{ minWidth: 150 }}>
                {col.items.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#f0f4fb] transition-colors duration-150 group"
                    onClick={onClose}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-[#3c7ae4] transition-colors" style={{ background: "#c8d5e8" }} />
                    <span className="text-[13.5px] text-[#5F6062] group-hover:text-[#17284b] transition-colors leading-snug">{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="w-px bg-gray-100 flex-shrink-0" />
            </React.Fragment>
          ))}

          {/* Right: featured card */}
          <div className="w-[240px] flex-shrink-0">
            <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[1px] mb-3 px-1">精選推薦</p>
            <Link
              href={card.href}
              className="group block rounded-2xl overflow-hidden border border-gray-100 hover:border-[#c8d8f5] hover:shadow-[0_6px_24px_rgba(60,122,228,0.12)] transition-all duration-200"
              onClick={onClose}
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden bg-[#f5f7fb]" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  className="object-cover"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s ease" }}
                  sizes="240px"
                />
                {card.badge && (
                  <span
                    className="absolute top-2.5 left-2.5 font-bold tracking-[1.5px] px-2.5 py-1 rounded-full"
                    style={{ fontSize: "9px", background: "#3c7ae4", color: "#fff" }}
                  >
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Card body — fades with image */}
              <div className="px-3.5 py-3" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s ease" }}>
                <p className="font-bold text-[13.5px] text-[#17284b] leading-snug mb-1 group-hover:text-[#3c7ae4] transition-colors">
                  {card.title}
                </p>
                <p className="text-[11px] text-gray-400 mb-2.5 leading-relaxed">
                  {card.sub}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[14px] text-[#3c7ae4]">{card.price}</p>
                  <span className="text-[11px] text-[#3c7ae4] group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Store mega-dropdown ───────────────────────────────────────────────────────
const STORE_CARDS = [
  { name: "台北門市",      addr: "台北市大安區敦化南路一段176號", img: "/storefront/taipei-store_202508.jpg",      href: "/storefront/taipei" },
  { name: "桃園門市",      addr: "桃園市桃園區正光路393號1樓",   img: "/storefront/Taoyuan-storefront (1).jpg",   href: "/storefront/taoyuan" },
  { name: "新竹新生活門市", addr: "新竹縣竹北市文興路43號",       img: "/storefront/hsinchu-store (1).jpg",        href: "/storefront/hsinchu" },
  { name: "台中門市",      addr: "台中市北屯區文心路三段405號",  img: "/storefront/Taichung-store.jpg",           href: "/storefront/taichung" },
  { name: "台南旗艦店",    addr: "台南市安平區文平路278號",      img: "/storefront/DreamLands-store.jpg",         href: "/storefront/tainan" },
  { name: "高雄旗艦店",    addr: "高雄市鼓山區馬卡道路406號",   img: "/storefront/Lunio高雄門市.webp",           href: "/storefront/kaohsiung" },
];

function StoreDropdownPanel({
  onClose, onMouseEnter, onMouseLeave,
}: { onClose: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      role="menu"
      className="absolute top-full left-0 z-50 bg-white"
      style={{
        width: 760,
        borderRadius: "0 0 16px 16px",
        borderTop: "2.5px solid #3c7ae4",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
        animation: "dropdown-in 0.16s ease-out",
        letterSpacing: "1px",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[16px] text-[#17284b]">門市試躺</span>
            <span className="uppercase tracking-[2px] text-[10px] font-medium text-gray-300">Stores</span>
          </div>
          <Link href="/storefront"
            className="flex items-center gap-1 text-[12px] font-medium text-[#3c7ae4] hover:text-[#17284b] transition-colors px-3 py-1.5 rounded-full hover:bg-[#f0f4fb]"
            onClick={onClose}>
            查看全部門市
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="border-t border-gray-100 mb-4" />

        {/* Store grid */}
        <div className="grid grid-cols-3 gap-3">
          {STORE_CARDS.map((s) => (
            <Link key={s.href} href={s.href} onClick={onClose}
              className="group flex flex-col overflow-hidden rounded-xl hover:shadow-md transition-all duration-200"
              style={{ border: "1px solid #f0f4fb" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image src={s.img} alt={s.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="200px" />
              </div>
              <div className="p-2.5">
                <p className="font-semibold text-[13px] text-[#17284b] group-hover:text-[#3c7ae4] transition-colors leading-tight">{s.name}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug line-clamp-2">{s.addr}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[12px] text-gray-400">全台 6 間門市，每日 11:00–20:00</p>
          <Link href="/storefront#booking" onClick={onClose}
            className="px-4 py-2 rounded-full text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#f5a000" }}>
            🗓 立即預約試躺
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Simple dropdown (about) ───────────────────────────────────────────────────
function SimpleDropdownPanel({
  items, onClose, onMouseEnter, onMouseLeave,
}: {
  items: readonly { label: string; href: string }[];
  onClose: () => void; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  return (
    <div
      role="menu"
      className="absolute top-full left-0 z-50 bg-white"
      style={{
        minWidth: 200,
        borderRadius: "0 0 14px 14px",
        borderTop: "2.5px solid #3c7ae4",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
        animation: "dropdown-in 0.16s ease-out",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#f0f4fb] transition-colors duration-150"
            onClick={onClose}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c8d5e8" }} />
            <span className="text-[13.5px] text-[#5F6062] hover:text-[#17284b] transition-colors leading-snug">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


// ── Main component ─────────────────────────────────────────────────────────────
export function DesktopMenu({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState<DropdownKey | null>(null);
  const [openSimple, setOpenSimple] = React.useState<SimpleDropdownKey | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const openMenu = (key: DropdownKey) => { clearTimeout(closeTimer.current); setOpen(key); setOpenSimple(null); };
  const openSimpleMenu = (key: SimpleDropdownKey) => { clearTimeout(closeTimer.current); setOpenSimple(key); setOpen(null); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => { setOpen(null); setOpenSimple(null); }, 150); };
  const cancelClose = () => clearTimeout(closeTimer.current);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav aria-label="主選單">
        <ul className="flex items-stretch m-0 p-0 list-none">

          {(Object.entries(DROPDOWNS) as [DropdownKey, CategoryDef][]).map(([label, cat]) => {
            const isOpen = open === label;
            const active = isActive(cat.href) || isOpen;
            return (
              <li key={label} className="relative" onMouseEnter={() => openMenu(label)} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  className={navLinkClass(active, dark)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {label}
                  <ChevronDown size={13} className={cn("opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>

                {isOpen && (
                  <DropdownPanel
                    key={label}
                    dropKey={label}
                    category={cat}
                    extraColumns={EXTRA_COLUMNS[label]}
                    onClose={() => setOpen(null)}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  />
                )}
              </li>
            );
          })}

          {/* 門市試躺 — store mega dropdown */}
          {(() => {
            const isOpen = openSimple === "門市試躺";
            const active = isActive(storeMenu.href) || isOpen;
            return (
              <li className="relative" onMouseEnter={() => openSimpleMenu("門市試躺")} onMouseLeave={scheduleClose}>
                <button type="button" className={navLinkClass(active, dark)} aria-expanded={isOpen} aria-haspopup="true">
                  門市試躺
                  <ChevronDown size={13} className={cn("opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <StoreDropdownPanel
                    onClose={() => setOpenSimple(null)}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  />
                )}
              </li>
            );
          })()}

          {/* 關於Lunio — simple dropdown */}
          {(() => {
            const isOpen = openSimple === "關於Lunio";
            const active = isActive(aboutMenu.href) || isOpen;
            return (
              <li className="relative" onMouseEnter={() => openSimpleMenu("關於Lunio")} onMouseLeave={scheduleClose}>
                <button type="button" className={navLinkClass(active, dark)} aria-expanded={isOpen} aria-haspopup="true">
                  關於Lunio
                  <ChevronDown size={13} className={cn("opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <SimpleDropdownPanel
                    items={aboutMenu.items}
                    onClose={() => setOpenSimple(null)}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  />
                )}
              </li>
            );
          })()}

          {FLAT_LINKS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className={navLinkClass(isActive(href), dark)}>{label}</Link>
            </li>
          ))}

        </ul>
      </nav>
    </>
  );
}
