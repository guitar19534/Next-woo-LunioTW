import Image from "next/image";

export function PillowLatexBenefitSection() {
  return (
    <section className="bg-white overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "1920 / 800" }}>
        <Image
          src="/pillowlatex/Benefit_PC.webp"
          alt="Lunio 天然乳膠枕特色"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Mobile */}
      <div className="md:hidden relative w-full" style={{ aspectRatio: "4 / 3" }}>
        <Image
          src="/pillowlatex/Benefit_Mobile.webp"
          alt="Lunio 天然乳膠枕特色"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
