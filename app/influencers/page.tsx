import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "名人體驗分享｜Lunio Taiwan",
  description: "藝人明星、Youtuber、部落客體驗Lunio乳膠床墊與枕頭，真實分享好眠心得。",
  alternates: { canonical: "/influencers" },
};

const BLUE  = "#17569E";
const NAVY  = "#17284b";
const VT    = "/influencers/Video Thumb";
const RI    = "/influencers/review-img";
const FONT  = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

/* ─── Data ───────────────────────────────────────────────────────────────── */
const CELEBRITIES: { title: string; desc: string; img: string; videoId: string }[] = [
  { title: "有了Signature床墊，維恩不用跟老公分房睡了",            desc: "Signature床墊可各自調整軟硬度，夫妻再也不用為了床墊喜好分房睡啦！",             img: `${VT}/Cover-VDO-Signature_06.jpg`,        videoId: "PLACEHOLDER" },
  { title: "誰才是真正的陳晨威？揭開打擊之神的秘密武器",            desc: "運動閃到腰？Quantum Max的完美支撐，讓運動量大的陳晨威遠離疲勞酸痛",          img: `${VT}/Cover-VDO-QTM_02.jpg`,             videoId: "PLACEHOLDER" },
  { title: "嚴正嵐找到新室友啦，好眠神器驚喜來臨！",               desc: "室友帶來好眠神器Gen4床墊，改善睡眠，讓嚴正嵐更有活力迎接新夢想",             img: `${VT}/Lunio-VDO-Cover-June_16-9.jpg`,    videoId: "PLACEHOLDER" },
  { title: "熱愛運動的房思瑜，終於挑到放鬆緊繃肌肉的床墊",          desc: "喜歡Quantum Max的6大理由，讓房思瑜每天都期待回家睡覺",                       img: `${VT}/qtm-vdo.jpg`,                      videoId: "PLACEHOLDER" },
  { title: "教練康哥的魔鬼測試！Gen4 床墊能通過嗎？",              desc: "廢宗康率領啦啦隊，對Gen4乳膠床墊進行一連串魔鬼測試，來看Gen4的表現如何",       img: `${VT}/影片封面-庹宗康.webp`,              videoId: "PLACEHOLDER" },
  { title: "張立東獨家揭開7大秘密！Lunio Gen4 一夜好眠的秘密武器",  desc: "專為提升睡眠品質而研發的助眠神器，涼感、耐重、全身放鬆，Gen4床墊怎麼做到的？", img: `${VT}/Cover-VDO-Gen4.jpg`,               videoId: "PLACEHOLDER" },
  { title: "美女主播蔡尚樺的願望，回家就像睡在5星級飯店一樣",        desc: "什麼？不到5千元，就能享受5星級飯店睡感！Nooz Helix乳膠獨立筒床墊太好睡了",   img: `${VT}/影片封面-蔡尚樺.webp`,             videoId: "PLACEHOLDER" },
  { title: "浩子阿翔來Lunio踢館拉，準備迎接我們最刺激的時刻！",      desc: "實測看完就知道要買哪張床墊了，Lunio GEN3 Pro乳膠床好睡又能絲滑緩壓痛",      img: `${VT}/影片封面-浩角翔起.webp`,            videoId: "PLACEHOLDER" },
  { title: "許孟哲夫妻的家族挑戰，讓人忘記腰痛的Lunio乳膠床墊",      desc: "孟孟家族貫穿一堂，體驗Lunio乳膠床墊的舒適魔力！媽媽腰背全消，小寶貝也睡得著甜", img: `${VT}/影片封面-許孟哲.webp`,           videoId: "PLACEHOLDER" },
  { title: "台灣孔留小梁哥認證超好睡，Lunio Gen3石墨烯乳膠床墊",     desc: "睡眠真的好重要！只要睡得好整個人沒煩惱，來找Lunio幫全家大小挑一張好的床墊",   img: `${VT}/影片封面-小梁哥.webp`,             videoId: "PLACEHOLDER" },
  { title: "搖浪奶爸柯有倫偷挑中的，GEN3石墨烯乳膠床墊",            desc: "柯有倫為自己及他的寶貝女兒挑選了Lunio GEN3石墨烯乳膠床墊，你在猶豫什麼呢？",   img: `${VT}/影片封面-柯有倫.webp`,             videoId: "PLACEHOLDER" },
  { title: "微笑殺手潘君侖的充電小角落，一起躺在 Lunio GEN3床上進入夢鄉", desc: "在城市中全力以赴工作的你，是否想要有屬於自己的小角落，盡情放鬆、享受生活", img: `${VT}/影片封面-潘君侖.webp`,          videoId: "PLACEHOLDER" },
  { title: "知性氣質吳怡霈確認證！Lunio GEN3超強神床來囉",          desc: "真心推薦睡不好、多夢、長期腰背疼痛，Lunio床墊一定可以拯救你！",              img: `${VT}/影片封面-吳怡霈.webp`,             videoId: "PLACEHOLDER" },
  { title: "哈孝遠舒緩腰腹背痛的神隊友！Lunio天然乳膠床",           desc: "哈孝遠心目中最好的床墊！Lunio GEN3讓你的肌肉徹底放鬆",                     img: `${VT}/影片封面-哈孝遠.webp`,             videoId: "PLACEHOLDER" },
  { title: "彩樺姐舒緩腰腹背痛心法，全靠Lunio乳膠床墊",             desc: "有顏有保庇彩樺姐認證「千萬不能錯過」，Lunio床墊是腰背育痛的救星",             img: `${VT}/影片封面-彩樺姐.webp`,             videoId: "PLACEHOLDER" },
  { title: "仁甫季芹相處的秘密法寶！Lunio床墊讓全家人感情更好",      desc: "Lunio乳膠床太好睡，季妹妹與仁甫竟然考慮民宿過後換張床！",                    img: `${VT}/影片封面-仁甫季芹.webp`,           videoId: "PLACEHOLDER" },
  { title: "亞洲視帝謝祖武，興奮開箱Lunio乳膠床！",                 desc: "選離起床的肩頸腰痛就換這張，床墊層層設計都讓祖武哥讚不絕口！",                 img: `${VT}/影片封面-謝祖武.webp`,             videoId: "PLACEHOLDER" },
  { title: "孟哲罷要暖暖！甜鹹愛妳送孟孟Lunio天然乳膠床",           desc: "孟孟產後常睡眠不好，孟哲霸氣下訂Lunio乳膠床送老婆！找回新手媽媽的深層睡眠",   img: `${VT}/Thumbnail-Shortgun_Aug2024.jpg`,   videoId: "PLACEHOLDER" },
  { title: "小禎愛用床墊大公開！就是Lunio 乳膠床！",                desc: "人的一生有一半的時間都會花在睡眠上面，所以有好床真的很重要",                    img: `${VT}/影片封面-小禎.webp`,               videoId: "PLACEHOLDER" },
  { title: "果凍姐姐楊晨熙，專業俯皮開箱！",                        desc: "小資家庭必入手高CP值床墊，它可以讓你肩頸臂達到放鬆的狀態",                    img: `${VT}/影片封面-楊晨熙.webp`,             videoId: "PLACEHOLDER" },
  { title: "型男主持人郭彥鈞，率先開箱體驗Lunio！",                  desc: "Lunio有一個很好的抗震效果，非常適合有小孩的媽媽，不會牽一髮動全家",            img: `${VT}/影片封面-郭彥均.webp`,             videoId: "PLACEHOLDER" },
];

