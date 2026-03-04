import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import CollectionsSection from "./components/CollectionsSection";
import ContactFooter from "./components/ContactFooter";
import CursorGlow from "./components/CursorGlow";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import MusicButton from "./components/MusicButton";
import Navbar from "./components/Navbar";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyUsSection from "./components/WhyUsSection";
import { AppContext, type CartItem } from "./context/AppContext";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Intersection Observer for reveal animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal-section");
    for (const el of elements) {
      observerRef.current?.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  // Re-observe after renders
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".reveal-section:not(.revealed)",
      );
      for (const el of elements) {
        observerRef.current?.observe(el);
      }
    }, 100);
    return () => clearTimeout(timer);
  });

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + delta }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Removed from wishlist", { description: "Item removed" });
      } else {
        next.add(id);
        toast.success("Added to wishlist!", { description: "Saved for later" });
      }
      return next;
    });
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        wishlist,
        cartOpen,
        musicPlaying,
        mobileMenuOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        setCartOpen,
        setMusicPlaying,
        setMobileMenuOpen,
      }}
    >
      <div className="relative min-h-screen overflow-x-hidden">
        <CursorGlow />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <CollectionsSection />
          <GallerySection />
          <WhyUsSection />
          <TestimonialsSection />
          <ContactFooter />
        </main>
        <CartDrawer />
        <MusicButton />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "oklch(0.10 0.005 20)",
              color: "oklch(0.97 0.02 85)",
              border: "1px solid oklch(0.72 0.14 78 / 0.4)",
            },
          }}
        />
      </div>
    </AppContext.Provider>
  );
}
