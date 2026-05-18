"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

const SLIDES = [
  {
    icon: "/promotions/icon-優質原料床墊.webp",
    title: "優質天然原料",
    subtitle: "孩童孕婦皆可安心使用",
    body: [
      "Lunio乳膠採用汲取於泰國橡樹的100%天然乳膠，不含任何化學乳膠成分，具天然防蟎抗菌效果。",
      "石墨烯亦具有天然抑菌效果，對人體無害，與皮膚接觸也沒問題。",
    ],
  },
  {
    icon: "/promotions/icon-符合人體工學床墊.webp",
    title: "符合人體工學",
    subtitle: "保護您健康與安全",
    body: [
      "軟硬適中是人體工學的重點，提供身體與心靈最舒適的感受。",
      "特製33個線條切面工法，能根據人體部位的重量分佈壓力點，不管是正躺還是側睡，都能保持脊椎呈現他原有的線條。",
    ],
  },
  {
    icon: "/promotions/icon-涼爽透氣床墊.webp",
    title: "涼感透氣散熱",
    subtitle: "避免悶熱影響睡眠",
    body: [
      "涼感天絲表布、乳膠的透氣性、石墨烯的優異散熱能力、專利恆溫技術，讓您不再因悶熱而醒。",
      "也能避免床墊成為細菌的溫床，提升使用壽命。",
    ],
  },
  {
    icon: "/promotions/icon-全方位服貼支撐床墊.webp",
    title: "全身服貼支撐",
    subtitle: "避免腰疼背痛影響日常",
    body: [
      "再貴的床墊缺乏支撐性都不是好床墊，會使腰部懸空或下陷，導致脊椎變形、腰疼背痛等問題。",
      "挑床最需注重支撐性，服貼包覆身體曲線，才能有效釋放身體壓力。",
    ],
  },
];

export function FeaturesCarousel() {
  const [idx, setIdx] = useState(0);
  const s = SLIDES[idx];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 32px", background: "#f4f6fb", height: "100%" }}>
      <div style={{ width: 120, height: 120, marginBottom: 24 }}>
        <Image src={s.icon} alt={s.title} width={120} height={120} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{s.title}</h3>
      <p style={{ fontSize: 14, fontWeight: 700, color: BLUE, marginBottom: 20 }}>{s.subtitle}</p>

      {s.body.map((t, i) => (
        <p key={i} style={{ fontSize: 14, color: "#444", lineHeight: 1.85, marginBottom: 12, maxWidth: 320 }}>{t}</p>
      ))}

      {/* Dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 24 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`第${i + 1}張`}
            style={{
              width: 10, height: 10, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === idx ? NAVY : "#ccd2de", transition: "background 0.2s",
            }} />
        ))}
      </div>

      <Link href="/product/lunio-latex-mattress"
        style={{
          padding: "10px 28px", borderRadius: 30, border: `1.5px solid ${BLUE}`,
          color: BLUE, fontSize: 14, fontWeight: 600, textDecoration: "none",
          letterSpacing: "0.05em",
        }}>
        想多了解乳膠床墊
      </Link>
    </div>
  );
}
