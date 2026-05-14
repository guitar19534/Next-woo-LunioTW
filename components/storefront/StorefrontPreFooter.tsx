import Image from "next/image";
import { BookingForm } from "@/components/storefront/BookingForm";

const NAVY = "#17284b";

const FREE_SERVICES = [
  { icon: "/storefront/Icon_Delivery_0.png",   label: "全台本島免運費" },
  { icon: "/storefront/Icon_stair_1-1.png",    label: "免費搬上樓" },
  { icon: "/storefront/Icon_recycle_1-1.png",  label: "協助舊床搬至一樓" },
  { icon: "/storefront/Icon_payment_1-1.png",  label: "12期0利率" },
  { icon: "/storefront/Icon_warehouse_1-1.png",label: "床墊可寄倉" },
  { icon: "/storefront/Icon_Box.png",          label: "真空裝箱好搬運" },
];

const BUNNY_VIDEO_ID = "PLACEHOLDER_BUNNY_VIDEO_ID";
const VIP_VIDEO_ID   = "PLACEHOLDER_VIP_VIDEO_ID";

export function StorefrontPreFooter() {
  return (
    <>
      {/* ── Booking Form ───────────────────────────────────────── */}
      <section id="booking" className="py-14 md:py-20" style={{ backgroundColor: "#f0f4fb" }}>
        <div className="max-w-[1100px] w-[88%] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
              <Image src="/storefront/Promo-Banner.webp" alt="Lunio促銷活動" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ── Trial Info ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1100px] w-[88%] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="font-bold mb-4 text-center md:text-left" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: NAVY }}>
              床墊試躺試睡，專家幫你評估
            </h2>
            <p className="mb-5" style={{ fontSize: 14, color: "#555", lineHeight: 1.85 }}>
              在 Lunio門市，不只可以試躺試睡床墊，更有專業睡眠顧問，依據你的體型、睡姿與睡眠習慣，進行評估分析，推薦合適的床墊與枕頭，幫你解決睡眠困擾
            </p>
            <div className="rounded-xl p-5" style={{ backgroundColor: "#f5f7fb", border: "1px solid #e5eaf5" }}>
              <p className="font-semibold mb-3" style={{ fontSize: 14, color: NAVY }}>床墊試躺建議：</p>
              <ol className="space-y-2" style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, paddingLeft: "1.2em", listStyleType: "decimal" }}>
                <li>穿寬鬆衣服前往，模擬睡覺時的穿著</li>
                <li>床墊要本人親測才準，夫妻情侶等同床者，請一起來試睡</li>
                <li>帶自己的枕頭來測試更好，因為枕頭高度會影響搭配的床墊</li>
                <li>至少試躺15～20分鐘，模擬平常習慣的睡姿</li>
              </ol>
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
            <iframe src={`https://www.youtube.com/embed/${BUNNY_VIDEO_ID}?rel=0`}
              title="Bunny 睡眠專家" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
          </div>
        </div>
      </section>

      {/* ── VIP Service ────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#f5f7fb", borderTop: "1px dashed #dde4f0" }}>
        <div className="max-w-[1100px] w-[88%] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
            <iframe src={`https://www.youtube.com/embed/${VIP_VIDEO_ID}?rel=0`}
              title="VIP級的買床服務" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
          </div>
          <div>
            <h2 className="font-bold mb-3" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: NAVY }}>VIP 級的買床服務</h2>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.85 }}>
              買床墊，不只要睡得好，服務也要夠到位<br />
              舊床墊要搬走？需要配合安床入厝時間？通通沒問題，交給我們就對了！
            </p>
          </div>
        </div>
      </section>

      {/* ── Free Services ──────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#f5f7fb", borderTop: "1px dashed #dde4f0" }}>
        <div className="max-w-[1100px] w-[88%] mx-auto">
          <h2 className="text-center font-semibold mb-10" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: NAVY }}>免費服務</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {FREE_SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 text-center">
                <Image src={s.icon} alt={s.label} width={64} height={64} className="object-contain" />
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
