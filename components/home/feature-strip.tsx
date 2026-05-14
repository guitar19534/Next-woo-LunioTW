/**
 * Feature Strip — 4-column benefit bar below the hero.
 * Matches the "全台免運 / 舊床可處理 / 全台門市試躺 / 天然乳膠" strip on lunio.com.tw
 */

import { brandConfig } from "@/brand.config";

export function FeatureStrip() {
  return (
    <section className="bg-white border-b border-[#E4E4E4]">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: "1px solid #E4E4E4" }}
        >
          {brandConfig.featureStrip.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 py-4 px-4 md:py-5 md:px-6"
              style={{ borderRight: "1px solid #E4E4E4" }}
            >
              <span className="text-[22px] flex-shrink-0 leading-none">{f.icon}</span>
              <div className="min-w-0">
                <p
                  className="font-semibold text-[#212020] leading-tight truncate"
                  style={{ fontSize: "13px" }}
                >
                  {f.title}
                </p>
                <p
                  className="text-[#888888] mt-0.5 leading-tight"
                  style={{ fontSize: "11px" }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
