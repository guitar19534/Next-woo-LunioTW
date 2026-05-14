/**
 * ServicePromise — Section 7: Service Delivery Promise
 *
 * Layout (top → bottom, center-aligned):
 *   Watermark 'SERVICES' + Main title '我們的服務'
 *   Large rounded image with bottom-center text overlay
 *   Sub-text service detail blocks
 *
 * ─── Replacing placeholder assets ───────────────────────────────────────────
 *  Delivery photo: /public/images/service/delivery-team.webp
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image";

const SERVICE_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#3c7ae4" strokeWidth="1.8" aria-hidden>
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "全台免費配送安裝",
    desc: "全台免運費、免樓層費，並協助安裝床墊，讓你完全不費力。",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#3c7ae4" strokeWidth="1.8" aria-hidden>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "舊床免費搬至一樓",
    desc: "舊床免費搬至一樓，或以優惠價協助清運回收，換床一點都不麻煩。",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#3c7ae4" strokeWidth="1.8" aria-hidden>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    title: "床墊免費寄倉",
    desc: "床墊免費寄倉，配合你的搬家與安床時間，彈性出貨不催促。",
  },
];

export function ServicePromise() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* ── Header: watermark + title ──────────────────────── */}
        <div className="relative text-center mb-12 md:mb-16">

          {/* Watermark */}
          <span
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none"
            aria-hidden
            style={{
              fontSize: "clamp(52px, 11vw, 112px)",
              color: "transparent",
              WebkitTextStroke: "1px #dde6f0",
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
            }}
          >
            SERVICES
          </span>

          <div className="relative">
            <p
              className="uppercase font-medium tracking-[5px] mb-4"
              style={{ fontSize: "11px", color: "#3c7ae4" }}
            >
              OUR SERVICES
            </p>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Chiron Goround TC', sans-serif",
                color: "#17284b",
                lineHeight: 1.3,
                letterSpacing: "0.02em",
              }}
            >
              我們的服務
            </h2>
          </div>
        </div>

        {/* ── Featured image with overlay ────────────────────── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-14 md:mb-18"
          style={{ aspectRatio: "16 / 7" }}
        >
          <Image
            src="https://placehold.co/1140x498/cdd9ec/17284b?text=Lunio+配送安裝團隊照片"
            alt="Lunio 服務團隊協助搬運配送床墊 — 全台免費到府安裝"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1140px"
          />

          {/* Dark gradient overlay — bottom half */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
            }}
          />

          {/* Overlay text — bottom center */}
          <div className="absolute bottom-0 inset-x-0 pb-8 md:pb-10 px-6 text-center">
            <p
              className="font-bold text-white"
              style={{
                fontSize: "clamp(16px, 2.6vw, 26px)",
                lineHeight: 1.4,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                letterSpacing: "0.03em",
              }}
            >
              換床的麻煩事，Lunio 免費幫你
            </p>
          </div>
        </div>

        {/* ── Service detail blocks ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {SERVICE_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center sm:items-start text-center sm:text-left">

              {/* Icon circle */}
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full mb-4 flex-shrink-0"
                style={{ background: "#eef4ff" }}
              >
                {item.icon}
              </div>

              <h3
                className="font-bold mb-2"
                style={{ fontSize: "15px", color: "#17284b", lineHeight: 1.4 }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#5F6062",
                  lineHeight: 1.85,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Thin divider */}
        <div
          className="mx-auto mt-14"
          style={{ width: "48px", height: "2px", background: "#3c7ae4", borderRadius: "2px" }}
        />

      </div>
    </section>
  );
}
