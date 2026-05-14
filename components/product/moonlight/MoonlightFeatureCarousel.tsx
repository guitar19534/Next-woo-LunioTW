import Image from "next/image";

const ICONS = [
  { src: "/moonlight/冷凝膠icon.webp",                    line1: "冷凝膠",    line2: "調節溫度好睡眠"   },
  { src: "/moonlight/icon-服貼扎實躺感軟硬適中.png",       line1: "服貼扎實",  line2: "躺感軟硬適中"     },
  { src: "/moonlight/icon-優異人體工學舒緩痠痛.png",       line1: "人體工學",  line2: "舒緩腰酸背痛"     },
  { src: "/moonlight/icon-防止塵蟎細菌降低過敏原.png",     line1: "防蟎抗菌",  line2: "避免過敏原孳生"   },
];

export function MoonlightFeatureCarousel() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[900px] w-[90%] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ICONS.map((item) => (
            <div key={item.line1} className="flex flex-col items-center gap-3 text-center">
              <Image
                src={item.src}
                alt={item.line1}
                width={120}
                height={120}
                className="object-contain"
              />
              <div>
                <p className="font-medium" style={{ fontSize: 15, color: "#17284b" }}>{item.line1}</p>
                <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 2 }}>{item.line2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
