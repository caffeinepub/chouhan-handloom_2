import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
      >
        <rect
          x="6"
          y="20"
          width="36"
          height="4"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="8"
          width="4"
          height="32"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="18"
          y="8"
          width="4"
          height="32"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="26"
          y="8"
          width="4"
          height="32"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="34"
          y="8"
          width="4"
          height="32"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 36 C14 38 18 40 24 40 C30 40 34 38 34 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "100% Handwoven",
    description:
      "Every saree is crafted with traditional wooden handlooms by master artisans, preserving centuries of weaving heritage.",
    stat: "100%",
    statLabel: "Hand-crafted",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
      >
        <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 42 C12 34 36 34 36 42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 26 L24 42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="44" r="2" fill="currentColor" />
        <path
          d="M18 32 L24 38 L30 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Direct from Maheshwar",
    description:
      "Sourced directly from master weavers of Maheshwar, ensuring authenticity and supporting the artisan community.",
    stat: "3rd Gen",
    statLabel: "Weavers",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
      >
        <path
          d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Premium Quality Silk",
    description:
      "Finest Mulberry silk and traditional silk-cotton blends, each saree a testament to uncompromising quality.",
    stat: "GI Tagged",
    statLabel: "Certified",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
      >
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
        <ellipse
          cx="24"
          cy="24"
          rx="8"
          ry="16"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M8 24 L40 24" stroke="currentColor" strokeWidth="2" />
        <path d="M10 14 L38 14" stroke="currentColor" strokeWidth="2" />
        <path d="M10 34 L38 34" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Worldwide Shipping",
    description:
      "Delivered to 50+ countries with premium care packaging, bringing Maheshwari heritage to your doorstep.",
    stat: "50+",
    statLabel: "Countries",
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".feature-card-enter");
            let i = 0;
            for (const card of cards) {
              const idx = i;
              setTimeout(() => {
                card.classList.add("visible");
              }, idx * 150);
              i++;
            }
          }
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.02 85) 0%, oklch(0.94 0.03 80) 50%, oklch(0.96 0.025 78) 100%)",
      }}
    >
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, oklch(0.72 0.14 78) 0px, oklch(0.72 0.14 78) 1px, transparent 1px, transparent 30px)",
        }}
        aria-hidden="true"
      />

      {/* Top gold line */}
      <div className="gold-border-pattern w-full mb-0" />

      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"
      >
        {/* Header */}
        <div className="text-center mb-14 reveal-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-xs font-body tracking-[0.3em] text-gold/60 uppercase">
              Our Promise
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-maroon">
            Why Choose{" "}
            <span className="shimmer-gold-text">Chouhan Handloom</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card-enter"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="h-full p-6 rounded-sm border border-gold/20 hover:border-gold/50 transition-all duration-400 group relative overflow-hidden"
                style={{ background: "oklch(0.99 0.005 80)" }}
              >
                {/* Background shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, oklch(0.72 0.14 78 / 0.08) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Stat */}
                <div className="font-display font-bold text-3xl text-gold mb-0.5">
                  {feature.stat}
                </div>
                <div className="text-gold/50 text-xs font-body tracking-wider uppercase mb-3">
                  {feature.statLabel}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg text-maroon mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-maroon/60 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold/50 to-transparent transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-16 reveal-section">
          <blockquote className="font-display text-xl md:text-2xl text-maroon/80 italic max-w-2xl mx-auto leading-relaxed">
            "Each Maheshwari saree carries the blessing of the Narmada river and
            the devotion of its weavers."
          </blockquote>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gold/30" />
            <span className="text-gold/60 text-sm font-body">
              Chouhan Handloom
            </span>
            <div className="h-px w-16 bg-gold/30" />
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="gold-border-pattern w-full mt-16" />
    </section>
  );
}
