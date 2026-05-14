"use client";

import { useState } from "react";
import Link from "next/link";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

const BLOG_LINK_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  background: NAVY,
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  fontSize: "clamp(13px,1vw,14px)",
  fontWeight: 600,
  textDecoration: "none",
  marginTop: 16,
  lineHeight: 1.4,
} as const;

const FAQS = [
  {
    q: "Lunio的獨立筒床墊和他牌有什麼不同？",
    content: (
      <div>
        <p style={{ marginBottom: 16 }}>每個品牌的獨立筒品質差異巨大，而Lunio針對最重要的彈簧原料、圈數等工法進行強化改良，擁有優於他牌對人體的支撐力、舒壓及散熱性，更為了提升使用者的舒適度與健康，採用天然乳膠®製成舒適表層，讓Lunio的獨立筒床墊在舒適性與機能性上獲得用戶一致好評。</p>
        <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 16, marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: NAVY, marginBottom: 4 }}>獨立筒彈簧原料：高碳錳鋼線</p>
          <p style={{ fontSize: "clamp(13px,1vw,14.5px)", lineHeight: 1.85 }}>彈簧最怕彈性疲乏，而Lunio採用「高碳錳鋼線」製成獨立筒，無論是韌性、彈力及抗衝擊性，都優於市面上的一般彈簧，此外很多獨立筒床墊的使用者，都深受彈簧鏽蝕所苦，而Lunio獨立筒的「錳元素」含量相當高，即使在台灣潮濕氣候使用也不易腐蝕生鏽，這些原料使得Lunio獨立筒床墊在正常使用下可用10年，高於普通獨立筒床墊的5到8年。</p>
        </div>
        <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 16, marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: NAVY, marginBottom: 4 }}>獨立筒彈簧煉製溫度：1200度</p>
          <p style={{ fontSize: "clamp(13px,1vw,14.5px)", lineHeight: 1.85 }}>Lunio的獨立筒床墊的彈簧採市面少見的高溫1200度煉製而成，遠超過他牌彈簧的煉製溫度300度到800度，高溫煉製會使彈簧的結構張力大且彈性加，受壓後能迅速恢復原狀，有助於減少床墊變形和損壞的可能性。</p>
        </div>
        <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 16, marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: NAVY, marginBottom: 4 }}>獨立筒彈簧圈數：6.5圈</p>
          <p style={{ fontSize: "clamp(13px,1vw,14.5px)", lineHeight: 1.85 }}>透過多次實驗，Lunio將螺旋彈簧圈數製成最舒適穩定的6.5圈，讓躺感更加舒適穩定且Q彈，更好的支撐身體重量，在每個睡姿下都能同時順應姿勢支撐人體S曲線。</p>
        </div>
        <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 16 }}>
          <p style={{ fontWeight: 700, color: NAVY, marginBottom: 4 }}>多區式支撐：6區</p>
          <p style={{ fontSize: "clamp(13px,1vw,14.5px)", lineHeight: 1.85 }}>當我們在睡覺時，身體不同部位施加給床墊的壓力都不相同，理想的床墊應該要能按照人體結構，給予每個身體部位最適合的支撐，Lunio獨立筒核心分成6個區域，提供頭部、頸部、腰部、臀部、膝部及腿足部不同的支撐，自然的包覆睡眠者的身體，有助於放鬆全身、舒緩腰酸背痛。</p>
        </div>
      </div>
    ),
  },
  {
    q: "獨立筒床墊優缺點有哪些？",
    content: (
      <div>
        <p style={{ marginBottom: 16 }}>隨著床墊技術的發展，獨立筒床墊克服彈簧床的多種缺陷，也因此被許多消費者大力推薦，袋裝彈簧的結構型態，賦予大多數獨立筒床墊以下優點和缺點。</p>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 8 }}>優點</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>足夠的支撐力，服貼人體曲線</li>
          <li>優質抗干擾性，較不會影響到共眠者</li>
          <li>透氣性佳，擁有較多通風空間</li>
          <li>獨立筒為袋裝彈簧，摩擦聲較傳統彈簧床小</li>
        </ul>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 8 }}>缺點</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>受力最重的臀部支撐性較不佳</li>
          <li>製程的能源消耗及原料難以拆解，較不環保</li>
          <li>比彈簧床耐用，但長期使用依舊會有塌陷變形問題</li>
        </ul>
      </div>
    ),
  },
  {
    q: "獨立筒床墊耐用嗎？壽命多長？",
    content: (
      <div>
        <p style={{ marginBottom: 16 }}>無論是哪一種床墊，耐用程度都跟品質、製造技術與使用習慣有關，以下針對獨立筒床墊來分別說明：</p>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 6 }}>耐用性與品質有關</p>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>獨立筒的品質可以從使用多久會發生塌陷來判斷，劣質的獨立筒床墊約使用1－3年就會變形，甚至有客戶跟我們分享，在試躺他牌獨立筒時，一坐下就被變形凸出的彈簧刺傷，我們不希望這種狀況發生在每日使用的床墊，因此建議您選用品質較佳的獨立筒，而且是有提供保固的床墊品牌，才能用得長久並保障您的消費權益。</p>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 6 }}>耐用性與使用習慣有關</p>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>長時間對彈簧不當施力，尤其把施力點集中在獨立筒床面的一部分，容易造成該區域彈性疲乏，因此家中如果有孩子喜歡在床上跳躍，或是使用者常常坐在床邊，都會減少床墊的使用壽命。</p>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 6 }}>耐用性與製造技術有關</p>
        <p style={{ lineHeight: 1.85 }}>獨立筒彈簧的支撐性與回彈力大大影響了床墊的耐用性，這就取決於床墊品牌的技術實力，為了良好的品牌信譽，品牌方會不斷改良與創新製造技術，提供更舒適的睡眠體驗給顧客，選用願意不斷進步的品牌很重要！</p>
      </div>
    ),
  },
  {
    q: "如何延長獨立筒床墊的使用壽命？",
    content: (
      <div>
        <p style={{ marginBottom: 16 }}>維持床墊乾淨與正確使用，是延長壽命的不二法門，以下提供您簡單就能延長使用壽命的方法：</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 2.1 }}>
          <li><strong>定期翻轉床墊</strong>：每季或是每半年把床墊的頭尾對調，能避免免床墊固定區域承壓變形，也能讓另一側床墊透氣。</li>
          <li><strong>定期清潔</strong>：每月用吸塵器吸除床墊表面灰塵和皮屑，若有髒污也盡快清除。</li>
          <li><strong>避免不當使用</strong>：避免經常坐在床墊的某個位置，或是在床上跳躍。</li>
        </ul>
        <p style={{ marginBottom: 8, fontSize: 14 }}>獨立筒床墊清潔方法可參考</p>
        <Link href="/blog/clean-mattress/" style={BLOG_LINK_STYLE}>
          👉 床墊清潔大揭秘：7技巧讓您不再與塵蟎骯污共眠！
        </Link>
      </div>
    ),
  },
  {
    q: "獨立筒床墊會比較貴嗎？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>由於獨立筒床墊的製程比彈簧床墊複雜，因此價格也高於彈簧床墊，而高品質的獨立筒彈簧，會進一步推高床墊的價位，但購買床墊切記一個重要觀念，就是「要考量使用年限」，一張低價床墊也不會是良好的品質，通常用不到幾年就需要更換，換算下來其實沒有比較便宜。</p>
        <p style={{ marginBottom: 8, fontSize: 14 }}>購買獨立筒床墊預算怎麼訂？請參考</p>
        <Link href="/blog/mattress-price/" style={BLOG_LINK_STYLE}>
          👉 床墊價格最新攻略，買床多少預算比較合理呢？
        </Link>
      </div>
    ),
  },
  {
    q: "獨立筒彈簧數量越多越好嗎？",
    content: (
      <p style={{ lineHeight: 1.85 }}>獨立筒床墊的彈簧數量，有數百顆到上千顆，至於獨立筒數量是依據「床墊大小、彈簧品質以及您偏好的軟硬程度」來做選擇，因此獨立筒的彈簧數量愈多，不見得這張床墊就適合您，甚至有的床墊會藉由獨立筒數量來抬高價格，但事實上卻沒有相應的優良品質，因此建議您親自到門市試躺，才能找到最適合的床墊。</p>
    ),
  },
  {
    q: "獨立筒床墊受壓時有聲音是正常的嗎？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>獨立筒床墊的袋裝彈簧結構，已經大幅減少了傳統彈簧床墊的噪音問題，不過當獨立筒彈簧受壓時，還是會有細微聲音，這是「彈簧受壓及回彈所引起的摩擦聲」，屬於正常現象，不會對睡眠造成干擾。</p>
        <p style={{ lineHeight: 1.85 }}>但如果床墊受壓時的能聽到明顯大聲響，那可能有彈簧塌陷變形問題，或您的床墊已老舊，導致床墊在使用時傳出噪音，這種情況就會建議您更換床墊喔！</p>
      </div>
    ),
  },
  {
    q: "獨立筒床墊要怎麼回收？",
    content: (
      <div>
        <p style={{ marginBottom: 16 }}>獨立筒床墊有以下兩種管道進行回收：</p>
        <ol style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>
            <strong>當地環保局清潔隊舊床墊回收</strong>
            <br />
            <span style={{ fontSize: 13.5, color: "#555" }}>多數為免費服務，須提前一日以上聯繫回收事宜，並將床墊搬至一樓門口等待清運。</span>
          </li>
          <li style={{ marginTop: 8 }}>
            <strong>民營業者床墊舊床墊回收</strong>
            <br />
            <span style={{ fontSize: 13.5, color: "#555" }}>如需緊急處理舊床墊或有搬運困難的問題，可聯繫有床墊回收服務的民營業者，費用為$1500起跳。</span>
          </li>
        </ol>
        <p style={{ marginBottom: 8, lineHeight: 1.85 }}>若購買Lunio床墊的顧客，可以用超優惠價$800 給付予床墊運送人員，請他們協助回收舊床墊，在收到新床墊的同時便可為您處理舊床墊，免再聯繫環保局清潔隊，省去繁瑣的溝通作業。</p>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>若要請清潔隊協助回收，Lunio有提供免費搬運舊床至一樓的服務，讓您省力又安心！</p>
        <Link href="/blog/mattress-recycle/" style={BLOG_LINK_STYLE}>
          👉 最新床墊回收這樣做：方法、價格一篇全解答！
        </Link>
      </div>
    ),
  },
];

export default function PocketSpringFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: "#fff", padding: "clamp(48px,6vw,72px) 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: NAVY, marginBottom: 36 }}>
          獨立筒床墊重點問題
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e4e8f0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{
                  fontSize: "clamp(14px,1.3vw,17px)",
                  fontWeight: 600,
                  color: open === i ? BLUE : NAVY,
                  lineHeight: 1.4,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: 28, height: 28,
                  borderRadius: "50%",
                  border: `1.5px solid ${open === i ? BLUE : "#ccd"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: open === i ? BLUE : "#999",
                  fontSize: 16,
                  transition: "transform 0.25s",
                  transform: open === i ? "rotate(180deg)" : "none",
                }}>
                  ∧
                </span>
              </button>
              {open === i && (
                <div style={{
                  padding: "4px 0 24px",
                  fontSize: "clamp(13px,1.05vw,15px)",
                  color: "#444",
                  lineHeight: 1.85,
                  animation: "fadeIn 0.2s ease",
                }}>
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }`}</style>
    </section>
  );
}
