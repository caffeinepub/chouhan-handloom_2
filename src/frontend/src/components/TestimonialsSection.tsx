import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Crimson Heritage saree I ordered was beyond my expectations. The craftsmanship is absolutely divine, and the fabric feels like pure luxury. It's like wearing a piece of art.",
    initials: "PS",
    color: "#6B1A2A",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "I wore the Bridal Splendor for my wedding. Every guest asked where I got it. Chouhan Handloom is truly the finest. The attention to detail in the zari work is breathtaking.",
    initials: "AR",
    color: "#8B4513",
  },
  {
    id: 3,
    name: "Meera Iyer",
    location: "Chennai",
    rating: 5,
    text: "Fast delivery, beautiful packaging, and the saree is exactly as shown. The gold zari work is exquisite. This is my third purchase and every single time I am amazed.",
    initials: "MI",
    color: "#2D5A27",
  },
  {
    id: 4,
    name: "Kavita Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Third purchase from Chouhan Handloom. Never disappointed. The cotton sarees are perfect for daily wear yet look premium. The quality is consistently outstanding.",
    initials: "KP",
    color: "#1A3A6B",
  },
  {
    id: 5,
    name: "Radha Verma",
    location: "Delhi",
    rating: 5,
    text: "I gifted a festive saree to my mother. She cried with joy. The quality and artistry are unmatched. You can feel the love and tradition woven into every thread.",
    initials: "RV",
    color: "#4A2060",
  },
];

function StarRating({
  rating,
  animate: shouldAnimate,
}: { rating: number; animate: boolean }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <span
          key={i}
          className={`text-lg transition-all duration-300 ${shouldAnimate ? "star-animate" : ""}`}
          style={{
            color:
              i < rating ? "oklch(0.80 0.16 80)" : "oklch(0.72 0.14 78 / 0.2)",
            animationDelay: shouldAnimate ? `${i * 100}ms` : "0ms",
            opacity: shouldAnimate ? 0 : 1,
          }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animatingStars, setAnimatingStars] = useState(true);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setAnimatingStars(false);
    setTimeout(() => setAnimatingStars(true), 50);
  }, []);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[active];

  return (
    <section
      id="reviews"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.02 85)" }}
    >
      {/* Pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.32 0.13 18) 0px, oklch(0.32 0.13 18) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, oklch(0.32 0.13 18) 0px, oklch(0.32 0.13 18) 1px, transparent 1px, transparent 32px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 reveal-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/50" />
            <span className="text-xs font-body tracking-[0.3em] text-gold uppercase">
              Testimonials
            </span>
            <div className="h-px w-12 bg-gold/50" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-maroon">
            What Our <span className="text-gold">Customers Say</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="reveal-section relative">
          {/* Large quote mark */}
          <div
            className="absolute -top-4 left-4 md:left-8 font-display text-8xl md:text-[10rem] leading-none select-none pointer-events-none"
            style={{ color: "oklch(0.72 0.14 78 / 0.15)" }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Testimonial card */}
          <div
            className="testimonial-slide relative rounded-sm border border-gold/20 overflow-hidden"
            style={{ background: "oklch(0.99 0.005 80)" }}
          >
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-maroon via-gold to-maroon" />

            <div className="p-8 md:p-12">
              {/* Stars */}
              <div className="mb-6">
                <StarRating rating={current.rating} animate={animatingStars} />
              </div>

              {/* Text */}
              <blockquote className="font-serif text-lg md:text-xl text-maroon/80 leading-relaxed mb-8 italic relative z-10">
                "{current.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-ivory font-display font-bold text-base flex-shrink-0"
                  style={{ background: current.color }}
                >
                  {current.initials}
                </div>
                <div>
                  <div className="font-display font-semibold text-maroon text-base">
                    {current.name}
                  </div>
                  <div className="text-maroon/50 font-body text-sm flex items-center gap-1">
                    <span>📍</span>
                    <span>{current.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-maroon hover:bg-maroon hover:text-ivory hover:border-maroon transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2 bg-maroon"
                      : "w-2 h-2 bg-maroon/20 hover:bg-maroon/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-maroon hover:bg-maroon hover:text-ivory hover:border-maroon transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="reveal-section mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center border-t border-gold/20 pt-12">
          {[
            { value: "10,000+", label: "Happy Customers" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
          ].map((badge) => (
            <div key={badge.label} className="group">
              <div className="font-display font-bold text-2xl md:text-3xl text-gold group-hover:scale-110 transition-transform duration-200 inline-block">
                {badge.value}
              </div>
              <div className="text-maroon/60 text-xs font-body tracking-wide mt-1 uppercase">
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
