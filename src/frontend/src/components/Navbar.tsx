import { Menu, Music, Music2, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const {
    cartCount,
    cartOpen,
    setCartOpen,
    musicPlaying,
    setMusicPlaying,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-scrolled" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group bg-transparent border-0 p-0"
          >
            <img
              src="/assets/generated/logo-transparent.dim_800x240.png"
              alt="Veera Handloom"
              className="h-12 md:h-14 w-auto object-contain"
              style={{ imageRendering: "auto", maxWidth: "200px" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".logo-text")) {
                  const span = document.createElement("span");
                  span.className =
                    "logo-text font-brand font-bold text-lg md:text-xl shimmer-gold-text tracking-wider";
                  span.textContent = "Veera Handloom";
                  parent.appendChild(span);
                }
              }}
            />
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 text-sm font-body font-medium text-maroon/80 hover:text-gold transition-colors duration-200 tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-px bg-gold transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Music Toggle */}
            <button
              type="button"
              onClick={() => setMusicPlaying(!musicPlaying)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 text-gold/70 hover:text-gold hover:border-gold transition-colors duration-200"
              aria-label="Toggle music"
              title="Traditional Instrumental"
            >
              {musicPlaying ? <Music size={16} /> : <Music2 size={16} />}
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition-all duration-200 group"
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-maroon border border-gold text-ivory text-xs flex items-center justify-center font-bold animate-bounce-cart">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 text-maroon hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-ivory/95 backdrop-blur-xl border-t border-gold/20`}
        >
          <ul className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 text-maroon/80 hover:text-gold font-body text-sm tracking-wide hover:bg-gold/10 rounded transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setMusicPlaying(!musicPlaying)}
                className="flex items-center gap-2 px-4 py-3 text-maroon/60 hover:text-gold text-sm tracking-wide"
              >
                {musicPlaying ? <Music size={16} /> : <Music2 size={16} />}
                <span>Traditional Music</span>
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
