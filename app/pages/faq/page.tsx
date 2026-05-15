import type { Metadata } from "next";
import { FaqClient } from "@/components/faq/FaqClient";

export const metadata: Metadata = {
  title: "常見問題｜Lunio Taiwan",
  description: "Lunio 床墊與枕頭常見問題解答，包含產品須知、退換貨說明、運送說明、付款說明等。",
  alternates: { canonical: "/faq" },
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const PRODUCT_FAQS = [
  {
    q: "床墊尺寸",
    a: (
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <ol className="space-y-4" style={{ paddingLeft: "1.2em", listStyleType: "decimal" }}>
          <li>我們的床墊皆由手工製造，尺寸會有「正負5cm」差異，實屬正常，這是因為材料層具有一定的自然彈性拉伸跟收縮，請以實際收到的床墊長寬高為主。</li>
          <li>我們的床墊皆以台灣標準規格製作，若家中床架為日系品牌（如無印良品）或歐系品牌（如IKEA），尺寸會與台規有所差異，詳情請參考
            <a href="/blog" className="underline ml-1" style={{ color: BLUE }}>床墊尺寸：歐規、日規、美規尺寸差異，買床前必讀！</a>
          </li>
          <li>我們的標準單人床墊為「傳統單人尺寸」，目前國內所販售的單人床多數為單人加大尺寸，請先確認欲購買的單人床尺寸後再行購買，若購買尺寸錯誤恕不接受退換貨。</li>
          <li>
            <p className="mb-2">尺寸（長 × 寬）參考：</p>
            <div className="rounded-xl p-4 space-y-1.5" style={{ backgroundColor: "#f8faff" }}>
              {[["標準單人","89 × 188 公分"],["單人加大","104 × 188 公分"],["標準雙人","150 × 188 公分"],["雙人加大","180 × 188 公分"],["雙人特大","180 × 210 公分"]].map(([s,d]) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: BLUE }} />
                  <span className="font-medium" style={{ color: NAVY }}>{s}</span>
                  <span style={{ color: "#6b7280" }}>{d}</span>
                </div>
              ))}
            </div>
          </li>
        </ol>
      </div>
    ),
  },
  {
    q: "床墊開箱",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>床墊包裝採用真空壓縮技術（捲包式），請於收到貨的<strong>「二個月內」</strong>開箱，避免造成床墊主結構毀損。</li>
        <li>床墊開箱後約需要<strong>「半至一個月」</strong>回彈到最佳躺感，在這期間床墊有稍軟或折痕皆屬正常現象，可正常使用，無須擔心會影響回彈狀態。</li>
      </ol>
    ),
  },
  {
    q: "床墊保養",
    a: (
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <ol className="space-y-3" style={{ paddingLeft: "1.2em", listStyleType: "decimal" }}>
          <li>我們的床墊表布及內部結構，皆採用科技機能設計，<strong>不可拆除清洗！</strong>因表布纖維細緻，起毛球屬正常現象，不會影響床墊機能性。</li>
          <li>為了避免髒污滲透床墊，造成床墊孳生細菌與損壞，建議搭配
            <a href="/product/lunio-protector" className="underline mx-1" style={{ color: BLUE }}>防水防蟎保潔墊</a>及
            <a href="/product/tencel-bedsheet" className="underline ml-1" style={{ color: BLUE }}>床包</a>一起使用。
          </li>
          <li>平時可使用專用吸塵器清除床墊表面毛屑，並經常更換床單，即能達成簡單的床墊保養。</li>
          <li>床墊經使用會產生「2.5公分以內」的人體壓痕，為舒適層被壓密緊實的現象，將床墊頭尾轉向即可解決這個問題，若想避免人體壓痕的產生，使用3～6個月將頭尾轉向即可。</li>
          <li>若您購買的是乳膠床墊，因天然乳膠怕熱、怕紫外線等特性，<strong>千萬不可日曬！</strong></li>
        </ol>
      </div>
    ),
  },
  {
    q: "床墊保固",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>每張床墊品項皆有提供保固/保修範圍，僅限於正常使用下的磨損以及非人為瑕疵。</li>
        <li>購買前須自行確認好尺寸，選購尺寸錯誤不符合保固退換貨範圍。</li>
      </ol>
    ),
  },
  {
    q: "床墊及枕頭試躺",
    a: (
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <p>Lunio於北中南都有實體門市，讓您可以透過實際試躺體驗，並享有專業的一對一服務，幫您找到優質且適合您的床墊與枕頭。您可點擊下方門市了解位置資訊及預約，將為您優先保留體驗時段（預約保留十分鐘）。</p>
        <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#f8faff" }}>
          {[["台北門市","/storefront/taipei"],["新竹新生活門市","/storefront/hsinchu"],["台中門市","/storefront/taichung"],["台南旗艦店","/storefront/tainan"],["高雄旗艦店","/storefront/kaohsiung"],["全台門市資訊","/storefront"]].map(([n,h]) => (
            <a key={n} href={h} className="flex items-center gap-2 hover:underline" style={{ color: BLUE }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BLUE, flexShrink: 0 }} />{n}
            </a>
          ))}
        </div>
      </div>
    ),
  },
  {
    q: "床架選用問題",
    a: (
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <p>請選擇<strong>平板式床架</strong>，不建議使用排骨床架及網狀床架。</p>
        <p>間隙大過的床架缺乏受力的支撐點，床墊容易因受力不均而有凹陷或損壞的可能性，此不適用於保固範圍。</p>
      </div>
    ),
  },
  {
    q: "乳膠枕適應問題",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>若您長期使用的枕頭是屬於較沒有支撐力且偏軟，因乳膠枕擁有良好的Q彈支撐性，剛開始使用會需要時間適應，乳膠枕將會幫您維持身體自然曲線，提高睡眠品質。</li>
        <li>全新枕頭剛開封時，因還未接觸空氣，會是較扎實的狀態，待使用幾天後即會呈現更佳的觸感。</li>
      </ol>
    ),
  },
];