const YOUTUBERS: { title: string; desc: string; img: string; videoId: string }[] = [
  { title: "Lunio Gen4床墊，幫日本媳婦愛子贏得公婆心",              desc: "送公婆新床墊，支撐力好又能緩解腰背育痛的Lunio Gen4，讓老人家也讚不絕口！",   img: `${VT}/影片封面-aiko愛子.webp`,           videoId: "PLACEHOLDER" },
  { title: "愛子實測在Nooz Helix床上放雞蛋，躺上去到底會不會破？",   desc: "雞蛋在Nooz Helix獨立筒床墊，躺上去到底…這個床墊也太厲害了吧～",            img: `${VT}/maxresdefault (1).jpg`,            videoId: "PLACEHOLDER" },
  { title: "為什麼Nooz Helix乳膠獨立筒床墊，讓4M8ER睡得這麼滿意？", desc: "已經睡了好幾天，真的覺得很讚！床墊睡起來Q彈又包覆，怎麼都很舒服～",          img: `${VT}/影片封面-4M8ER.webp`,              videoId: "PLACEHOLDER" },
  { title: "田以熙換新床墊開箱，給你看Nooz Suset有多厲害",           desc: "好的床墊上天堂！如何選擇適合自己的床墊？居然躺在雞蛋上雞蛋不會破？",          img: `${VT}/影片封面-田以熙.webp`,             videoId: "PLACEHOLDER" },
  { title: "一樹的腰酸背痛睡不好，靠Lunio床墊來解決",               desc: "床墊凹掉、床太硬、住公寓的人，推薦這款創新材質Lunio Quantum乳膠獨立筒床墊！", img: `${VT}/影片封面-一樹.webp`,               videoId: "PLACEHOLDER" },
  { title: "避免情侶同居爆發衝突，凡清買了張Lunio床墊",              desc: "淺眠的你常因為枕邊人翻身聲翻來覆去嗎？Lunio帶來專為你打造的吸震床墊",        img: `${VT}/影片封面-凡清.webp`,               videoId: "PLACEHOLDER" },
  { title: "大胃王路路LuLu，為了貓主子換新床墊！",                   desc: "遠離跳蚤遠離臭臭，必備抗菌防蟎Lunio乳膠床墊",                               img: `${VT}/影片封面-大胃王lulu.webp`,         videoId: "PLACEHOLDER" },
  { title: "彼得爸與蘇珊媽，親子Youtuber也入坑！",                   desc: "我們試過Lunio床墊之後，就回不去了，還多買三張給家中長輩",                    img: `${VT}/影片封面-彼得爸與蘇珊媽.webp`,    videoId: "PLACEHOLDER" },
  { title: "日本媳婦愛子來台，幫自己和媽媽選最舒服的床",               desc: "結果一躺成主顧，躺起來真的有紮實感，人生第一次買床就獻給Lunio",              img: `${VT}/maxresdefault.jpg`,                videoId: "PLACEHOLDER" },
];

