// ─── Desktop / Mobile Nav (matches live lunio.com.tw menu) ───────────────────
// Keys are display labels; values are hrefs.
// "床墊", "枕頭", "寢具配件" render as dropdowns — see components/layout/nav/desktop-menu.tsx
export const mainMenu = {
  "床墊": "/shop/category/mattress",
  "枕頭": "/shop/category/pillow",
  "寢具配件": "/shop/category/bedding",
  "門市試躺": "/pages/contact",
  "領取優惠": "/shop/category/campaign10000",
  "關於Lunio": "/pages/about",
  "好眠知識": "/posts",
} as const;

// ─── Products mega-dropdown ───────────────────────────────────────────────────
export const productMenu = {
  mattresses: {
    label: "床墊",
    labelEn: "Mattresses",
    href: "/shop/category/mattress",
    items: [
      { label: "Lunio Gen 4 石墨烯乳膠床墊", href: "/shop/lunio-latex-mattress" },
      { label: "Quantum Max 乳膠獨立筒", href: "/shop/lunio-quantum" },
      { label: "NOOZ Helix 乳膠獨立筒", href: "/shop/nooz-helix" },
      { label: "NOOZ Sunset Pro 乳膠床墊", href: "/shop/nooz-sunset" },
      { label: "Moonlight Plus 記憶床墊", href: "/shop/nooz-moonlight" },
      { label: "FlexiRest Topper 日式薄墊", href: "/shop/category/topper" },
      { label: "查看全部床墊 →", href: "/shop/category/mattress" },
    ],
  },
  pillows: {
    label: "枕頭",
    labelEn: "Pillows",
    href: "/shop/category/pillow",
    items: [
      { label: "HyperCool 智能工學護頸枕", href: "/shop/lunio-hypercool" },
      { label: "IceFit SmartCurve 涼感護頸枕", href: "/shop/lunio-icefit" },
      { label: "Embrace 多功能擁抱枕", href: "/shop/lunio-embrace" },
      { label: "Nebula 經典記憶枕", href: "/shop/lunio-nebula" },
      { label: "Mercury 石墨烯記憶枕", href: "/shop/lunio-mercury" },
      { label: "查看全部枕頭 →", href: "/shop/category/pillow" },
    ],
  },
  bedding: {
    label: "寢具配件",
    labelEn: "Bedding",
    href: "/shop/category/bedding",
    items: [
      { label: "SnowWeave 智能天絲被套", href: "/shop/lunio-snowweave" },
      { label: "SnowSilk 智能涼被", href: "/shop/lunio-snowsilk" },
      { label: "SmartGuard 防水保潔墊", href: "/shop/lunio-protector" },
      { label: "SnowWeave 天絲床包組", href: "/shop/tencel-bedsheet" },
      { label: "查看全部配件 →", href: "/shop/category/bedding" },
    ],
  },
} as const;

// ─── Blog content nav ─────────────────────────────────────────────────────────
export const contentMenu = {
  categories: "/posts/categories",
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
      { label: "床墊", href: "/shop/category/mattress" },
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
      { label: "體驗分享", href: "/posts/categories" },
      { label: "好眠知識", href: "/posts" },
      { label: "門市資訊", href: "/pages/contact" },
    ],
  },
  support: {
    label: "客戶服務",
    items: [
      { label: "預約門市試躺", href: "/pages/contact" },
      { label: "購物車", href: "/cart" },
      { label: "我的帳戶", href: "/account" },
      { label: "常見問題", href: "/pages/faq" },
    ],
  },
} as const;
