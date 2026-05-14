# Lunio Website — คู่มือแก้ไขเนื้อหา

คู่มือสำหรับแก้ไขข้อความ รูปภาพ เมนู และหน้า Home โดยไม่ต้องเข้าใจ code ทั้งหมด

---

## 1. ไฟล์ Config หลัก

### `brand.config.ts` — ข้อมูลแบรนด์และ copy ทั้งเว็บ

ไฟล์เดียวที่ควบคุม copy หลักทั้งหมด

#### Announcement Bar (แถบประกาศบนสุด)
```ts
announcement: {
  active: false, // true = แสดง, false = ซ่อน
  text: "ข้อความประกาศ →",
  href: "https://lunio.com.tw/...", // ลิงก์เมื่อคลิก
},
```

#### Hero (Banner หน้าแรก)
```ts
hero: {
  title: "睡得好，就是最幸福的事",   // หัวข้อหลักขนาดใหญ่
  subtitle: "Sleeping good, Healthy good", // หัวข้อรอง
  ctaPrimary: { label: "探索床墊", href: "/shop" }, // ปุ่มหลัก
},
```

#### Feature Strip (4 ไอคอนใต้ Hero)
```ts
featureStrip: [
  { icon: "🚚", title: "全台免運", desc: "免費到府配送安裝" },
  // แก้ icon, title, desc ได้เลย
],
```

#### Category Cards (3 การ์ดหมวดหมู่)
```ts
categories: [
  { label: "床墊", labelEn: "Mattresses", description: "...", href: "/shop/category/mattress" },
  // เพิ่ม/ลด/แก้ข้อความได้
],
```

#### Brand Promises (ตัวเลขสถิติ section สีเข้ม)
```ts
promises: [
  { number: "100", unit: "晚", title: "試睡保證", desc: "..." },
  // แก้ตัวเลขและข้อความได้
],
```

#### ข้อมูลร้าน
```ts
store: {
  phone: "0965-218-919",
  email: "support@lunio.com.tw",
  hours: "週一至週日　11:00 – 20:00",
  locations: [
    { name: "台北大安門市", address: "...", mapUrl: "..." },
    // เพิ่มสาขาได้ที่นี่
  ],
},
```

#### Social Links
```ts
social: {
  facebook: "https://...",
  instagram: "https://...",
  line: "https://...",
},
```

---

### `menu.config.ts` — เมนู Navigation และ Footer

#### Main Menu (เมนูบนสุด)
```ts
export const mainMenu = {
  "床墊": "/shop/category/mattress",
  "枕頭": "/shop/category/pillow",
  // เพิ่ม/ลบ/เปลี่ยน label และ href ได้
};
```

#### Product Mega-Menu (dropdown เมื่อ hover เมนูหลัก)
```ts
export const productMenu = {
  mattresses: {
    label: "床墊",
    items: [
      { label: "Lunio Gen 4", href: "/shop/lunio-latex-mattress" },
      // เพิ่ม/ลบสินค้าได้
    ],
  },
  // pillows, bedding เช่นเดียวกัน
};
```

#### Footer Menu
```ts
export const footerMenu = {
  shop: { label: "商品", items: [...] },
  brand: { label: "關於 Lunio", items: [...] },
  support: { label: "客戶服務", items: [...] },
};
```

---

### `site.config.ts` — ชื่อเว็บไซต์และ SEO พื้นฐาน
```ts
export const siteConfig = {
  site_name: "Lunio",
  site_description: "Lunio — ...",
  site_domain: "https://lunio.com.tw",
};
```

---

## 2. ลำดับ Section หน้า Home

แก้ได้ที่ **`app/page.tsx`** — เรียง JSX block ขึ้นลงตามต้องการ

