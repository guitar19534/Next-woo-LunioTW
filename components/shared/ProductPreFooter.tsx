import Image from "next/image";
import Link from "next/link";
import { ReviewSection } from "@/components/home/review-section";

interface Props {
  title?: string;
  leftImage?: string;
  rightImage?: string;
  leftAlt?: string;
  rightAlt?: string;
}

export function ProductPreFooter({
  title = "Smart Sleep with Lunio",
  leftImage = "/images/prefooter/Smart-Sleep-L.webp",
  rightImage = "/images/prefooter/Smart-Sleep-R.webp",
  leftAlt = "Lunio 床墊",
  rightAlt = "Lunio 生活照",
}: Props) {
  return (
    <>
      {/* ── Smart Sleep 2-col ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] w-[90%] mx-auto">
          <p className="text-center mb-8" style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#17284b" }}>
            {title}
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
              <Image src={leftImage} alt={leftAlt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 45vw" />
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
              <Image src={rightImage} alt={rightAlt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Store Section ── */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          <Image
            src="/images/prefooter/Store-1.webp"
            alt="Lunio 門市"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "#31303060" }} />
          {/* Text + button overlay */}
          <div className="absolute top-[10%] left-0 right-0 text-center px-4" style={{ fontFamily: "'MiSansTC', 'Noto Sans TC', sans-serif" }}>
            <h2 className="font-medium mb-3" style={{ fontSize: "clamp(20px, 2.8vw, 32px)", color: "#111" }}>
              找間離你最近門市享受片刻午憩
            </h2>
            <p className="mb-1" style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "#fff" }}>
              別只是遠觀，親身躺下，感受每一寸細膩與呵護
            </p>
            <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "#fff" }}>
              花上 10 分鐘，讓我們靜靜相識，體驗真正的舒適與自在
            </p>
          </div>
          {/* Button */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <Link
              href="/pages/contact"
              className="inline-block px-8 py-3 rounded-full font-medium text-white whitespace-nowrap"
              style={{ backgroundColor: "#17569E", fontSize: "15px" }}
            >
              尋找附近的商店
            </Link>
          </div>
        </div>
      </section>

      {/* ── Review Section — bottom ── */}
      <ReviewSection image="/images/prefooter/Review.webp" inlineHeader />
    </>
  );
}
