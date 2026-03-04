import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const galleryImages = [
  {
    src: "/assets/generated/gallery-1.dim_800x1000.jpg",
    alt: "Maheshwari saree - Royal drape",
  },
  {
    src: "/assets/generated/gallery-2.dim_800x1000.jpg",
    alt: "Bridal collection showcase",
  },
  {
    src: "/assets/generated/gallery-3.dim_800x1000.jpg",
    alt: "Festive elegance",
  },
  {
    src: "/assets/generated/hero-saree.dim_1200x800.jpg",
    alt: "Premium silk collection",
  },
];

export default function GallerySection() {
  const [active, setActive] = useState(1); // center item

  const prev = useCallback(() => {
    setActive((c) => (c - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const next = useCallback(() => {
    setActive((c) => (c + 1) % galleryImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const getCardStyle = (index: number) => {
    const diff = (index - active + galleryImages.length) % galleryImages.length;
    // 0 = active, 1 = right, length-1 = left, others = hidden
    if (diff === 0) {
      return {
        transform: "perspective(1200px) rotateY(0deg) scale(1) translateZ(0px)",
        zIndex: 30,
        opacity: 1,
        filter: "none",
      };
    }
    if (diff === 1) {
      return {
        transform:
          "perspective(1200px) rotateY(-30deg) scale(0.8) translateX(50%) translateZ(-100px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
      };
    }
    if (diff === galleryImages.length - 1) {
      return {
        transform:
          "perspective(1200px) rotateY(30deg) scale(0.8) translateX(-50%) translateZ(-100px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
      };
    }
    return {
      transform: "perspective(1200px) scale(0.6) translateZ(-200px)",
      zIndex: 10,
      opacity: 0,
      filter: "brightness(0.5)",
      pointerEvents: "none" as const,
    };
  };

  return (
    <section
      id="gallery"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.95 0.02 78)" }}
    >
      {/* Ambient light orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.32 0.13 18 / 0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.14 78 / 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-xs font-body tracking-[0.3em] text-gold/60 uppercase">
              Visual Story
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-maroon">
            Royal <span className="shimmer-gold-text">Gallery</span>
          </h2>
          <p className="text-maroon/50 font-body text-base mt-3 max-w-md mx-auto">
            A visual journey through heritage and elegance
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="gallery-perspective relative h-[420px] md:h-[540px] flex items-center justify-center mb-12 reveal-section">
          {galleryImages.map((img, index) => (
            <button
              type="button"
              key={img.src}
              className="absolute transition-all duration-700 ease-out cursor-pointer bg-transparent border-0 p-0"
              style={{
                ...getCardStyle(index),
                width: "280px",
                height: "380px",
              }}
              onClick={() => setActive(index)}
              aria-label={`View ${img.alt}`}
            >
              <div className="w-full h-full rounded-sm overflow-hidden border border-gold/20 shadow-royal">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gold frame overlay on active */}
                {index === active && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 border-2 border-gold/30 rounded-sm" />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold" />
                  </div>
                )}
              </div>
              {index === active && (
                <div className="absolute -bottom-10 left-0 right-0 text-center">
                  <p className="text-maroon/70 text-sm font-body">{img.alt}</p>
                </div>
              )}
            </button>
          ))}

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 md:left-8 z-40 w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20 hover:border-gold transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 md:right-8 z-40 w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20 hover:border-gold transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-16">
          {galleryImages.map((img, i) => (
            <button
              type="button"
              key={img.src}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-gold w-6" : "bg-maroon/20 hover:bg-maroon/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {/* Masonry thumbnail grid */}
        <div className="reveal-section grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryImages.map((img, index) => (
            <button
              type="button"
              key={`thumb-${img.src}`}
              className={`relative rounded-sm overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-300 cursor-pointer group p-0 bg-transparent ${
                index % 3 === 0 ? "row-span-2" : ""
              }`}
              style={{ aspectRatio: index % 3 === 0 ? "3/4" : "1/1" }}
              onClick={() => setActive(index)}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-maroon-deep/0 group-hover:bg-maroon-deep/40 transition-colors duration-300" />
              {/* View icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full border border-gold text-gold flex items-center justify-center text-xs">
                  ✦
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
