"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAVY = "#17284b";
const BLUE = "#17569E";

const TABS = ["適合對象", "尺寸", "服務保固"] as const;
type Tab = typeof TABS[number];

const SIZES = [
  { label: "標準單人", dim: "90 x 188 x 5 cm；3 尺床墊" },
  { label: "單人加大", dim: "105 x 188 x 5cm；3.5 尺床墊" },
  { label: "標準雙人", dim: "150 x 188 x 5 cm；5 尺床墊" },
  { label: "雙人加大", dim: "180 x 188 x 5 cm；6 尺床墊" },
];

const CERTS = [
  { src: "/helix/Lunio-CertiPUR-US認證.webp", label: "CertiPUR-US", w: 100, h: 100 },
  { src: "/helix/OEKO-TEX_v2.png",            label: "OEKO-TEX®", w: 100, h: 100 },
];

function TabContent({ tab }: { tab: Tab }) {
  if (tab === "適合對象") return (
    <div className="space-y-8">
      <ul className="space-y-3" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
        {[
          "想調整床墊軟硬度的使用者",
          "希望提升舊床舒適度、延長舊床壽命者",
          "兩人同床，但對軟硬度喜好不同者",
          "租屋族或學生宿舍",
        ].map((s) => (
          <li key={s} style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{s}</li>
        ))}
      </ul>
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/7" }}>
        <Image src="/topper-smartrest/Cover-5.webp" alt="Nooz SmartRest 適合對象" fill className="object-cover" sizes="90vw" />
      </div>
      <div>
        <p className="text-center font-medium mb-6" style={{ fontSize: "clamp(15px,1.8vw,20px)", color: NAVY }}>
          Nooz SmartRest Flip Topper 多重認證安全無毒更放心
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {CERTS.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <Image src={c.src} alt={c.label} width={c.w} height={c.h} className="object-contain" />
              <p style={{ fontSize: 13, color: "#6b7280" }}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (tab === "尺寸") return (
    <div className="space-y-4" style={{ fontSize: 15, color: "#374151" }}>
      <p>床墊厚度：5公分</p>
      <ul className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
        {SIZES.map((s) => (
          <li key={s.label}>
            <span style={{ color: BLUE, fontWeight: 600 }}>{s.label}</span>：{s.dim}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 8 }}>尺寸因手工製作誤差正負2cm屬正常</p>
    </div>
  );

  return (
    <ul className="space-y-3" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
      {[
        "12期0利率",
        "限時全台本島免運費、免樓層費",
        "協助舊床墊搬運",
        "免費寄倉服務，可選吉日配送，入宅安床日再出貨",
      ].map((s) => (
        <li key={s} style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{s}</li>
      ))}
    </ul>
  );
}

export function SmartrestTabSection() {
  const [activeTab, setActiveTab] = useState<Tab>("適合對象");

  return (
    <>
      {/* ── Tabs ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[900px] w-[90%] mx-auto">

          {/* Tab nav */}
          <div className="grid grid-cols-3 mb-10" style={{ borderBottom: "2px solid #e2e8f0" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="pb-4 font-medium transition-colors"
                style={{
                  fontSize: "clamp(14px,1.5vw,17px)",
                  color: activeTab === tab ? BLUE : "#9ca3af",
                  borderBottom: activeTab === tab ? `2px solid ${BLUE}` : "2px solid transparent",
                  marginBottom: -2,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <TabContent tab={activeTab} />
        </div>
      </section>

      {/* ── Care Instructions ────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(40px,4vw,56px) 0" }}>
        <div className="max-w-[900px] w-[90%] mx-auto">
          <h2 className="font-bold mb-5" style={{ fontSize: "clamp(18px,2vw,22px)", color: NAVY }}>保養說明</h2>
          <p className="font-bold mb-3" style={{ fontSize: 15, color: NAVY }}>透氣床罩清洗方式</p>
          <ul className="space-y-2 mb-6" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
            {[
              "最推薦的方式是低溫手洗，其次是低溫機洗。",
              "首先，先將衣物在冷水中浸泡15分鐘，然後使用一般的合成洗滌劑進行清洗，洗滌液的溫度不應超過45°C。",
              "放置於陰涼通風處晾乾，避免陽光直射，切勿烘乾、熨燙，且切記不可漂白。",
            ].map((s, i) => (
              <li key={i} style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.85 }}>{s}</li>
            ))}
          </ul>
          <p style={{ fontSize: 14, color: "#555" }}>
            ＊ 收到產品時建議一個月內進行開箱，並錄影開箱過程，避免後續產生爭議。
          </p>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-10 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 16 }}
            >
              選購Nooz SmartRest 翻轉床墊
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
