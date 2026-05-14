/**
 * Store Locations — "Lunio門市－乳膠床墊專賣店"
 * Matches the 6-location store section on lunio.com.tw
 */

import Link from "next/link";

const LOCATIONS = [
  {
    city: "台北",
    name: "台北大安門市",
    address: "大安區安和路一段 85 號",
    phone: "0965-218-919",
  },
  {
    city: "桃園",
    name: "桃園門市",
    address: "請洽官網查詢地址",
    phone: "請洽官網",
  },
  {
    city: "新竹",
    name: "新竹門市",
    address: "請洽官網查詢地址",
    phone: "請洽官網",
  },
  {
    city: "台中",
    name: "台中門市",
    address: "請洽官網查詢地址",
    phone: "請洽官網",
  },
  {
    city: "台南",
    name: "台南門市",
    address: "請洽官網查詢地址",
    phone: "請洽官網",
  },
  {
    city: "高雄",
    name: "高雄門市",
    address: "請洽官網查詢地址",
    phone: "請洽官網",
  },
] as const;

export function StoreLocations() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="tracking-[5px] uppercase font-medium mb-3"
            style={{ fontSize: "11px", color: "#3c7ae4" }}
          >
            SHOWROOMS · 門市試躺
          </p>
          <h2 className="font-bold text-[#212020]">
            Lunio 門市 — 乳膠床墊專賣店
          </h2>
          <p
            className="mt-4 mx-auto leading-relaxed"
            style={{
              fontSize: "15px",
              color: "#5F6062",
              maxWidth: "600px",
            }}
          >
            Lunio 於台北、桃園、新竹、台中、台南、高雄都有床墊試躺服務，
            立刻找尋離您最近的門市預約試躺。
          </p>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="rounded-[8px] p-5 md:p-6 transition-all duration-300 hover:shadow-md"
              style={{ border: "1px solid #E4E4E4", backgroundColor: "#F8F8F8" }}
            >
              {/* City badge */}
              <span
                className="inline-block bg-[#3c7ae4] text-white rounded-full px-3 py-0.5 mb-3 font-medium"
                style={{ fontSize: "11px", letterSpacing: "1px" }}
              >
                {loc.city}
              </span>

              <h3
                className="font-semibold text-[#212020] mb-2 leading-tight"
                style={{ fontSize: "15px" }}
              >
                {loc.name}
              </h3>

              <p className="text-[#5F6062] mb-1" style={{ fontSize: "12px" }}>
                📍 {loc.address}
              </p>
              <p className="text-[#5F6062] mb-1" style={{ fontSize: "12px" }}>
                🕐 每日 11:00 – 20:00
              </p>
              <p className="text-[#5F6062]" style={{ fontSize: "12px" }}>
                📞 {loc.phone}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/pages/contact" className="btn-lunio inline-flex">
            立即預約試躺
          </Link>
        </div>
      </div>
    </section>
  );
}
