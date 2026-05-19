/**
 * Lunio Brand Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for brand assets, copy, store info, and UI content.
 *
 * HOW TO REPLACE THE LOGO
 * ───────────────────────
 * 1. Drop your file in /public/brand/   (SVG recommended; PNG or WebP also fine)
 * 2. Update logo.src below, e.g. "/brand/lunio-logo.svg"
 * 3. Update logo.width / logo.height to match your file's native aspect ratio
 * Note: a single dark logo works for both themes — nav applies `dark:invert`.
 */

export const brandConfig = {
  // ─── Logo ────────────────────────────────────────────────────────────────────
  logo: {
    src: "/brand/Lunio-logo-white.webp",
    width: 120,
    height: 55,
    alt: "Lunio",
  },

  // ─── Announcement bar (shows above the header) ────────────────────────────
  // Set `active: false` to hide it.
  announcement: {
    active: false, // ตั้งเป็น true เพื่อแสดง announcement bar
    text: "2026 春節出貨、營業時間公告 →",
    href: "https://lunio.com.tw/blog/notice-of-lunar-new-year/",
  },

  // ─── Hero copy ───────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "乳膠床墊首選",
    title: "睡得好，就是最幸福的事",
    subtitle: "Sleeping good, Healthy good",
    ctaPrimary: { label: "探索床墊", href: "/mattress" },
    ctaSecondary: { label: "預約門市試躺", href: "/pages/contact" },
    trustBadges: ["100 晚試睡保證", "全台免費配送", "10 年品質保固"],
  },

  // ─── Feature strip (below hero) ──────────────────────────────────────────────
  featureStrip: [
    { icon: "🚚", title: "全台免運", desc: "免費到府配送安裝" },
    { icon: "♻️", title: "舊床可處理", desc: "舊床回收，輕鬆換新" },
    { icon: "🛏️", title: "全台門市試躺", desc: "台北大安門市 歡迎預約" },
    { icon: "🌿", title: "天然乳膠 100%", desc: "泰國原產認證乳膠" },
  ],

  // ─── Showcase products (fetched from WooCommerce by slug) ────────────────────
  // Used in the 3-card flagship showcase section.
  showcaseSlugs: ["lunio-latex-mattress", "lunio-quantum", "nooz-helix"],

  // ─── Category cards ───────────────────────────────────────────────────────────
  categories: [
    {
      label: "床墊",
      labelEn: "Mattresses",
      description: "石墨烯乳膠・獨立筒・記憶床墊",
      href: "/mattress",
    },
    {
      label: "枕頭",
      labelEn: "Pillows",
      description: "工學護頸枕・涼感護頸枕・記憶枕",
      href: "/pillow",
    },
    {
      label: "寢具配件",
      labelEn: "Bedding",
      description: "天絲被套・智能涼被・防水保潔墊",
      href: "/bedding",
    },
  ],

  // ─── Brand promises (dark section) ───────────────────────────────────────────
  promises: [
    {
      number: "100",
      unit: "晚",
      title: "試睡保證",
      desc: "不滿意全額退款，零風險體驗",
    },
    {
      number: "10",
      unit: "年",
      title: "品質保固",
      desc: "完整售後服務，保障您的投資",
    },
    {
      number: "100",
      unit: "%",
      title: "天然乳膠",
      desc: "泰國原產認證，抗菌防蟎",
    },
    {
      number: "30",
      unit: "%",
      title: "提升深層睡眠",
      desc: "骨科醫師合作研發，科學實證",
    },
  ],

  // ─── Store info ──────────────────────────────────────────────────────────────
  store: {
    phone: "0965-218-919",
    email: "support@lunio.com.tw",
    hours: "週一至週日　11:00 – 20:00",
    locations: [
      {
        name: "台北大安門市",
        address: "台北市大安區安和路一段 85 號",
        mapUrl: "https://maps.google.com/maps?q=台北市大安區安和路一段85號",
      },
    ],
  },

  // ─── Socials ─────────────────────────────────────────────────────────────────
  social: {
    facebook: "https://www.facebook.com/LunioTW",
    instagram: "https://instagram.com/lunio.tw",
    line: "https://line.me/ti/p/@lunio",
  },
} as const;
