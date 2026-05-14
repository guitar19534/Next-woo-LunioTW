/**
 * Brand Promises — Dark navy section with big-number statistics
 * Matches the dark USP section on lunio.com.tw
 */

import { brandConfig } from "@/brand.config";

export function BrandPromises() {
  return (
    <section className="py-14 md:py-20 bg-[#17284b] text-white">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p
            className="tracking-[5px] uppercase font-medium mb-3"
            style={{ fontSize: "11px", color: "#93b4f0" }}
          >
            OUR PROMISE · 我們的承諾
          </p>
          <h2 className="font-bold text-white">為什麼選擇 Lunio？</h2>
          <p
            className="mt-3 mx-auto"
            style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "400px" }}
          >
            每一項數字，都是我們對睡眠品質不變的堅持
          </p>
        </div>

        <style>{`
          .promise-card {
            background-color: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .promise-card:hover { background-color: rgba(255,255,255,0.09); }
        `}</style>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {brandConfig.promises.map((p) => (
            <div
              key={p.title}
              className="text-center p-6 md:p-8 rounded-[8px] transition-colors duration-300 promise-card"
            >
              <div className="mb-3 leading-none">
                <span
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
                >
                  {p.number}
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: "clamp(18px, 3vw, 24px)", color: "#3c7ae4" }}
                >
                  {p.unit}
                </span>
              </div>
              <p
                className="font-semibold text-white mb-2"
                style={{ fontSize: "15px" }}
              >
                {p.title}
              </p>
              <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
