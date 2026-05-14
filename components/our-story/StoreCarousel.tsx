"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STORES = [
  { name: "新竹新生活門市", img: "/storefront/hsinchu-store (1).jpg", href: "/storefront/hsinchu" },
  { name: "台中門市",       img: "/storefront/Taichung-store.jpg",    href: "/storefront/taichung" },
  { name: "高雄旗艦店",     img: "/storefront/Lunio高雄門市.webp",   href: "/storefront/kaohsiung" },
  { name: "台北門市",       img: "/storefront/taipei-store_202508.jpg", href: "/storefront/taipei" },
  { name: "桃園門市",       img: "/storefront/Taoyuan-storefront (1).jpg", href: "/storefront/taoyuan" },
  { name: "台南旗艦店",     img: "/storefront/DreamLands-store.jpg",  href: "/storefront/tainan" },
];

export function StoreCarousel() {
  const [idx, setIdx] = useState(0);
  const visible = [STORES[idx % STORES.length], STORES[(idx + 1) % STORES.length], STORES[(idx + 2) % STORES.length]];

  return (
    <div>
      <div className="relative">
        <div className="grid grid-cols-3 gap-4">
          {visible.map((s) => (
            <Link key={s.name} href={s.href} className="group flex flex-col gap-2">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <Image src={s.img} alt={s.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="25vw" />
              </div>
              <p className="text-center font-medium" style={{ fontSize: 13, color: "#4a5568" }}>{s.name}</p>
            </Link>
          ))}
        </div>
        <button type="button" onClick={() => setIdx((i) => (i - 1 + STORES.length) % STORES.length)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          style={{ fontSize: 18, color: "#4a5568" }}>‹</button>
        <button type="button" onClick={() => setIdx((i) => (i + 1) % STORES.length)}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          style={{ fontSize: 18, color: "#4a5568" }}>›</button>
      </div>
    </div>
  );
}
