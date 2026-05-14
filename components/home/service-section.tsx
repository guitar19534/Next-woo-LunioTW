import Image from "next/image";

export function ServiceSection() {
  return (
    <section className="bg-white py-12 md:py-16">

      {/* ── Section Opener Heading ──────────────────────────────────────── */}
      <div className="text-center overflow-hidden">
        <p
          className="font-bold mb-4"
          style={{ color: "#17569E", fontSize: "clamp(18px, 2.5vw, 30px)", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.3em" }}
        >
          我們的服務
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
          SERVICES
        </p>
      </div>

      {/* ── Image + Text — shared container ─────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-12" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src="/images/services/Service-PCMobile.webp"
            alt="Lunio 服務承諾"
            fill
            priority={false}
            sizes="(max-width: 1320px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-left" style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>

          <p className="mb-8 whitespace-pre-line">
            {"全台免運費、免樓層費，並協助安裝床墊 舊床免費搬至一樓，或優惠價清運回收\n床墊免費寄倉，配合搬家與安床時間 "}
          </p>
        </div>

      </div>

    </section>
  );
}
