"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STORES = [
  { name: "台北門市",           img: "/images/prefooter/nooz/Lunio門市 (1).webp",            href: "#" },
  { name: "台中床墊專賣店",     img: "/images/prefooter/nooz/Lunio-台中床墊專賣店.webp",       href: "#" },
  { name: "新竹竹北床墊專賣店", img: "/images/prefooter/nooz/Lunio-新竹竹北床墊專賣店.webp",   href: "#" },
  { name: "高雄門市",           img: "/images/prefooter/nooz/Lunio高雄門市-1-1.webp",          href: "#" },
  { name: "桃園門市",           img: "/images/prefooter/nooz/Taoyuan-storefront (1).jpg",      href: "#" },
  { name: "台南Dreamalands旗艦店", img: "/images/prefooter/nooz/dreamlands-tainan_02.jpg",    href: "#" },
];

const BLUE = "#17569E";

export function NoozStoreCarousel() {
  const [idx, setIdx] = useState(0);
  const store = STORES[idx];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Store photo */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image src={store.img} alt={store.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>

      {/* Name + location btn */}
      <p className="font-semibold text-center" style={{ fontSize: 15, color: "#17284b" }}>{store.name}</p>
      <Link
        href={store.href}
        className="px-6 py-2 rounded-full border font-medium hover:bg-blue-50 transition-colors"
        style={{ fontSize: 13, color: BLUE, borderColor: BLUE }}
      >
        查看位置
      </Link>

      {/* Arrows */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + STORES.length) % STORES.length)}
          className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ borderColor: "#d1d5db" }}
          aria-label="Previous"
        >
          ‹
        </button>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>{idx + 1} / {STORES.length}</span>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % STORES.length)}
          className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ borderColor: "#d1d5db" }}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
