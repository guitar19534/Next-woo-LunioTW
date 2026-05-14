"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ORANGE = "#F5A000";
const NAVY   = "#17284b";
const BLUE   = "#17569E";

const STORES = [
  { name: "台北門市",      img: "/storefront/taipei-store_202508.jpg",        phone: "0965-218-919", tel: "+886965218919", addr: "台北市大安區敦化南路一段176號", href: "/storefront/taipei" },
  { name: "桃園門市",      img: "/storefront/Taoyuan-storefront (1).jpg",     phone: "0937-968-020", tel: "+886937968020", addr: "桃園市桃園區正光路393號1樓",   href: "/storefront/taoyuan" },
  { name: "新竹新生活門市", img: "/storefront/hsinchu-store (1).jpg",         phone: "0965-321-511", tel: "+886965321511", addr: "新竹縣竹北市文興路43號",       href: "/storefront/hsinchu" },
  { name: "台中門市",      img: "/storefront/Taichung-store.jpg",             phone: "0965-032-822", tel: "+886965032822", addr: "台中市北屯區文心路三段405號",  href: "/storefront/taichung" },
  { name: "台南旗艦店",    img: "/storefront/DreamLands-store.jpg",           phone: "0937-968-070", tel: "+886937968070", addr: "台南市安平區文平路278號",      href: "/storefront/tainan" },
  { name: "高雄旗艦店",    img: "/storefront/Lunio高雄門市.webp",             phone: "0965-508-387", tel: "+886965508387", addr: "高雄市鼓山區馬卡道路406號",   href: "/storefront/kaohsiung" },
];

export function SidebarStoreCarousel() {
  const [current, setCurrent] = useState(0);
  const store = STORES[current];

  return (
    <div className="rounded-2xl overflow-hidden flex" style={{ border: "1px solid #e5eaf5", backgroundColor: "#fff" }}>

      {/* Vertical dots — left side */}
      <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4" style={{ backgroundColor: "#f8faff", borderRight: "1px solid #f0f4fb" }}>
        {STORES.map((_, i) => (
          <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={STORES[i].name}
            className="rounded-full transition-all duration-200"
            style={{
              width: 8, height: i === current ? 22 : 8,
              backgroundColor: i === current ? BLUE : "#d1d5db",
              flexShrink: 0,
            }} />
        ))}
      </div>

      {/* Card content */}
      <div className="flex-1 min-w-0">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image src={store.img} alt={store.name} fill className="object-cover" sizes="280px" />
        </div>
        <div className="p-4">
          <p className="font-bold mb-1" style={{ fontSize: 14, color: NAVY }}>Lunio {store.name}</p>
          <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{store.addr}</p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>每日營業 AM11:00 ～ PM8:00</p>
          <a href={`tel:${store.tel}`} className="block mt-1 font-medium hover:underline" style={{ fontSize: 12, color: BLUE }}>
            聯絡電話：{store.phone}
          </a>
          <div className="flex gap-2 mt-3">
            <Link href={store.href}
              className="flex-1 text-center py-2 rounded-full font-semibold text-xs text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}>
              預約試躺
            </Link>
            <Link href={store.href}
              className="flex-1 text-center py-2 rounded-full font-semibold text-xs transition-opacity hover:opacity-90"
              style={{ border: `1px solid ${BLUE}`, color: BLUE }}>
              查看門市
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
