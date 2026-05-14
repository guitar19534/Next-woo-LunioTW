/**
 * Desktop navigation — dropdown mega panel
 *
 * Panel width: ~680 px, positioned absolute below the hovered trigger <li>
 * Right column image updates smoothly when hovering each product link.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainMenu, productMenu } from "@/config/menu";

// ─── Types ────────────────────────────────────────────────────────────────────

type DropdownKey = "床墊" | "枕頭" | "寢具配件";

type CategoryDef = {
  label: string;
  labelEn: string;
  href: string;
  items: readonly { label: string; href: string }[];
};

// ─── Per-product preview images ───────────────────────────────────────────────
// Replace with real product photo paths once assets are ready.

const PRODUCT_IMAGES: Record<string, string> = {
  // 床墊
  "/product/lunio-latex-mattress":  "https://placehold.co/360x270/dde8f5/17284b?text=Gen4+石墨烯乳膠床墊",
  "/product/lunio-quantum":         "https://placehold.co/360x270/d8e5f2/17284b?text=Quantum+Max",
  "/shop/nooz-helix":            "https://placehold.co/360x270/d3e2f0/17284b?text=NOOZ+Helix",
  "/shop/nooz-sunset":           "https://placehold.co/360x270/cdd9ec/17284b?text=NOOZ+Sunset+Pro",
  "/shop/nooz-moonlight":        "https://placehold.co/360x270/c8d6e8/17284b?text=Moonlight+Plus",
  "/shop/category/topper":       "https://placehold.co/360x270/c2cedf/17284b?text=FlexiRest+Topper",
  // 枕頭
  "/shop/lunio-hypercool":       "https://placehold.co/360x270/d8e5f2/17284b?text=HyperCool+護頸枕",
  "/shop/lunio-icefit":          "https://placehold.co/360x270/d3e2f0/17284b?text=IceFit+SmartCurve",
  "/shop/lunio-embrace":         "https://placehold.co/360x270/cdd9ec/17284b?text=Embrace+擁抱枕",
  "/shop/lunio-nebula":          "https://placehold.co/360x270/c8d6e8/17284b?text=Nebula+記憶枕",
  "/shop/lunio-mercury":         "https://placehold.co/360x270/c2cedf/17284b?text=Mercury+石墨烯枕",
  // 寢具配件
  "/shop/lunio-snowweave":       "https://placehold.co/360x270/d3e2f0/17284b?text=SnowWeave+被套",
  "/shop/lunio-snowsilk":        "https://placehold.co/360x270/cdd9ec/17284b?text=SnowSilk+涼被",
  "/shop/lunio-protector":       "https://placehold.co/360x270/c8d6e8/17284b?text=SmartGuard+保潔墊",
  "/shop/tencel-bedsheet":       "https://placehold.co/360x270/c2cedf/17284b?text=天絲+床包組",
};

// ─── Default featured data per category (shown before any link is hovered) ───

const FEATURED: Record<DropdownKey, {
  imageSrc: string; badge: string; title: string; sub: string; price: string; href: string;
}> = {
  "床墊": {
    imageSrc: PRODUCT_IMAGES["/product/lunio-latex-mattress"],
    badge: "熱銷第一",
    title: "Gen4 石墨烯乳膠床墊",
    sub: "石墨烯 × 100% 天然乳膠 × 骨科醫師研發",
    price: "從 NT$28,800",
    href: "/product/lunio-latex-mattress",
  },
  "枕頭": {
    imageSrc: PRODUCT_IMAGES["/shop/lunio-hypercool"],
    badge: "顧客最愛",
    title: "HyperCool 智能護頸枕",
    sub: "冰涼凝膠 × 人體工學 × 雙面設計",
    price: "從 NT$1,790",
    href: "/shop/lunio-hypercool",
  },
  "寢具配件": {
    imageSrc: PRODUCT_IMAGES["/shop/tencel-bedsheet"],
    badge: "新品上架",
    title: "SnowWeave 智能天絲床包組",
    sub: "天絲纖維 × 全年溫度調節 × 親膚柔滑",
    price: "從 NT$2,490",
    href: "/shop/tencel-bedsheet",
  },
};

// ─── Static maps ──────────────────────────────────────────────────────────────

const DROPDOWNS: Record<DropdownKey, CategoryDef> = {
  "床墊": productMenu.mattresses,
  "枕頭": productMenu.pillows,
  "寢具配件": productMenu.bedding,
};

const FLAT_LINKS = (Object.entries(mainMenu) as [string, string][]).filter(
  ([key]) => !(key in DROPDOWNS)
);

// ─── Nav-link class builder ───────────────────────────────────────────────────

function navLinkClass(active: boolean, dark: boolean) {
  return cn(
    "flex items-center gap-[3px] h-[70px] px-3.5",
    "text-[15px] font-medium whitespace-nowrap select-none",
    "border-b-2 transition-colors duration-300",
    active
      ? "text-[#3c7ae4] border-[#3c7ae4]"
      : dark
        ? "text-white border-transparent hover:text-[#3c7ae4] hover:border-[#3c7ae4]"
        : "text-[#212020] border-transparent hover:text-[#3c7ae4] hover:border-[#3c7ae4]"
  );
}

// ─── Dropdown panel ───────────────────────────────────────────────────────────

function DropdownPanel({
  dropKey,
  category,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  dropKey: DropdownKey;
  category: CategoryDef;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const featured = FEATURED[dropKey];

  // ── Image crossfade state ────────────────────────────────────────────────
  const [displaySrc, setDisplaySrc] = React.useState(featured.imageSrc);
  const [visible, setVisible] = React.useState(true);
  const fadeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  // Reset image when panel opens for a new category
  React.useEffect(() => {
    setDisplaySrc(featured.imageSrc);
    setVisible(true);
  }, [featured.imageSrc]);

  function crossfadeTo(src: string) {
    if (src === displaySrc) return;
    clearTimeout(fadeTimer.current);
    setVisible(false);
    fadeTimer.current = setTimeout(() => {
      setDisplaySrc(src);
      setVisible(true);
    }, 130);
  }

  function handleLinkEnter(href: string) {
    const src = PRODUCT_IMAGES[href];
    if (src) crossfadeTo(src);
  }

  function handleLinkLeave() {
    crossfadeTo(featured.imageSrc);
  }

  return (
    <div
      role="menu"
      className="absolute top-full left-0 z-50 bg-white rounded-b-xl"
      style={{
        width: "680px",
        borderTop: "2px solid #3c7ae4",
        boxShadow: "0 10px 36px rgba(0,0,0,0.13)",
        animation: "dropdown-in 0.16s ease-out",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="px-6 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[16px] text-[#17284b]">{category.label}</span>
            <span className="uppercase tracking-[3px] text-[10px] font-medium text-gray-300">
              {category.labelEn}
            </span>
          </div>
          <Link
            href={category.href}
            className="flex items-center gap-1 text-[12.5px] font-medium text-[#3c7ae4] hover:text-[#17284b] transition-colors"
            onClick={onClose}
          >
            查看全部
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="border-t border-gray-100 mb-5" />

        {/* Content row: links + image card */}
        <div className="flex gap-5">

          {/* Left: product links */}
          <div className="flex-1 flex flex-col gap-0.5">
            {category.items
              .filter((item) => !item.label.endsWith("→"))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#f0f4fb] transition-colors duration-150"
                  onClick={onClose}
                  onMouseEnter={() => handleLinkEnter(item.href)}
                  onMouseLeave={handleLinkLeave}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150 group-hover:bg-[#3c7ae4]"
                    style={{ background: "#c8d5e8" }}
                  />
                  <span className="text-[13.5px] text-[#5F6062] group-hover:text-[#17284b] transition-colors duration-150 leading-snug">
                    {item.label}
                  </span>
                </Link>
              ))}

            {/* "查看全部 →" at bottom */}
            {category.items
              .filter((item) => item.label.endsWith("→"))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="flex items-center gap-1.5 px-3 py-2 mt-1.5 text-[12.5px] font-medium text-[#3c7ae4] hover:text-[#17284b] transition-colors"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-gray-100 flex-shrink-0 self-stretch" />

          {/* Right: product image — crossfades on link hover */}
          <div className="w-[240px] flex-shrink-0">
            <Link
              href={featured.href}
              className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200"
              onClick={onClose}
            >
              {/* Image with crossfade */}
              <div
                className="relative w-full overflow-hidden bg-[#f0f4fb]"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={displaySrc}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.15s ease",
                  }}
                  sizes="240px"
                />
              </div>

              {/* Card body */}
              <div className="px-3.5 py-3.5">
                <span
                  className="inline-block font-bold tracking-[2px] px-2 py-0.5 rounded-full mb-2"
                  style={{ fontSize: "9.5px", background: "#eef4ff", color: "#3c7ae4" }}
                >
                  {featured.badge}
                </span>
                <p className="font-bold text-[13.5px] text-[#17284b] leading-snug mb-1">
                  {featured.title}
                </p>
                <p className="text-[11px] text-gray-400 mb-2.5 leading-relaxed">
                  {featured.sub}
                </p>
                <p className="font-bold text-[14px] text-[#3c7ae4]">
                  {featured.price}
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DesktopMenu({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState<DropdownKey | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const openMenu = (key: DropdownKey) => {
    clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const cancelClose = () => clearTimeout(closeTimer.current);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav aria-label="主選單">
        <ul className="flex items-stretch m-0 p-0 list-none">

          {/* Dropdown triggers */}
          {(Object.entries(DROPDOWNS) as [DropdownKey, CategoryDef][]).map(([label, cat]) => {
            const isOpen = open === label;
            const active = isActive(cat.href) || isOpen;
            return (
              <li
                key={label}
                className="relative"
                onMouseEnter={() => openMenu(label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={navLinkClass(active, dark)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {label}
                  <ChevronDown
                    size={13}
                    className={cn(
                      "opacity-50 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <DropdownPanel
                    key={label}
                    dropKey={label}
                    category={cat}
                    onClose={() => setOpen(null)}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  />
                )}
              </li>
            );
          })}

          {/* Flat links */}
          {FLAT_LINKS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className={navLinkClass(isActive(href), dark)}>
                {label}
              </Link>
            </li>
          ))}

        </ul>
      </nav>
    </>
  );
}