const BLOGGERS: { img: string; name: string; desc: string }[] = [
  { img: `${RI}/甜甜圈媽咪.webp`,                                       name: "甜甜圈媽咪",        desc: "每天睡醒都有精神，我只選擇Lunio石墨烯乳膠床墊" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-Dora妍希.webp`,                 name: "Dora妍希",          desc: "身邊有朋友推薦Lunio，超好睡！透氣有支撐，而且很值位平實CP值高" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-藍克Frank.webp`,                name: "藍克Frank",         desc: "你在找好睡的床墊嗎？專為東方人設計的舒適床墊，Lunio石墨烯乳膠床" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-秀的生活點滴.webp`,             name: "秀的生活點滴",      desc: "有孩子的家庭在挑選床墊的時候，會先考慮支撐性與穩固性" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-奧莉萱.webp`,                   name: "奧莉萱",            desc: "隨著年紀增長，越明白一件事，翻起來吃飯來睡很重要，可以比吃不好，一定要睡的好" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-崔普小哀.webp`,                 name: "小哀在崔普",        desc: "在網路上就多次看到有人推薦Lunio乳膠床墊，躺過之後讓人光速意願非常舒服！" },
  { img: `${RI}/名人推薦Lunio乳膠床墊-樂天甜心沐妍Moon.webp`,           name: "樂天甜心沐妍",      desc: "床墊很服貼我的身體，讓我更舒服放鬆的入睡，希望大家每天都有好眠" },
  { img: `${RI}/名人推薦Lunio乳膠床墊-樂天女神巫苡萱.webp`,             name: "樂天女神巫苡萱",    desc: "最近休假都睡超過10個小時，Lunio乳膠床墊每一躺都很厲害" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-天兵媽與小元寶.webp`,           name: "天兵媽與小元寶",    desc: "覺得可以防震的床墊特色也太棒了吧，整個超心動！" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-小吃貨安安.webp`,               name: "小吃貨安安",        desc: "朋友買了一張之後睡到現在都沒再腰酸背痛了！睡起超超超超的，就從此踏此不歸了" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-省錢王Jet.webp`,                name: "省錢王Jet",         desc: "實際試躺看這款很讚的泰國乳膠床墊！結果一躺成主顧，人生第一次買床就獻給Lunio" },
  { img: `${RI}/Youtuber推薦Lunio乳膠床墊-台南Josh.webp`,               name: "台南Josh",          desc: "換成乳膠床墊，躺下去就能包覆身體，軟硬適中人體工學，一覺到天亮睡得很好！" },
  { img: `${RI}/部落客推薦Lunio乳膠枕-酋姐.webp`,                       name: "酋姐",              desc: "來自泰國的Lunio人體工學天然乳膠枕，讓我很愛側睡的老毛精，直接從此不動如山" },
  { img: `${RI}/部落客推薦Lunio乳膠枕-跟著Qbaby看世界.webp`,            name: "跟著Qbaby看世界",   desc: "Lunio乳膠枕和乳膠床都是使用安全無毒的材質，純天然保障，給孩子用也更放心！" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-美人魚瑢妹妹.webp`,             name: "美人魚瑢妹妹",      desc: "嘗嘗買過很多床墊，Lunio軟硬度剛好，人體工學，讓我更舒服，腰背相應合適" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-北投之家.webp`,                 name: "北投之家",          desc: "優於傳統獨立筒的吸震力，跳起來旁邊放的水都不會溢出來" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-Jerrine.webp`,                  name: "Jerrine",           desc: "睡了近20年獨立筒後的我，決定對自己好一點，給自己傳統天然乳膠床墊！" },
  { img: `${RI}/部落客推薦Lunio乳膠床墊-漢娜.webp`,                     name: "那個漢娜Hannah",    desc: "Lunio乳膠枕居然貼心的出了「側睡」專用的枕頭！完全改善了我的腰痛問題" },
];

/* ─── Components ─────────────────────────────────────────────────────────── */
function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110"
        style={{ background: "rgba(255,30,30,0.92)", backdropFilter: "blur(4px)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

function VideoCard({ item, tag }: { item: typeof CELEBRITIES[0]; tag: string }) {
  const url = item.videoId === "PLACEHOLDER" ? "#" : `https://www.youtube.com/watch?v=${item.videoId}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(23,40,75,0.07)", border: "1px solid #f0f4fb" }}>
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image src={item.img} alt={item.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
        <PlayButton />
        {/* Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white font-semibold"
          style={{ fontSize: 11, backgroundColor: BLUE, letterSpacing: "0.05em" }}>
          {tag}
        </span>
      </div>
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          style={{ fontSize: 14.5, color: NAVY }}>
          {item.title}
        </h3>
        <p className="text-xs flex-1 line-clamp-2" style={{ color: "#8b95a7", lineHeight: 1.7 }}>
          {item.desc}
        </p>
        <div className="mt-3 flex items-center gap-1" style={{ color: BLUE, fontSize: 12, fontWeight: 600 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21.582 6.186A2.506 2.506 0 0 0 19.85 4.44C18.19 4 12 4 12 4s-6.19 0-7.85.44A2.506 2.506 0 0 0 2.418 6.186C2 7.84 2 11.3 2 11.3s0 3.46.418 5.114a2.506 2.506 0 0 0 1.732 1.746C5.81 18.6 12 18.6 12 18.6s6.19 0 7.85-.44a2.506 2.506 0 0 0 1.732-1.746C22 14.76 22 11.3 22 11.3s0-3.46-.418-5.114zM9.954 14.518l.001-6.437 5.249 3.219-5.25 3.218z"/></svg>
          觀看影片
        </div>
      </div>
    </a>
  );
}

function PhotoCard({ item }: { item: typeof BLOGGERS[0] }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(23,40,75,0.07)", border: "1px solid #f0f4fb" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image src={item.img} alt={item.name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        {/* Bottom gradient + name overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: "linear-gradient(to top, rgba(23,40,75,0.75) 0%, transparent 100%)" }} />
        <p className="absolute bottom-3 left-4 font-bold text-white" style={{ fontSize: 14 }}>{item.name}</p>
      </div>
      <div className="px-4 py-4">
        <p className="text-sm leading-relaxed" style={{ color: "#8b95a7", fontSize: 12.5, lineHeight: 1.75 }}>
          「{item.desc}」
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="mb-10">
      <p className="font-semibold mb-1.5 uppercase tracking-[4px]" style={{ fontSize: 11, color: BLUE }}>{en}</p>
      <h2 className="font-bold" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", color: NAVY }}>{zh}</h2>
      <div className="mt-4 h-px" style={{ background: `linear-gradient(to right, ${BLUE}, transparent)`, maxWidth: 120 }} />
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function InfluencersPage() {
  return (
    <main style={FONT}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 380, backgroundColor: "#0d1f3c" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/influencers/吳怡霈-真實體驗封面.webp" alt="名人體驗" fill
            className="object-cover object-center opacity-40" sizes="100vw" priority />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, rgba(23,86,158,0.7) 50%, transparent 100%)` }} />
        {/* Content */}
        <div className="relative max-w-[1200px] w-[88%] mx-auto flex flex-col justify-center" style={{ minHeight: 380, paddingTop: 60, paddingBottom: 60 }}>
          <p className="font-semibold mb-3 uppercase tracking-[5px]" style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Celebrity Reviews</p>
          <h1 className="font-bold leading-tight mb-6" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#fff", maxWidth: 560 }}>
            名人體驗<br />床墊與枕頭分享
          </h1>
          <p className="mb-8" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.65)", maxWidth: 420, lineHeight: 1.8 }}>
            藝人明星、Youtuber、部落客親身體驗 Lunio 床墊與枕頭，真實分享好眠心得
          </p>
          <Link href="/product/lunio-latex-mattress"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white hover:text-blue-700"
            style={{ border: "1.5px solid rgba(255,255,255,0.7)", color: "#fff", alignSelf: "flex-start", backdropFilter: "blur(4px)" }}>
            全新升級 Lunio Gen4 →
          </Link>
        </div>
      </section>

      {/* ── 藝人明星 ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f7f9fd" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <SectionTitle en="Celebrity Stars" zh="藝人明星 · 床墊開箱體驗" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CELEBRITIES.map((item, i) => <VideoCard key={i} item={item} tag="藝人明星" />)}
          </div>
        </div>
      </section>

      {/* ── Youtuber ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <SectionTitle en="YouTubers" zh="Youtuber · 床墊開箱體驗" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {YOUTUBERS.map((item, i) => <VideoCard key={i} item={item} tag="YouTuber" />)}
          </div>
        </div>
      </section>

      {/* ── 部落客 ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f7f9fd" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <SectionTitle en="Bloggers" zh="部落客 · 床墊枕頭開箱、門市試躺" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOGGERS.map((item, i) => <PhotoCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 text-center" style={{ backgroundColor: NAVY }}>
        <p className="font-semibold mb-2 uppercase tracking-widest" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Experience It Yourself</p>
        <h2 className="font-bold mb-6" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "#fff" }}>
          你也想體驗嗎？
        </h2>
        <p className="mb-8" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
          全台6間門市，歡迎預約試躺，專業睡眠顧問為你推薦最適合的床墊
        </p>
        <Link href="/storefront#booking"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: BLUE, color: "#fff" }}>
          立即預約試躺 →
        </Link>
      </section>

    </main>
  );
}
