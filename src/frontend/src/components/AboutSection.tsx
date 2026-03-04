import { useEffect, useRef } from "react";

const timelineItems = [
  {
    year: "1398",
    title: "Origins of Maheshwar",
    description:
      "Rani Ahilyabai Holkar patronized the ancient art of weaving, establishing Maheshwar as a premier center of textile excellence along the sacred Narmada river.",
    side: "right",
  },
  {
    year: "1780",
    title: "The Golden Era",
    description:
      "Maheshwari sarees graced the royal courts of India. The distinctive five-stripe border and reversible fabric became symbols of regal sophistication.",
    side: "left",
  },
  {
    year: "1987",
    title: "Chouhan Handloom Founded",
    description:
      "Three generations of master weavers established Chouhan Handloom, preserving ancient techniques while embracing contemporary artistry.",
    side: "right",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description:
      "Shipping to 50+ countries worldwide, Chouhan Handloom brings the heritage of Maheshwar to fashion enthusiasts across every continent.",
    side: "left",
  },
];

export default function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
    );

    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    if (items) {
      for (const item of items) {
        observer.observe(item);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, oklch(0.94 0.03 80) 0%, oklch(0.97 0.02 85) 50%, oklch(0.94 0.03 75) 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.72 0.14 78) 0px, oklch(0.72 0.14 78) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, oklch(0.72 0.14 78) 0px, oklch(0.72 0.14 78) 1px, transparent 1px, transparent 20px)",
        }}
        aria-hidden="true"
      />

      {/* Top gold border */}
      <div className="gold-border-pattern w-full mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div className="reveal-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold/60" />
              <span className="text-xs font-body tracking-[0.3em] text-gold/60 uppercase">
                Heritage & Craft
              </span>
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-maroon mb-6 leading-tight">
              Our <span className="shimmer-gold-text">Heritage</span>
            </h2>

            <div className="space-y-4 text-maroon/70 font-body text-base leading-relaxed">
              <p>
                Nestled on the banks of the sacred Narmada river, Maheshwar has
                been the cradle of India's most exquisite handloom tradition for
                over six centuries. The Maheshwari saree — distinguished by its
                lustrous silk-cotton blend, geometric borders, and reversible
                fabric — is a UNESCO heritage craft recognized worldwide.
              </p>
              <p>
                Each saree is a canvas of devotion. Woven by hand on traditional
                pit looms, every thread is placed with intentional artistry
                passed down through generations. The iconic five-stripe border,
                the checks and stripes, the zari work — these are not patterns
                but stories.
              </p>
              <p>
                Chouhan Handloom was born from this living tradition. Our master
                weavers bring decades of expertise to every creation, ensuring
                that when you wear a Chouhan saree, you carry with you the
                spirit of Maheshwar itself.
              </p>
            </div>

            {/* Weaver image */}
            <div className="mt-8 rounded-sm overflow-hidden border border-gold/20 relative">
              <img
                src="/assets/generated/weaver-artisan.dim_800x600.jpg"
                alt="Master weaver at Maheshwar"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-ivory text-sm font-body italic">
                  "Every thread is a prayer."
                </p>
                <p className="text-gold text-xs font-body mt-1">
                  — Master Weaver, Maheshwar
                </p>
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div ref={timelineRef} className="relative reveal-section">
            <h3 className="font-display text-2xl font-semibold text-maroon mb-10 tracking-wide">
              Our Journey Through Time
            </h3>

            {/* Vertical line */}
            <div className="absolute left-[1.25rem] md:left-1/2 top-16 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />

            <div className="space-y-8 md:space-y-10">
              {timelineItems.map((item, index) => (
                <div
                  key={item.year}
                  className="timeline-item relative flex gap-6 md:gap-0"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Mobile layout: always left */}
                  <div className="md:hidden flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-gold bg-maroon-dark flex items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                    </div>
                  </div>
                  <div className="md:hidden flex-1 pb-2">
                    <span className="text-gold font-display font-bold text-xl">
                      {item.year}
                    </span>
                    <h4 className="text-maroon font-body font-semibold text-base mt-1">
                      {item.title}
                    </h4>
                    <p className="text-maroon/60 font-body text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Desktop layout: alternating */}
                  <div
                    className={`hidden md:flex w-full items-start gap-4 ${
                      item.side === "left" ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <div className="w-1/2 pt-1">
                      <span className="text-gold font-display font-bold text-2xl">
                        {item.year}
                      </span>
                      <h4 className="text-maroon font-body font-semibold text-base mt-1">
                        {item.title}
                      </h4>
                      <p className="text-maroon/60 font-body text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex justify-center w-10 relative">
                      <div className="w-10 h-10 rounded-full border-2 border-gold bg-maroon-dark flex items-center justify-center z-10 shadow-gold-sm">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      </div>
                    </div>
                    <div className="w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width texture strip */}
      <div className="mt-20 relative h-32 overflow-hidden">
        <img
          src="/assets/generated/texture-detail.dim_800x600.jpg"
          alt="Maheshwari fabric texture detail"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-transparent to-maroon-deep" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gold font-display text-lg md:text-2xl tracking-[0.4em] uppercase">
            ✦ Woven with Devotion ✦
          </p>
        </div>
      </div>

      {/* Bottom gold border */}
      <div className="gold-border-pattern w-full mt-0" />
    </section>
  );
}
