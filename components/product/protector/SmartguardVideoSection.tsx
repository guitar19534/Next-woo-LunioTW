const VIDEO_ID = "PLACEHOLDER_VIDEO_ID";

export function SmartguardVideoSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#000" }}>
      <div className="max-w-[1200px] w-[90%] mx-auto text-center">
        <h2 className="font-bold mb-2" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>
          智能好眠系列
        </h2>
        <p className="mb-10" style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(255,255,255,0.6)" }}>
          享受智慧寢具　全面升級睡眠
        </p>
        <div className="mx-auto" style={{ maxWidth: 420 }}>
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "9/16" }}>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
              title="Lunio Smartguard 智能防水保潔墊"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
