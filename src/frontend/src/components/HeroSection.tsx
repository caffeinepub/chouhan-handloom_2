import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import type * as THREE from "three";

// Flowing fabric mesh using distorted plane
function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[2.2, 3, 1]}>
        <planeGeometry args={[1, 1.4, 32, 32]} />
        <MeshDistortMaterial
          color="#6B1A2A"
          metalness={0.35}
          roughness={0.35}
          distort={0.15}
          speed={2}
          emissive="#3D0F1A"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Gold border frame */}
      <mesh scale={[2.35, 3.15, 1]} position={[0, 0, -0.01]}>
        <planeGeometry args={[1, 1.4, 1, 1]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

// Gold particles
function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} color="#C9A84C" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#D4AF37" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#6B1A2A" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#FFFFF0" />
      <FabricMesh />
      <GoldParticles />
      <Environment preset="sunset" />
    </Canvas>
  );
}

// CSS floating particles (fallback / additional)
function FloatingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

// Silk wave SVG background
function SilkWaves() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Wave 1 - Maroon */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[200%]"
        style={{
          animation: "silk-wave-1 8s ease-in-out infinite",
          opacity: 0.15,
        }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 L1200,200 L0,200 Z"
          fill="#6B1A2A"
        />
      </svg>
      {/* Wave 2 - Gold */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[200%]"
        style={{
          animation: "silk-wave-2 12s ease-in-out infinite reverse",
          opacity: 0.12,
        }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C150,40 350,160 600,80 C850,0 1050,160 1200,80 L1200,200 L0,200 Z"
          fill="#C9A84C"
        />
      </svg>
      {/* Wave 3 - Ivory */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[200%]"
        style={{
          animation: "silk-wave-3 10s ease-in-out infinite",
          opacity: 0.06,
        }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C300,160 500,20 800,120 C1000,180 1100,60 1200,120 L1200,200 L0,200 Z"
          fill="#FFFFF0"
        />
      </svg>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-maroon-dark/20 via-transparent to-jet-dark/40" />
    </div>
  );
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCollections = () => {
    document
      .querySelector("#collections")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "oklch(0.96 0.02 80)" }}
    >
      <SilkWaves />
      <FloatingParticles />

      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.32 0.13 18 / 0.3) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Ornament line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-xs font-body tracking-[0.3em] text-gold uppercase">
                Est. 1987 · Maheshwar, India
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.1] mb-4">
              <span className="text-maroon">Where Tradition</span>
              <br />
              <span className="text-maroon">Meets</span>{" "}
              <span className="shimmer-gold-text">Royal Elegance</span>
            </h1>

            {/* Brand line */}
            <p className="font-display text-xl md:text-2xl text-maroon/80 mb-4 tracking-wide">
              Chouhan Handloom, Maheshwar
            </p>

            {/* Body */}
            <p className="text-maroon/60 text-base md:text-lg font-body leading-relaxed mb-8 max-w-md">
              Handcrafted with centuries-old artistry from the banks of the
              Narmada. Each thread tells a story of heritage, devotion, and
              unmatched craftsmanship.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToCollections}
                className="px-7 py-3.5 bg-gold text-jet font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-bright transition-all duration-300 hover:shadow-gold-md hover:scale-[1.02] active:scale-95"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={scrollToAbout}
                className="px-7 py-3.5 border border-gold text-gold font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold/10 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Explore Collection
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "50+", label: "Countries" },
                { value: "10K+", label: "Happy Customers" },
                { value: "37yrs", label: "of Heritage" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-maroon/50 font-body tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Canvas */}
          <div
            className={`relative h-[400px] lg:h-[550px] transition-all duration-1200 delay-400 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Border frame */}
            <div className="absolute inset-0 rounded-sm border border-gold/20 pointer-events-none z-10" />
            <div className="absolute inset-1 rounded-sm border border-gold/10 pointer-events-none z-10" />

            {/* Three.js hero canvas */}
            <div className="hero-canvas w-full h-full">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  </div>
                }
              >
                <HeroCanvas />
              </Suspense>
            </div>

            {/* Overlay image for visual richness */}
            <div className="absolute inset-0 rounded-sm overflow-hidden mix-blend-overlay opacity-30 pointer-events-none">
              <img
                src="/assets/generated/hero-saree.dim_1200x800.jpg"
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>

            {/* Gold corner accents */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-6 h-6 pointer-events-none z-20`}
                style={{
                  background: pos.includes("top-0 left-0")
                    ? "linear-gradient(135deg, oklch(0.72 0.14 78) 0%, transparent 60%)"
                    : pos.includes("top-0 right-0")
                      ? "linear-gradient(225deg, oklch(0.72 0.14 78) 0%, transparent 60%)"
                      : pos.includes("bottom-0 left-0")
                        ? "linear-gradient(45deg, oklch(0.72 0.14 78) 0%, transparent 60%)"
                        : "linear-gradient(315deg, oklch(0.72 0.14 78) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-maroon/40 font-body tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown size={16} className="text-gold" />
        </div>
      </div>
    </section>
  );
}
