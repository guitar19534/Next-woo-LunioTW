import Image from "next/image";
import Link from "next/link";

export function OurstoreSection() {
  return (
    <section className="bg-white py-12 md:py-16">

      {/* ── Section Opener Heading ──────────────────────────────────────── */}
      <div className="text-center overflow-hidden">
        <p
          className="font-bold mb-4"
          style={{ color: "#17569E", fontSize: "clamp(18px, 2.5vw, 30px)", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.3em" }}
        >
          查找您附近的門市
        </p>
        <p
          aria-hidden
          className="font-bold select-none leading-none"
          style={{
            fontSize: "clamp(36px, 10vw, 100px)",
            fontFamily: "'Chiron Goround TC', sans-serif",
            fontWeight: 200,
            color: "#e8eaed",
            letterSpacing: "0.05em",
          }}
        >
          OUR STORE
        </p>
      </div>

      {/* ── Image + Text — shared container ─────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* Main image */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-12" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src="/images/store/Store-Cover.webp"
            alt="Lunio 門市"
            fill
            priority={false}
            sizes="(max-width: 1320px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-left mb-12" style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>
          <p className="mb-8 whitespace-pre-line">
            {"躺過才知道，Lunio 門市等你來試睡\nLunio 的床墊寢具，不只是用看的，更值得親身感受\n走進門市，躺一躺、翻個身、慢慢感受支撐與舒適\n讓專業顧問陪你找到真正適合自己的睡眠 "}
          </p>
        </div>

      </div>

      {/* ── Store illustration + CTA ─────────────────────────────── */}
      <div className="text-center">
        <div className="mb-8">
          <Image
            src="/images/store/Store-Cartoon.webp"
            alt="探索全台 Lunio 門市"
            width={1400}
            height={1000}
            className="w-full h-auto"
          />
        </div>

        <Link
          href="/storefront"
          className="inline-block px-10 py-4 rounded-full font-bold text-white"
          style={{ backgroundColor: "#17569E", fontSize: "16px", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.1em" }}
        >
          探索全台 Lunio 門市
        </Link>
      </div>

    </section>
  );
}
