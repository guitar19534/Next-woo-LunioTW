"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, X, ShoppingBag, User, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { productMenu, mainMenu } from "@/menu.config";
import { brandConfig } from "@/brand.config";

const DROPDOWN_KEYS = new Set(["床墊", "枕頭", "寢具配件"]);
const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const NAVY = "#17284b";
const BLUE = "#17569E";

export function MobileNav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const dropdowns = Object.values(productMenu);
  const flatLinks = (Object.entries(mainMenu) as [string, string][]).filter(
    ([key]) => !DROPDOWN_KEYS.has(key)
  );

  const close = () => { setOpen(false); setExpanded(null); };

  // Prevent body scroll when open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
          dark ? "text-white hover:bg-white/10" : "text-[#212020] hover:bg-gray-50"
        )}
        aria-label="開啟選單"
      >
        <Menu size={22} />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="選單"
        aria-modal="true"
        className="fixed top-0 left-0 h-full z-50 flex flex-col lg:hidden"
        style={{
          width: "min(85vw, 360px)",
          backgroundColor: "#fff",
          fontFamily: FONT,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.15)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid #f0f0f0" }}>
          <Link href="/" onClick={close}>
            <Image
              src={brandConfig.logo.src}
              alt={brandConfig.logo.alt}
              width={80} height={36}
              style={{ height: "36px", width: "auto" }}
            />
          </Link>
          <button
            type="button"
            onClick={close}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="關閉選單"
          >
            <X size={18} style={{ color: "#6b7280" }} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Section: 探索系列 */}
          <div className="pt-5 pb-2">
            <p className="px-5 mb-2 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#9ca3af" }}>探索系列</p>

            {dropdowns.map((cat) => (
              <div key={cat.label}>
                <button
                  type="button"
                  onClick={() => toggle(cat.label)}
                  className="w-full flex items-center justify-between px-5 py-3.5 transition-colors"
                  style={{ backgroundColor: expanded === cat.label ? "#f0f5ff" : "transparent" }}
                >
                  <span className="font-semibold" style={{ fontSize: 15, color: NAVY }}>
                    {cat.label}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{
                      color: BLUE,
                      transform: expanded === cat.label ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                {/* Sub-items */}
                {expanded === cat.label && (
                  <div className="pb-2" style={{ backgroundColor: "#f8faff" }}>
                    {/* View all */}
                    <Link
                      href={cat.href}
                      onClick={close}
                      className="flex items-center justify-between px-5 py-2.5"
                      style={{ borderBottom: "1px solid #e8eef8" }}
                    >
                      <span className="font-semibold" style={{ fontSize: 13, color: BLUE }}>
                        查看全部 {cat.label}
                      </span>
                      <ChevronRight size={13} style={{ color: BLUE }} />
                    </Link>
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className="flex items-center px-5 py-3 transition-colors hover:bg-blue-50"
                        style={{ borderBottom: "1px solid #f0f4fb" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full mr-3 flex-shrink-0"
                          style={{ backgroundColor: BLUE }}
                        />
                        <span style={{ fontSize: 13.5, color: "#374151" }}>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-5" style={{ borderTop: "1px solid #f0f0f0" }} />

          {/* Section: 更多 */}
          <div className="py-3">
            <p className="px-5 mb-2 mt-2 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#9ca3af" }}>更多</p>
            {flatLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={close}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <span style={{ fontSize: 15, color: NAVY, fontWeight: 500 }}>{label}</span>
                <ChevronRight size={15} style={{ color: "#d1d5db" }} />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-5" style={{ borderTop: "1px solid #f0f0f0" }} />

          {/* Section: 快速連結 */}
          <div className="py-4 px-4 grid grid-cols-2 gap-2.5">
            <Link href="/cart" onClick={close}
              className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition-colors hover:opacity-80"
              style={{ backgroundColor: "#f0f5ff" }}>
              <ShoppingBag size={20} style={{ color: BLUE }} />
              <span style={{ fontSize: 12.5, color: NAVY, fontWeight: 600 }}>購物車</span>
            </Link>
            <a
              href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/my-account`}
              className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition-colors hover:opacity-80"
              style={{ backgroundColor: "#f0f5ff" }}
            >
              <User size={20} style={{ color: BLUE }} />
              <span style={{ fontSize: 12.5, color: NAVY, fontWeight: 600 }}>我的帳戶</span>
            </a>
          </div>

          {/* Contact strip */}
          <div className="mx-4 mb-5 rounded-2xl px-4 py-3.5 flex items-center justify-between"
            style={{ backgroundColor: "#f9fafb", border: "1px solid #f0f0f0" }}>
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: BLUE }} />
              <span style={{ fontSize: 12.5, color: "#374151" }}>全台實體門市</span>
            </div>
            <Link href="/pages/contact" onClick={close}
              style={{ fontSize: 12, color: BLUE, fontWeight: 600 }}>
              查看位置 →
            </Link>
          </div>

        </div>

        {/* ── Footer CTA ── */}
        <div className="px-4 pb-6 pt-3 flex-shrink-0 space-y-2.5"
          style={{ borderTop: "1px solid #f0f0f0" }}>
          <Link
            href="/pages/contact"
            onClick={close}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY, fontSize: 14 }}
          >
            <MapPin size={15} />
            預約門市試躺
          </Link>
          <a
            href={`tel:${brandConfig.store?.phone ?? ""}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-medium transition-colors hover:bg-gray-50"
            style={{ fontSize: 13.5, color: NAVY, border: "1.5px solid #e5e7eb" }}
          >
            <Phone size={14} />
            聯繫客服
          </a>
        </div>

      </div>
    </>
  );
}
