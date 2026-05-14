"use client";

import { useState } from "react";
import Link from "next/link";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

const DARK_LINK: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: NAVY,
  color: "#fff",
  padding: "9px 16px",
  borderRadius: 7,
  fontSize: "clamp(12px,.95vw,13.5px)",
  fontWeight: 600,
  textDecoration: "none",
  marginTop: 14,
  lineHeight: 1.45,
};

const FAQS: { q: string; content: React.ReactNode }[] = [
  {
    q: "乳膠床墊適合誰使用？",
    content: (
      <p style={{ lineHeight: 1.9 }}>乳膠床墊大人小孩皆適用，剛出生的寶寶、成長中的孩子、正在打拼的上班族、辛苦一輩子的長輩、過敏體質的人，經過認證安全無毒的乳膠床絕對是最佳選擇，守護您與家人的睡眠。</p>
    ),
  },
  {
    q: "乳膠床墊和獨立筒/彈簧床墊有什麼不同？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>以顧客最重視的面向來探討乳膠床墊與傳統獨立筒/彈簧床墊的差異：</p>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 8 }}>支撐性&amp;耐用度差異</p>
        <p style={{ marginBottom: 12, lineHeight: 1.85 }}>支撐性不佳最常見狀況就是會造成腰酸背痛，若支撐層損壞，長期睡下來更會影響身體的健康。</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 2 }}>
          <li>獨立筒/彈簧床墊的材料以彈簧作為主體結構，有良好的支撐人體脊椎的性能，但對於受力最重的臀部的支撐力較為不佳，若不正確的使用習慣像是小朋友經常在床上跳、固定睡在單側或坐在單點，彈簧就容易疲乏受損，使床墊塌陷而影響支撐性。</li>
          <li>Lunio的乳膠床墊採用複合技術來使支撐力達最佳效果，根據身體各部位分散壓力點，可均勻支撐身體曲線和重量，且天然乳膠的絕佳彈性讓小孩子在床上跳也不易造成損壞和變形，使用壽命上較立筒/彈簧床墊來的長許多。</li>
        </ul>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 8 }}>透氣性差異</p>
        <p style={{ marginBottom: 12, lineHeight: 1.85 }}>在台灣的氣候，若透氣性不佳容易孳生細菌、塵蟎、濕氣累積而影響身體健康。</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>相比彈簧床墊，獨立筒床墊使用袋裝彈簧，結構較為複雜且使用黏著劑固定，使得透氣性較不佳，且獨立筒床墊各家床墊業者對於獨立筒的採用的原料品質都不同，尤需加以注意選購具有安全認證的床墊！</li>
          <li>Lunio的乳膠床墊採用的<a href="https://zh.wikipedia.org/wiki/%E7%9F%B3%E5%A2%A8%E7%83%AF" target="_blank" rel="noopener noreferrer" style={{ color: BLUE, fontWeight: 700 }}>石墨烯</a>擁有的世界上最強導熱係數，能快速排出人體多餘的熱能和濕氣，維持睡眠恆溫及良好的身體循環；而天然乳膠防蟎抗菌且透氣的特性，非常適合台灣的氣候使用。</li>
        </ul>
        <p style={{ lineHeight: 1.85 }}>Lunio團隊非常注重使用者的睡眠，除了注重舒適感受之外，獨創切割技術強化支撐性與獨特科技加強床墊的透氣性，以提升顧客的睡眠品質為首要目標！</p>
      </div>
    ),
  },
  {
    q: "乳膠床墊與乳膠(薄)墊有什麼差異呢？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>乳膠薄墊一般是指整片式的全乳膠墊，有3.5至15公分多種厚度之分，常被用來鋪在太硬、太軟或支撐性差的床墊上作為舒適層使用，以改善躺感，如果原先使用的床墊已經有塌陷或彈性疲乏等問題，意味著床墊的支撐性能有損壞了，為了改善問題而鋪上乳膠薄墊也難以解決支撐力不佳的問題。（＊若您有選購乳膠薄墊的需求，歡迎洽<Link href="/storefront" style={{ color: BLUE, fontWeight: 600, textDecoration: "underline" }}>Lunio實體門市</Link>選購！）</p>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>而乳膠床墊，通常採用乳膠作為舒適層，搭配獨立筒彈簧、記憶棉或高密度海綿作為支撐層，組合起來的完整床墊。</p>
        <p style={{ lineHeight: 1.85 }}>Lunio的乳膠床墊是研發團隊了解使用者對於僅有乳膠薄墊的疑慮，全方位考量後而研發，在床墊內層結合Lunio Latex® 頂級天然乳膠、3D 恆溫冷凝記憶®、石墨烯精密吸震平衡系統®，以各層的交互作用產生的效應，解決僅有乳膠薄墊的聚熱與支撐性等問題。</p>
      </div>
    ),
  },
  {
    q: "Lunio乳膠床墊與德國記憶棉床墊有什麼不同？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>兩款床墊最大的差異為製造床墊所使用的原料及工藝技術不同，使得支撐性、透氣性、耐用性等特性也都有所差異。</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>Lunio乳膠床墊採用可生物降解原料，擁有天然乳膠獨有的特性，Q彈耐用、絕佳防蟎抗菌力、天然無毒，然而最大缺點是不耐高溫。</li>
          <li>德國記憶棉床墊，高包覆性、吸震、抗壓力，使用一段時間會貼合身形，然而對於溫度非常敏感－天氣熱變軟、天氣冷變硬。</li>
        </ul>
        <p style={{ marginBottom: 8, lineHeight: 1.85 }}>查看 👉 <Link href="/latex-mattress/#compare-latex-memory" style={{ color: BLUE, fontWeight: 600 }}>Lunio乳膠床墊與德國記憶床墊比較表</Link></p>
        <p style={{ marginBottom: 8, lineHeight: 1.85 }}>每款床墊都有自己的優劣勢，建議在購買前先至門市試躺，才能找到最適合自己的床墊！</p>
        <p style={{ lineHeight: 1.85 }}>若想更了解乳膠床墊與記憶床墊的差別請看 👉 <Link href="/blog/memory-foam-vs-latex-mattress/" style={{ color: BLUE, fontWeight: 600 }}>記憶床墊vs.乳膠床墊：哪一種床比較好？</Link></p>
      </div>
    ),
  },
  {
    q: "Lunio的乳膠床墊是100%天然乳膠嗎？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>Lunio的乳膠床墊是純正100%NR天然乳膠！使用泰國橡樹採集的汁液，由繁瑣英國工藝製成，已榮獲多項天然乳膠國際認證，擁有德國eco-INSTITUT、SGS、德國萊因 LGA等品質認證，讓我們的顧客能安心選用！</p>
        <Link href="/latex/" style={DARK_LINK}>
          👉 立即學會【分辨天然乳膠與合成/人造乳膠的方法】
        </Link>
      </div>
    ),
  },
  {
    q: "乳膠床墊的優點和缺點是什麼？",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 10 }}>乳膠床墊優點</p>
        <ul style={{ paddingLeft: 20, marginBottom: 8, lineHeight: 2 }}>
          <li><strong>防蟎又抗菌</strong>：天然乳膠有橡樹蛋白酶有抑制塵蟎、細菌、過敏原的作用，非常適合有塵蟎過敏的顧客使用。</li>
          <li><strong>透氣不悶熱</strong>：乳膠床墊的內部有上萬個細密氣泡構造，能將人體多餘熱氣和濕氣排出。</li>
          <li><strong>支撐又包覆</strong>：乳膠床墊支撐性十足，睡起來能夠維持脊椎曲線、矯正不良睡姿。</li>
          <li><strong>抗噪抗干擾</strong>：乳膠床墊的分子結構，可以很好地吸收翻身時造成的震動及噪音。</li>
          <li><strong>Q彈不變形</strong>：絕佳的彈性讓床墊不易塌陷或變形，給人輕盈的睡眠感受。</li>
        </ul>
        <Link href="/blog/latex-mattress-recommend/" style={{ ...DARK_LINK, display: "inline-flex", marginBottom: 20 }}>
          👉 為什麼乳膠床墊被大力推薦？全面解析大公開！
        </Link>

        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 10, marginTop: 4 }}>乳膠床墊缺點</p>
        <ul style={{ paddingLeft: 20, marginBottom: 8, lineHeight: 2 }}>
          <li><strong>怕紫外線和高溫</strong>：天然乳膠遇到高溫會加快氧化速度，不得日曬殺菌或使用電熱毯，但天然乳膠本身就有防蟎抗菌的特性，不需特別進行除蟎殺菌。</li>
          <li><strong>包覆性高聚熱感</strong>：乳膠層因包覆性極佳可能讓某些使用者感覺悶熱，Lunio融合了石墨烯及其他專利技術來解決乳膠床墊聚熱的問題。</li>
          <li><strong>手工脫模小瑕疵</strong>：乳膠床墊是由人工進行脫模，難免有些不工整及微皺褶，這過是正常的。如果是化學合成乳膠，則表面會處理的相當工整。</li>
        </ul>
        <Link href="/blog/latex-mattress-cons/" style={DARK_LINK}>
          👉 業者老實說：乳膠床墊的缺點？讓您不再花冤枉錢
        </Link>
      </div>
    ),
  },
  {
    q: "乳膠床墊的壽命有多長、耐用嗎？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>正常的使用狀況下，乳膠床墊的壽命可長達10年以上，相較於獨立筒床墊、彈簧床墊容易因彈簧彈性疲乏導致塌陷而減少使用壽命，質量好的乳膠床墊擁有良好的回彈性也不容易變形，這也是為什麼<Link href="/product/lunio-latex-mattress" style={{ color: BLUE, fontWeight: 600 }}>Lunio GEN4乳膠床墊</Link>敢提供15年的塌陷保固給顧客。</p>
        <p style={{ marginBottom: 14, lineHeight: 1.85 }}>為了讓您的乳膠床墊壽命更長，只要好好把握幾個小技巧</p>
        <Link href="/blog/takecare-latex-bed/" style={DARK_LINK}>
          👉 延長乳膠床墊壽命的6訣竅，使用超過十年沒問題！
        </Link>
      </div>
    ),
  },
  {
    q: "乳膠床墊如何清潔與保養？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>天然乳膠床墊的內層基本上是不會發霉的，因為乳膠中的橡樹蛋白酶能抑制細菌、蟎蟲孳生，且透氣性佳，若有發霉的狀況通常是床墊的外層布套，您可以依照此方式處理：</p>
        <ol style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>調製清潔液：使用清水與小蘇打粉1：0.5的比例混和</li>
          <li>使用牙刷沾取清潔液，輕輕沾塗刷洗發霉處</li>
          <li>再用乾布擦拭清潔處將水分收乾</li>
          <li>接著讓布料自然陰乾或使用電風扇將布料吹乾即可</li>
        </ol>
        <p style={{ marginBottom: 14, lineHeight: 1.85 }}>做好平時的保養更能省去清潔上的麻煩，您可透過定期更換床單、使用吸塵器清除表面灰塵、套上保潔墊或避免在床上飲食等方法，讓您擁有乾淨舒適的睡眠環境！</p>
        <Link href="/blog/latex-mattress-cleaning/" style={DARK_LINK}>
          👉 【乳膠床墊清潔及保養指南】維持乾淨舒適的睡眠環境
        </Link>
      </div>
    ),
  },
  {
    q: "為什麼乳膠床墊比較貴？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>乳膠床墊的價格與原料息息相關，天然乳膠是由至少培育六年的橡樹，使用人工採集的方式取得高品質乳膠汁液所製成，另外一張乳膠床墊的乳膠含量與密度也是真正的價值所在，含量不夠高便能被稱作合成乳膠，含有致癌物質，我們非常不建議消費者選用，若有選購乳膠床墊需求，您需要了解，一張好的天然乳膠床墊的含量會在85%到97%之間。</p>
        <p style={{ marginBottom: 14, lineHeight: 1.85 }}>另外因應使用者睡眠需求，床墊還會再加上舒適層、支撐層與提升透氣性等功能，我們相信能夠提供給使用者的安穩睡眠的床墊才是好床墊！</p>
        <Link href="/blog/latex-mattress-price/" style={DARK_LINK}>
          👉 乳膠床墊真的有比較貴嗎？價格組成大公開
        </Link>
      </div>
    ),
  },
  {
    q: "乳膠床墊剛拆封有一股味道是正常的嗎？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>這是正常的喔！若您有到門市體驗過，發現門市的乳膠床墊沒有味道，那是因為Lunio門市所展示的乳膠床墊已經拆封一段時間了，味道隨時間自然的消散了。</p>
        <p style={{ lineHeight: 1.85 }}>Lunio乳膠床墊是採用天然乳膠製成，剛拆封時會有股淡淡的乳膠味，這股味道對人體並不會造成影響，因此過敏體質、孕婦或嬰兒都能夠安心使用，不需要太擔心！</p>
      </div>
    ),
  },
  {
    q: "乳膠床墊要怎麼回收？",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>乳膠床墊與一般床墊的回收方式一樣，以下兩種管道可以協助您進行床墊回收：</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16, lineHeight: 2 }}>
          <li>
            <strong>當地環保局清潔隊舊床墊回收</strong>
            <br /><span style={{ fontSize: 13.5, color: "#555" }}>多數為免費服務，須提前一日以上聯繫回收事宜，並將床墊搬至一樓門口等待清運。</span>
          </li>
          <li style={{ marginTop: 6 }}>
            <strong>民營業者床墊舊床墊回收</strong>
            <br /><span style={{ fontSize: 13.5, color: "#555" }}>如需緊急處理舊床墊或有搬運困難的問題，可聯繫有床墊回收服務的民營業者，費用為$1500起跳。</span>
          </li>
          <li style={{ marginTop: 6 }}>
            <strong>床墊捐獻</strong>
            <br /><span style={{ fontSize: 13.5, color: "#555" }}>若舊床墊本身並無損壞或是塌陷，也可以考慮捐贈舊床墊給弱勢團體扶助基金會或其他有需求者。</span>
          </li>
        </ul>
        <Link href="/blog/mattress-recycle/" style={{ ...DARK_LINK, marginBottom: 16, display: "inline-flex" }}>
          👉 床墊回收這樣做：方法、價格一篇全解答！
        </Link>
        <p style={{ lineHeight: 1.85, marginTop: 12 }}>若購買Lunio床墊的顧客，可以用超優惠價$800 給付予床墊運送人員，請他們協助回收舊床墊，在收到新床墊的同時便可為您處理舊床墊，免再聯繫環保局清潔隊，省去繁瑣的溝通作業。</p>
      </div>
    ),
  },
  {
    q: "乳膠床墊好嗎？我還有其他疑問...",
    content: (
      <div>
        <p style={{ marginBottom: 16, lineHeight: 1.85 }}>別擔心，Lunio身為乳膠床墊專家及多年接觸消費者的經驗，非常了解大家乳膠床墊的各種疑難雜症，我們另外整理了常見的五大疑問，幫您更了解乳膠床墊挑選及使用上的問題。</p>
        <Link href="/blog/latex-5-benefit/" style={{ ...DARK_LINK, marginBottom: 16, display: "inline-flex" }}>
          👉 「乳膠床墊好嗎？」5大常見疑問幫您解答！
        </Link>
        <p style={{ lineHeight: 1.85, marginTop: 14 }}>若您有任何購買前的疑慮，歡迎直接點擊右下角聊天按鈕與我們客服直接詢問。</p>
      </div>
    ),
  },
];

export default function LatexFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: "#fff", padding: "clamp(48px,6vw,72px) 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: BLUE, marginBottom: 48 }}>
          乳膠床墊常見問題｜FAQ
        </h2>
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e4e8f0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
                }}
              >
                <span style={{ fontSize: "clamp(14px,1.3vw,16px)", fontWeight: 600, color: open === i ? BLUE : NAVY, lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  border: `1.5px solid ${open === i ? BLUE : "#ccd"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: open === i ? BLUE : "#999", fontSize: 16,
                  transform: open === i ? "rotate(180deg)" : "none",
                  transition: "transform 0.25s",
                }}>∧</span>
              </button>
              {open === i && (
                <div style={{ padding: "4px 0 24px", fontSize: "clamp(13px,1.05vw,15px)", color: "#444", lineHeight: 1.85, animation: "faqIn 0.2s ease" }}>
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes faqIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }`}</style>
    </section>
  );
}
