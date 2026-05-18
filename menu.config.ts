// ─── Desktop / Mobile Nav (matches live lunio.com.tw menu) ───────────────────
// Keys are display labels; values are hrefs.
// "床墊", "枕頭", "寢具配件", "門市試躺", "關於Lunio" render as dropdowns
export const mainMenu = {
  "床墊": "/mattress",
  "枕頭": "/shop/category/pillow",
  "寢具配件": "/shop/category/bedding",
  "門市試躺": "/storefront",
  "關於Lunio": "/pages/about",
  "領取優惠": "/shop/category/campaign10000",
  "網紅體驗": "/influencers",
  "好眠知識": "/blog",
} as const;

// ─── Store dropdown ───────────────────────────────────────────────────────────
export const storeMenu = {
  label: "門市試躺",
  labelEn: "Stores",
  href: "/storefront",
  items: [
    { label: "所有門市", href: "/storefront" },
    { label: "台北門市", href: "/storefront/taipei" },
    { label: "桃園門市", href: "/storefront/taoyuan" },
    { label: "新竹新生活門市", href: "/storefront/hsinchu" },
    { label: "台中門市", href: "/storefront/taichung" },
    { label: "台南旗艦店", href: "/storefront/tainan" },
    { label: "高雄旗艦店", href: "/storefront/kaohsiung" },
  ],
} as const;

// ─── About dropdown ───────────────────────────────────────────────────────────
export const aboutMenu = {
  label: "關於Lunio",
  labelEn: "About",
  href: "/pages/about",
  items: [
    { label: "產品購物須知", href: "/faq" },
    { label: "品牌故事",     href: "/our-story" },
    { label: "媒體專訪",     href: "/press" },
  ],
} as const;

// ─── Products mega-dropdown ───────────────────────────────────────────────────
export const productMenu = {
  mattresses: {
    label: "床墊",
    labelEn: "Mattresses",
    href: "/mattress",
    items: [
      { label: "Lunio Gen 4 石墨烯乳膠床墊", href: "/product/lunio-latex-mattress" },
      { label: "Quantum Max 乳膠獨立筒", href: "/product/lunio-quantum" },
      { label: "NOOZ Helix 乳膠獨立筒", href: "/product/nooz-helix" },
      { label: "NOOZ Sunset Pro 乳膠床墊", href: "/product/nooz-sunset" },
      { label: "Moonlight Plus 記憶床墊", href: "/product/nooz-moonlight" },
      { label: "FlexiRest Topper 日式薄墊", href: "/topper" },
      { label: "查看全部床墊 →", href: "/mattress" },
    ],
  },
  pillows: {
    label: "枕頭",
    labelEn: "Pillows",
    href: "/shop/category/pillow",
    items: [
      { label: "HyperCool 智能工學護頸枕", href: "/product/lunio-hypercool" },
      { label: "IceFit SmartCurve 涼感護頸枕", href: "/product/lunio-icefit" },
      { label: "Embrace 多功能擁抱枕", href: "/product/lunio-embrace" },
      { label: "Nebula 經典記憶枕", href: "/product/lunio-nebula" },
      { label: "Mercury 石墨烯記憶枕", href: "/product/lunio-mercury" },
      { label: "天然乳膠枕", href: "/product/pillows" },
      { label: "查看全部枕頭 →", href: "/shop/category/pillow" },
    ],
  },
  bedding: {
    label: "寢具配件",
    labelEn: "Bedding",
    href: "/shop/category/bedding",
    items: [
      { label: "SnowWeave 智能天絲被套", href: "/product/lunio-snowweave" },
      { label: "SnowSilk 智能涼被", href: "/product/lunio-snowsilk" },
      { label: "SmartGuard 防水保潔墊", href: "/product/lunio-protector" },
      { label: "SnowWeave 天絲床包組", href: "/product/tencel-bedsheet" },
      { label: "查看全部配件 →", href: "/shop/category/bedding" },
    ],
  },
} as const;

// ─── Extra mega-menu columns ─────────────────────────────────────────────────
export const mattressMenuExtra = [
  {
    items: [
      { label: "床墊 全系列",   href: "/mattress" },
      { label: "天然乳膠床墊",  href: "/latex-mattress" },
      { label: "獨立筒床墊",    href: "/pocket-spring-mattress" },
      { label: "薄床墊",        href: "/topper" },
      { label: "雙人床墊",      href: "/double-mattress" },
      { label: "單人床墊",      href: "/single-mattress" },
    ],
  },
  {
    items: [
      { label: "偏硬床墊",        href: "/product-tag/hard-mattress/" },
      { label: "軟硬適中床墊",    href: "/product-tag/medium-mattress/" },
      { label: "偏軟床墊",        href: "/product-tag/soft-mattress/" },
      { label: "護腰背床墊",      href: "/product-tag/backpain-mattress/" },
      { label: "涼感床墊 / 寢具", href: "/product-tag/cool-mattress/" },
      { label: "租屋床墊",        href: "/product-tag/rent-mattress/" },
      { label: "宿舍床墊",        href: "/product-tag/student-mattress/" },
    ],
  },
] as const;

export const pillowMenuExtra = [
  {
    items: [
      { label: "Butterfly 蝴蝶記憶枕",   href: "/product/nooz-butterfly" },
      { label: "Smart Curve 涼感護頸枕", href: "/product/lunio-icefit" },
      { label: "Lunio 天然乳膠枕",        href: "/product/pillows" },
    ],
  },
  {
    items: [
      { label: "Ergo 人體工學枕系列", href: "/ergo" },
      { label: "記憶枕 全系列",        href: "/shop/category/pillow" },
      { label: "蝶形記憶枕",           href: "/product/nooz-butterfly" },
      { label: "涼感記憶枕",           href: "/product/lunio-icefit" },
      { label: "護頸記憶枕",           href: "/product/lunio-hypercool" },
    ],
  },
] as const;

// ─── Blog content nav ─────────────────────────────────────────────────────────
export const contentMenu = {
  categories: "/blog",
  tags: "/posts/tags",
  authors: "/posts/authors",
} as const;

// ─── Shop utility ─────────────────────────────────────────────────────────────
export const shopMenu = {
  products: "/shop",
  cart: "/cart",
  account: "/account",
} as const;

// ─── Footer nav ───────────────────────────────────────────────────────────────
export const footerMenu = {
  shop: {
    label: "商品",
    items: [
      { label: "床墊", href: "/mattress" },
      { label: "枕頭", href: "/shop/category/pillow" },
      { label: "寢具配件", href: "/shop/category/bedding" },
      { label: "促銷活動", href: "/shop/category/campaign10000" },
      { label: "所有商品", href: "/shop" },
    ],
  },
  brand: {
    label: "關於 Lunio",
    items: [
      { label: "品牌故事", href: "/pages/about" },
      { label: "體驗分享", href: "/blog?category=experiences" },
      { label: "好眠知識", href: "/blog" },
      { label: "門市資訊", href: "/pages/contact" },
    ],
  },
  support: {
    label: "客戶服務",
    items: [
      { label: "預約門市試躺", href: "/pages/contact" },
      { label: "購物車", href: "/cart" },
      { label: "我的帳戶", href: "/account" },
      { label: "常見問題", href: "/faq" },
    ],
  },
} as const;
