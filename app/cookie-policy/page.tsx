import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie 政策｜Lunio Taiwan",
  description: "Lunio Taiwan Cookie 政策說明，包含 Cookie 的使用方式、類型及設定方法。",
  alternates: { canonical: "/cookie-policy" },
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const COOKIE_TYPES = [
  {
    name: "分析／性能 Cookie",
    desc: "協助收集網站瀏覽數據與訪客行為分析，優化網站品質及廣告效益衡量。",
  },
  {
    name: "功能性 Cookie",
    desc: "於再次訪問時辨識用戶，記住偏好設定與語言／地區選擇，提供個人化瀏覽體驗。",
  },
  {
    name: "目標 Cookie",
    desc: "記錄瀏覽資訊與頁面連結以調整網站內容，可能與第三方共享數據。",
  },
  {
    name: "廣告 Cookie",
    desc: "記錄訪問偏好以呈現相關廣告，控制廣告重複頻率並衡量廣告效能。",
  },
];

const COLLECT_ITEMS = [
  "您進入網站時的網域名稱和 IP 地址",
  "瀏覽器的類型以及其結構和操作系統",
  "您瀏覽網站的日期和時間",
  "將您引導至我們網站的其他網站位址",
  "任何您瀏覽過的網頁，包括您瀏覽過的內容與瀏覽的時間",
];

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="py-14 md:py-20 text-center" style={{ backgroundColor: "#f0f6ff" }}>
        <p
          className="uppercase font-medium tracking-[5px] mb-3"
          style={{ fontSize: 11, color: BLUE }}
        >
          LEGAL
        </p>
        <h1
          className="font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", color: NAVY, letterSpacing: "0.02em" }}
        >
          Cookie 政策
        </h1>
        <p className="mt-3" style={{ fontSize: 14, color: "#888" }}>
          荷叡森有限公司
        </p>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-14 md:py-20 space-y-12">

        {/* Section 1 — Intro */}
        <section>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 2 }}>
            本網站由 荷叡森有限公司（以下簡稱「我們」）營運。本網站使用 Cookie
            和其他工具來區別您及其他瀏覽本網站的訪客，這可以幫助我們優化您的網站瀏覽體驗，並幫助我們進一步改善網站品質。如果您繼續使用本網站，則表示您同意我們將
            Cookie 安置於您的電腦中。
          </p>
        </section>

        {/* Section 2 — What is Cookie */}
        <section>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 20, color: NAVY, borderLeft: `3px solid ${BLUE}`, paddingLeft: 12 }}
          >
            Cookie 是什麼？
          </h2>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 2, marginBottom: 16 }}>
            Cookie 是一個小型純文字檔案，儲存在您的網頁瀏覽器、電腦硬碟或行動裝置上，伺服器可於之後重新檢視資料，也類似於網頁的暫存資料。
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 2, marginBottom: 12 }}>
            Cookie 是如何運作來幫助我們收集和儲存有關您瀏覽本網站的以下資訊：
          </p>
          <ul className="space-y-2">
            {COLLECT_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5" style={{ fontSize: 15, color: "#444", lineHeight: 1.8 }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: BLUE }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 — Cookie Types */}
        <section>
          <h2
            className="font-bold mb-6"
            style={{ fontSize: 20, color: NAVY, borderLeft: `3px solid ${BLUE}`, paddingLeft: 12 }}
          >
            Cookie 的使用方法
          </h2>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 2, marginBottom: 20 }}>
            我們使用的 Cookie 包括以下類型但不限於下表：
          </p>
          <div className="space-y-4">
            {COOKIE_TYPES.map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-5"
                style={{ backgroundColor: "#f8faff", border: "1px solid #dbeafe" }}
              >
                <p className="font-semibold mb-1.5" style={{ fontSize: 15, color: NAVY }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6" style={{ fontSize: 14, color: "#888", lineHeight: 1.8 }}>
            請注意，本網站使用的一些 Cookie 由第三方網站管理，如需更多資訊，須參考第三方網站的隱私政策。
          </p>
        </section>

        {/* Section 4 — Settings */}
        <section>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 20, color: NAVY, borderLeft: `3px solid ${BLUE}`, paddingLeft: 12 }}
          >
            Cookie 設置
          </h2>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 2 }}>
            用戶可修改瀏覽器設定以拒絕部分或全部 Cookie。若拒絕所有 Cookie，可能無法正常瀏覽網站內容。撤回同意時需從瀏覽器設定刪除
            Cookie。詳情請查閱您所使用的瀏覽器說明選項。
          </p>
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8 }}>
            本政策由 荷叡森有限公司 制定，如有任何疑問請透過官方管道與我們聯繫。
          </p>
        </div>

      </div>
    </main>
  );
}
