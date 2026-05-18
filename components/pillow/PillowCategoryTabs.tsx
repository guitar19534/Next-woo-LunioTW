"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BLUE = "#17569E";
const NAVY = "#17284b";

interface Cat { label: string; img: string; href: string; }

const DEFAULT_CATS: Cat[] = [
  { label: "蝶形記憶枕", img: "/butterfly/Group-346.webp", href: "/product/nooz-butterfly" },
  { label: "涼感記憶枕", img: "/smartcurve/Group-346.webp", href: "/product/lunio-icefit" },
  { label: "護頸記憶枕", img: "/hypercool/Group-346.webp", href: "/product/lunio-hypercool" },
  { label: "靠枕",       img: "/embrance/Group-436.webp",  href: "/product/lunio-embrace" },
];

export function PillowCategoryTabs({ cats = DEFAULT_CATS }: { cats?: Cat[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Tab label */}
      <div style={{ borderBottom: `2px solid ${BLUE}`, display: "inline-block", marginBottom: 24 }}>
        <span className="font-semibold" style={{ fontSize: 15, color: NAVY, paddingBottom: 8, display: "block" }}>枕頭類別</span>
      </div>
      {/* Category cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cats.map((c, i) => (
          <Link key={c.label} href={c.href}
            onMouseEnter={() => setActive(i)}
            className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3/2", border: i === active ? `2px solid ${BLUE}` : "2px solid transparent", transition: "border 0.2s" }}>
              <Image src={c.img} alt={c.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="25vw" />
            </div>
            <span className="font-medium text-center" style={{ fontSize: 13, color: i === active ? BLUE : NAVY, transition: "color 0.2s" }}>{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