const SHOPPING_FAQS = [
  {
    q: "退換貨說明",
    a: (
      <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#f0f6ff", borderLeft: `3px solid ${BLUE}` }}>
          <p className="font-semibold mb-1" style={{ color: BLUE }}>【七天鑑賞期 退換貨政策】</p>
          <p>根據消費者保護法規定，線上購物享有七天內無條件解約的權利，並非無條件退款。</p>
        </div>
        <div>
          <p className="font-medium mb-2" style={{ color: NAVY }}>請留意以下情況：</p>
          <ol className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "decimal" }}>
            <li><strong>商品未拆封、未解壓縮：</strong>可於七天內無條件進貨並全額退款。</li>
            <li><strong>商品已拆封或解縮包裝：</strong>因影響商品完整性，退貨需酌收整新費用。</li>
          </ol>
        </div>
        <div>
          <p className="font-medium mb-2" style={{ color: NAVY }}>已拆封商品退換費用：</p>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5eaf5" }}>
            {[["Lunio系列床墊","每件 NT$5,000"],["Nooz系列床墊","每件 NT$2,500"],["配件","每件 NT$500"]].map(([item,fee]) => (
              <div key={item} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid #f0f4fb" }}>
                <span>{item}</span><span className="font-semibold" style={{ color: NAVY }}>{fee}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#fff9f0", borderLeft: "3px solid #f5a000" }}>
          <p className="font-semibold mb-2" style={{ color: "#b45309" }}>【以下情況無法退換貨】</p>
          <ul className="space-y-1" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
            <li>超過七天鑑賞期</li>
            <li>商品已使用、或有髒污、磨損、洗滌痕跡</li>
            <li>商品包裝不完整、外盒、配件、說明書缺失</li>
            <li>活動贈品、組合商品未完整退回</li>
          </ul>
        </div>
        <p className="text-xs pt-1" style={{ color: "#9ca3af" }}>下單即代表同意本退換貨條款。</p>
      </div>
    ),
  },
  {
    q: "取消訂單說明",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>若您採用「轉帳支付」，產品未寄出的情況下取消訂單，若非使用「國泰商業銀行」及「中國信託銀行」，退回款項將被扣除金流手續費。</li>
        <li>提醒您：進入放款程序後，退款時間約7-14個工作天（不含例假日），您可以致電銀行客服詢問退款進度。</li>
        <li>提醒您：信用卡於消費14天之後進行刷退，會被扣除手續費。</li>
      </ol>
    ),
  },
  {
    q: "試躺體驗說明",
    a: (
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <p>於北中南皆有 Lunio 實體門市，可進行試躺體驗，您可先預約時間保留時段，將由專業人員為您進行一對一服務。</p>
        <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#f8faff" }}>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>預約保留十分鐘，請準時抵達，謝謝！</p>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>床墊與枕頭屬個人貼身用品，因考量衛生因素，故「無提供100日試睡期」。</p>
          <p className="flex items-start gap-2"><span style={{ color: BLUE }}>→</span>明智消費避免衝動購物，建議先至門市體驗</p>
        </div>
      </div>
    ),
  },
  {
    q: "運送說明",
    a: (
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <p>全館床墊、枕頭等商品，皆享有本島免運費（偏遠地區及離島需支付運費），下單後將有專人聯繫告知費用。</p>
        <p className="font-medium" style={{ color: NAVY }}>我們提供兩種配送方式：</p>
        <div className="space-y-3">
          {[
            { title: "(1) 新竹物流（送至一樓）", desc: "現貨供貨出貨，約4個工作天內可收到床墊，請於訂單備註「新竹物流」。" },
            { title: "(2) 搬家公司（搬上樓及安裝定位）", desc: "現貨出貨後約14個工作天內收到，搬家公司會提前與您聯繫確認時間，請於訂單備註「有無電梯/樓層」。" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl p-4" style={{ backgroundColor: "#f8faff", border: "1px solid #e5eaf5" }}>
              <p className="font-semibold mb-1" style={{ color: NAVY }}>{item.title}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#fff9f0", borderLeft: "3px solid #f5a000" }}>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>宜花東離島地區不適用</p>
          <p className="flex items-start gap-2 mt-1"><span style={{ color: "#f5a000" }}>＊</span>因特殊地形、颱風或不可抗力因素，Lunio保有停止出貨時間的權利，造成不便敬請見諒。</p>
        </div>
      </div>
    ),
  },
  {
    q: "離島運送及支付說明",
    a: (
      <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
        若您為離島消費者，目前僅提供新竹物流配送，並無法使用貨到付款的方式進行支付，造成您的不便請見諒。
      </p>
    ),
  },
  {
    q: "舊床處理及費用",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>舊床可協助免費搬到一樓，您需先聯繫清潔隊處理。</li>
        <li>舊床協助回收優惠費 $800/床，請將費用直接給付給運送人員，能省去自行聯繫清潔隊回收的費用。</li>
        <li>舊床協助搬上樓，每層 $200起/床（依搬家公司標準），請將費用直接給付給運送人員。</li>
      </ol>
    ),
  },
  {
    q: "寄倉說明",
    a: (
      <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
        如因個人有床墊寄倉的需求，請於訂單備註「寄倉及寄達年月」，並於需出貨「前半個月」主動與我們Line客服聯繫。
      </p>
    ),
  },
  {
    q: "付款及發票說明",
    a: (
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
        <div>
          <p className="font-medium mb-2" style={{ color: NAVY }}>本公司提供以下付款方式：</p>
          <div className="rounded-xl p-4 space-y-1.5" style={{ backgroundColor: "#f8faff" }}>
            {["ATM 轉帳","貨到付款","信用卡付款（一次付清）","信用卡分期付款（3/6/12期零利率，僅限信用卡，不含Visa金融卡）"].map((m) => (
              <div key={m} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: BLUE }} />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#fff9f0", borderLeft: "3px solid #f5a000" }}>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>因銀行機制，刷超某金額時信用卡會被拒刷，請致電銀行客服告知狀況，若無法協助請洽Lunio客服。</p>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>單筆交易上限金額為 20 萬元，超過上限請洽客服協助處理。</p>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>個人（二聯式）發票一經開立，即無法更改及改開公司戶（三聯式）發票。</p>
          <p className="flex items-start gap-2"><span style={{ color: "#f5a000" }}>＊</span>為了善盡環保，發票一律改為Email寄送。</p>
        </div>
      </div>
    ),
  },
  {
    q: "誠信原則",
    a: (
      <ol className="space-y-3 text-sm leading-relaxed" style={{ color: "#374151", paddingLeft: "1.2em", listStyleType: "decimal" }}>
        <li>Lunio遵守誠信原則，尊重消費者權益，提供明確且合理之價格以供消費者參考，並只收取合理費用。</li>
        <li>辦理信據Lunio之標準，予不良紀錄消費者，保有不再販售及取消訂單的權利。</li>
      </ol>
    ),
  },
];

export default function FaqPage() {
  return (
    <FaqClient
      productFaqs={PRODUCT_FAQS}
      shoppingFaqs={SHOPPING_FAQS}
    />
  );
}
