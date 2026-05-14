"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const BLUE = "#2563EB";

// ── แก้ href ให้ตรงกับ URL ของแต่ละสาขา ─────────────────────────────────────
const STORES = [
  { name: "台南Dreamalands旗艦店",   img: "/images/prefooter/nooz/dreamlands-tainan_02.jpg",          href: "#" },
  { name: "台北門市",                 img: "/images/prefooter/nooz/Lunio門市 (1).webp",                href: "#" },
  { name: "台中床墊專賣店",           img: "/images/prefooter/nooz/Lunio-台中床墊專賣店.webp",         href: "#" },
  { name: "新竹竹北床墊專賣店",       img: "/images/prefooter/nooz/Lunio-新竹竹北床墊專賣店.webp",     href: "#" },
  { name: "高雄門市",                 img: "/images/prefooter/nooz/Lunio高雄門市-1-1.webp",            href: "#" },
  { name: "桃園門市",                 img: "/images/prefooter/nooz/Taoyuan-storefront (1).jpg",        href: "#" },
];

const SERVICES = [
  { icon: "/images/prefooter/nooz/Icon_Delivery_0.png",   label: "全台本島免運費"  },
  { icon: "/images/prefooter/nooz/Icon_stair_1-1.png",    label: "免費搬上樓"      },
  { icon: "/images/prefooter/nooz/Icon_recycle_1-1.png",  label: "協助舊床搬至一樓" },
  { icon: "/images/prefooter/nooz/Icon_payment_1-1.png",  label: "12期0利率"       },
  { icon: "/images/prefooter/nooz/Icon_warehouse_1-1.png", label: "床墊可寄倉"     },
  { icon: "/images/prefooter/nooz/Icon_Box.png",          label: "真空裝箱好搬運"  },
];

interface Props {
  productName: string;   // e.g. "NOOZ HELIX 獨立筒床墊"
  productHref?: string;  // link for CTA button
}

export function NoozPreFooter({ productName, productHref = "#" }: Props) {
  const [storeIdx, setStoreIdx] = useState(0);
  const store = STORES[storeIdx];

  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Section 1: Store ─────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] w-[92%] mx-auto">
          <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-8 md:gap-10 items-center">

            {/* Store cartoon */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/images/prefooter/nooz/Lunio門市 (1).webp"
                alt="Lunio 門市"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="font-bold mb-4" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: BLUE }}>
                找間離你最近門市睡午覺
              </h2>
              <p className="mb-1" style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>別光看！來摸摸我躺躺看</p>
              <p className="mb-1" style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>花個10分鐘，讓我們更認識彼此</p>
              <p className="mb-6" style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>激盪出不一樣火花</p>
              <Link
                href="/pages/contact"
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-white font-semibold transition-opacity hover:opacity-85"
                style={{ backgroundColor: BLUE, fontSize: 14 }}
              >
                預約小睡
              </Link>
            </div>

            {/* Store carousel */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#EEF4FF", padding: "16px" }}>
              <p className="text-center font-semibold mb-3" style={{ fontSize: 15, color: BLUE }}>{store.name}</p>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                <Image src={store.img} alt={store.name} fill className="object-cover" sizes="400px" />
                {/* Prev */}
                <button type="button" onClick={() => setStoreIdx((i) => (i - 1 + STORES.length) % STORES.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                {/* Next */}
                <button type="button" onClick={() => setStoreIdx((i) => (i + 1) % STORES.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
              <div className="mt-3 flex justify-center">
                <Link
                  href={store.href}
                  className="px-6 py-1.5 rounded-full font-medium border transition-colors hover:bg-blue-50"
                  style={{ fontSize: 13, color: BLUE, borderColor: BLUE }}
                >
                  查看位置
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2: 免費服務 ───────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#F0F4FF" }}>
        <div className="max-w-[1200px] w-[92%] mx-auto">
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#17284b" }}>
            免費服務
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <Image src={s.icon} alt={s.label} width={72} height={72} className="object-contain" />
                <p className="text-center" style={{ fontSize: 13, color: "#374151" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Dark CTA ───────────────────────────────────── */}
      <section className="py-14 md:py-20 text-center" style={{ backgroundColor: "#1a1f36" }}>
        <p className="font-bold mb-8 tracking-widest" style={{ fontSize: "clamp(18px, 2.5vw, 30px)", color: "#fff" }}>
          SLEEP ON ME 帶您進入深層睡眠
        </p>
        <Link
          href={productHref}
          className="inline-flex items-center justify-center px-10 py-3.5 rounded-full font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
          style={{ fontSize: 15, backgroundColor: BLUE }}
        >
          選購我的 {productName}
        </Link>
      </section>

    </div>
  );
}
