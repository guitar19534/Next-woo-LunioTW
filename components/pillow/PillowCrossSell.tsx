"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAVY = "#17284b";
const BLUE = "#17569E";

const TABS = [
  {
    label: "產品類別",
    items: [
      { label: "雙人床墊", img: "/images/product/mattress-queen.webp", href: "/double-mattress" },
      { label: "單人床墊", img: "/images/product/mattress-single.webp", href: "/single-mattress" },
      { label: "天然乳膠床墊", img: "/images/product/mattress-latex.webp", href: "/latex-mattress" },
      { label: "獨立筒床墊", img: "/images/product/mattress-pocket.webp", href: "/pocket-spring-mattress" },
    ],
  },
  {
    label: "產品系列",
    items: [
      { label: "Lunio Gen4", img: "/gen4/Lunio-Gen4-Pro_26-1.webp", href: "/product/lunio-latex-mattress" },
      { label: "Quantum Max", img: "/qtm/Quantum-Max_15-1200_0.webp", href: "/product/lunio-quantum" },
      { label: "NOOZ Helix", img: "/helix/Helix-cover.webp", href: "/product/nooz-helix" },
      { label: "NOOZ Sunset Pro", img: "/images/nooz/sku_Sunset-Pro_compressed.webp", href: "/product/nooz-sunset" },
    ],
  },
  {
    label: "寢具配件",
    items: [
      { label: "天絲床包組", img: "/snowweave-bedding/PC_1-5.webp", href: "/product/tencel-bedsheet" },
      { label: "天絲被套", img: "/snowweave-blanket/PC1.webp", href: "/product/tencel-duvet-cover" },
      { label: "防水保潔墊", img: "/smartguard/Group-346.webp", href: "/product/lunio-protector" },
      { label: "智能涼被", img: "/snowsilk/Group-346.webp", href: "/product/lunio-snowsilk" },
    ],
  },
];

export function PillowCrossSell() {
  const [tab, setTab] = useState(0);
  const items = TABS[tab].items;
  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-6 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        {TABS.map((t, i) => (
          <button key={t.label} type="button" onClick={() => setTab(i)}
            className="pb-3 font-semibold transition-colors"
            style={{ fontSize: 14, color: i === tab ? BLUE : "#6b7280", borderBottom: i === tab ? `2px solid ${BLUE}` : "2px solid transparent", marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>
      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col items-center gap-2">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
              <Image src={item.img} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="25vw" />
            </div>
            <span className="text-sm font-medium text-center" style={{ color: NAVY }}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
