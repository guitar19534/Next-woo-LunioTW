import { SnowWeaveFeatures, SnowWeavePricing } from "@/components/product/snowweave/SnowWeaveShowcase";

export function SnowWeaveSection() {
  return (
    <section className="bg-white py-12 md:py-16">

      {/* ── Section Opener Heading ──────────────────────────────────────── */}
      <div className="text-center overflow-hidden">
        <p
          className="font-bold mb-4"
          style={{ color: "#17569E", fontSize: "clamp(18px, 2.5vw, 30px)", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.3em" }}
        >
          智能天絲被套
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
          SNOWWEAVE
        </p>
      </div>

      {/* ── Image + Text — shared container ─────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* Video */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-12">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
          >
            <source src="/snowweave/snow-weave-vdo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text */}
        <div className="text-left" style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>

          <p className="mb-8">
            睡眠的時候，你的皮膚也在靜靜呼吸 
          </p>

          <p className="mb-8 whitespace-pre-line">
            {"那些微小的悶熱、黏膩或布料的觸感，常在不知不覺中干擾了你的深睡\n作為接觸肌膚的第一層，Lunio 床包使用100%萊賽爾天絲，絲滑、柔軟、乾爽\n微涼，讓肌膚好好呼吸 在安詳的夜晚，為你啟動一場最深層的身心修復"}
          </p>
        </div>

      </div>

      {/* ── Feature Carousel ────────────────────────────────────────── */}
      <SnowWeaveFeatures />

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <SnowWeavePricing />

    </section>
  );
}
