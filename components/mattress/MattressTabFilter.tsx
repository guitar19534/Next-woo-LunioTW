"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAVY = "#17284b";
const BLUE = "#3c7ae4";

const TABS = ["產品類別", "產品系列", "寢具配件"] as const;
type Tab = typeof TABS[number];

const CATEGORIES: Record<Tab, { src: string; label: string; href: string }[]> = {
  產品類別: [
    { src: "/mattress/雙人床墊.webp",             label: "雙人床墊",     href: "#products" },
    { src: "/mattress/小房間適用單人床.webp",       label: "單人床墊",     href: "#products" },
    { src: "/mattress/Lunio-Gen4-Pro_26.webp",    label: "天然乳膠床墊", href: "/product/lunio-latex-mattress" },
    { src: "/mattress/Helix-3.webp",              label: "獨立筒床墊",   href: "/product/nooz-helix" },
  ],
  產品系列: [
    { src: "/mattress/All-brand-logo.webp",       label: "所有床墊",     href: "#products" },
    { src: "/mattress/G4_KV8.webp",               label: "Lunio 床墊",   href: "/product/lunio-latex-mattress" },
    { src: "/mattress/Helix-3 (1).webp",          label: "Nooz 床墊",    href: "/product/nooz-helix" },
  ],
  寢具配件: [
    { src: "/mattress/cover_Mercury.webp",      label: "枕頭",      href: "/product/pillows" },
    { src: "/mattress/cover_HyperCool-PC.webp", label: "記憶枕",    href: "/product/lunio-mercury" },
    { src: "/mattress/cover_Protector.webp",    label: "保潔墊",    href: "/product/lunio-protector" },
    { src: "/mattress/cover_Snow-Weave.webp",   label: "天絲床包組", href: "/product/tencel-bedsheet" },
  ],
};

export default function MattressTabFilter() {
  const [active, setActive] = useState<Tab>("產品類別");
  const items = CATEGORIES[active];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e4e8f0", marginBottom: 28, gap: 0 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              padding: "12px 28px",
              fontSize: "clamp(13px,1.1vw,15px)",
              fontWeight: active === t ? 700 : 500,
              color: active === t ? BLUE : "#666",
              background: "none",
              border: "none",
              borderBottom: active === t ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "color 0.2s",
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Category grid */}
      <div
        className={`grid gap-4 ${items.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}
        style={{ maxWidth: items.length === 3 ? 600 : 800 }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                border: "1px solid #e4e8f0",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              className="hover-cat-img"
            >
              <Image src={item.src} alt={item.label} fill className="object-cover" sizes="160px" />
            </div>
            <p style={{ fontSize: "clamp(12px,1vw,14px)", fontWeight: 600, color: NAVY, textAlign: "center" }}>
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      <style>{`
        .hover-cat-img:hover { box-shadow: 0 6px 20px rgba(60,122,228,0.15); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