| ลำดับ | Component | หมายเหตุ |
|-------|-----------|----------|
| 1 | `<Hero />` | Banner วิดีโอ |
| 2 | `<CategoryShowcase />` | 3 การ์ดหมวดหมู่ |
| 3 | `<ServiceCarousel />` | 5 การ์ด service |
| 4 | `<BrandStory />` | หัวข้อ + รูปใหญ่ + เนื้อหา |
| 5 | `<FeatureStrip />` | 4 ไอคอนสรุปจุดเด่น |
| 6 | `<Gen4Showcase />` | รายละเอียด Gen 4 |
| 7 | `<BeddingShowcase />` | Pillow + Snow Weave |
| 8 | `<ServicePromise />` | การรับประกันการจัดส่ง |
| 9 | `<CustomerReviews />` | รีวิวลูกค้า |
| 10 | `<ProductShowcase />` | แท็บสินค้า (ต้องการ `products` prop) |
| 11 | `<GrapheneSection />` | Feature blocks (ต้องการ `product` prop) |
| 12 | `<ProductGrid />` | Lunio Collection 8 ชิ้น |
| 13 | `<PromoBanner />` | CTA Banner สีเข้ม |
| 14 | `<BrandPromises />` | ตัวเลขสถิติ navy |
| 15 | `<ProductGrid />` | Pillow Collection 4 ชิ้น |
| 16 | `<StoreLocations />` | แผนที่/ที่อยู่สาขา |
| 17 | `<BlogSection />` | บทความล่าสุด |

> **หมายเหตุ:** `ProductShowcase` และ `GrapheneSection` รับ props จาก data fetch — ห้ามลบ props ออก

---

## 3. รูปภาพ

### ตำแหน่งไฟล์รูป

| รูป | ไฟล์ |
|-----|------|
| Logo | `/public/brand/Lunio-logo-white.webp` |
| Hero video | `/public/brand/hero.mp4` |
| Brand Story | `/public/images/brand/brand-story.webp` |
| Category — 床墊 | `/public/brand/cat-mattress.webp` |
| Category — 枕頭 | `/public/brand/cat-pillow.webp` |
| Category — 寢具配件 | `/public/brand/cat-bedding.webp` |
| Service carousel | `/public/images/services/service-1.webp` ถึง `service-5.webp` |

### วิธีเปลี่ยนรูป
1. วางไฟล์ใหม่ในโฟลเดอร์ `/public/` ตามที่ระบุด้านบน
2. ใช้ชื่อไฟล์เดิม (แนะนำ `.webp` สำหรับ performance)
3. หรือเปลี่ยน path ใน component ที่ใช้รูปนั้น

### วิธีเปลี่ยน Logo
1. วางไฟล์ใน `/public/brand/`
2. แก้ใน `brand.config.ts`:
```ts
logo: {
  src: "/brand/ชื่อไฟล์ใหม่.webp",
  width: 120,  // ปรับตาม aspect ratio จริง
  height: 55,
},
```

---

## 4. Environment Variables

ไฟล์ `.env.local` (ไม่ commit ขึ้น git)

```env
WORDPRESS_URL="https://example.com"
WORDPRESS_HOSTNAME="example.com"
WORDPRESS_WEBHOOK_SECRET="secret-key"
NEXT_PUBLIC_WORDPRESS_URL="https://example.com"

WC_CONSUMER_KEY="ck_xxx"
WC_CONSUMER_SECRET="cs_xxx"
```

> การตั้งค่า payment gateway (Stripe, PayPal ฯลฯ) ทำใน WordPress Admin ไม่ใช่ในไฟล์นี้

---

## 5. งานที่ทำบ่อย

### ซ่อน/แสดง Announcement Bar
`brand.config.ts` → `announcement.active: false / true`

### เปลี่ยนข้อความ Hero
`brand.config.ts` → `hero.title`, `hero.subtitle`, `hero.ctaPrimary.label`

### เพิ่มสินค้าใน Mega-menu
`menu.config.ts` → `productMenu.mattresses.items` (หรือ pillows / bedding)

### เปลี่ยนลำดับ section หน้า Home
`app/page.tsx` → ย้าย JSX block ขึ้นลง

### เพิ่มสาขาใหม่
`brand.config.ts` → `store.locations` → เพิ่ม object ใหม่

### แก้ข้อมูลติดต่อ
`brand.config.ts` → `store.phone`, `store.email`, `store.hours`

---

## 6. คำสั่ง Dev

```bash
pnpm dev      # เปิด dev server (localhost:3000)
pnpm build    # build production
pnpm lint     # ตรวจสอบ code
```
