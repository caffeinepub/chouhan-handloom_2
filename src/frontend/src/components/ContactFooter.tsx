import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const currentYear = new Date().getFullYear();

export default function ContactFooter() {
  const waLink = "https://wa.me/918962203433";
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <>
      {/* Contact Strip */}
      <section
        id="contact"
        className="py-10 relative overflow-hidden"
        style={{ background: "oklch(0.96 0.03 85)" }}
      >
        <div className="gold-border-pattern w-full absolute top-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Text */}
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl md:text-2xl font-bold text-maroon mb-1">
                Have a Question?
              </h3>
              <p className="text-maroon/70 font-body text-sm">
                Our team is here to help you find your perfect saree
              </p>
            </div>

            {/* Center: Contact info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
              <a
                href="tel:+918962203433"
                className="flex items-center gap-2 text-maroon/80 hover:text-maroon transition-colors font-body text-sm"
              >
                <Phone size={14} className="text-amber-700" />
                <span>+91 89622 03433</span>
              </a>
              <a
                href="mailto:info@veerahandloom.com"
                className="flex items-center gap-2 text-maroon/80 hover:text-maroon transition-colors font-body text-sm"
              >
                <Mail size={14} className="text-amber-700" />
                <span>info@veerahandloom.com</span>
              </a>
              <div className="flex items-center gap-2 text-maroon/60 font-body text-sm">
                <MapPin size={14} className="text-amber-700" />
                <span>
                  98, Vinoba Bhave Marg, Near Ahilya Fort, Maheshwar, MP 451228
                </span>
              </div>
              <div className="flex items-center gap-2 text-maroon/60 font-body text-sm font-semibold">
                <Clock size={14} className="text-amber-700" />
                <span>BUSINESS HOURS :- 9:00 AM to 8:00 PM ( Open Daily)</span>
              </div>
            </div>

            {/* Right: WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-green-500 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex-shrink-0"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative"
        style={{ background: "oklch(0.93 0.04 80)" }}
      >
        <div className="gold-border-pattern w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <img
                  src="/assets/generated/logo-transparent.dim_400x120.png"
                  alt="Veera Handloom"
                  className="h-10 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const span = document.createElement("span");
                    span.className =
                      "font-brand font-bold text-xl shimmer-gold-text tracking-wider";
                    span.textContent = "Veera Handloom";
                    target.parentElement?.appendChild(span);
                  }}
                />
              </div>
              <p className="text-maroon/60 font-body text-sm leading-relaxed max-w-xs mb-4">
                Authentic Maheshwari sarees handcrafted with centuries-old
                artistry. Preserving India's textile heritage since 1987.
              </p>
              {/* Address & Hours */}
              <div className="mb-6 space-y-1">
                <p className="text-maroon/60 font-body text-xs flex items-start gap-1.5">
                  <MapPin
                    size={12}
                    className="text-amber-700 mt-0.5 flex-shrink-0"
                  />
                  98, Vinoba Bhave Marg, Near Ahilya Fort,
                  <br />
                  Maheshwar, Madhya Pradesh 451228
                </p>
                <p className="text-maroon/60 font-body text-xs flex items-center gap-1.5 font-semibold">
                  <Clock size={12} className="text-amber-700 flex-shrink-0" />
                  BUSINESS HOURS :- 9:00 AM to 8:00 PM ( Open Daily)
                </p>
              </div>
              {/* Social links */}
              <div className="flex gap-3">
                {[
                  {
                    Icon: SiInstagram,
                    href: "https://www.instagram.com/veera_handloom",
                    label: "Instagram",
                  },
                  { Icon: SiFacebook, href: "#", label: "Facebook" },
                  { Icon: SiX, href: "#", label: "X (Twitter)" },
                  {
                    Icon: SiYoutube,
                    href: "https://youtube.com/@maheshwarisari?si=j49sgY1qTcEjwN7x",
                    label: "YouTube",
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href !== "#" ? "_blank" : undefined}
                    rel={href !== "#" ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-full border border-amber-700/30 flex items-center justify-center text-maroon/50 hover:text-amber-700 hover:border-amber-700 transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-body font-semibold text-amber-700 text-sm tracking-widest uppercase mb-4">
                Shop
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Pure Maheshwari",
                  "Silk Sarees",
                  "Cotton Sarees",
                  "Bridal Collection",
                  "Festive Special",
                  "New Arrivals",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#collections"
                      className="text-maroon/60 hover:text-maroon font-body text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-body font-semibold text-amber-700 text-sm tracking-widest uppercase mb-4">
                About
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Our Story",
                  "Heritage & Craft",
                  "Master Weavers",
                  "Sustainability",
                  "Press & Media",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#about"
                      className="text-maroon/60 hover:text-maroon font-body text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-body font-semibold text-amber-700 text-sm tracking-widest uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Size Guide",
                  "Care Instructions",
                  "Shipping Info",
                  "Return Policy",
                  "Track Order",
                  "FAQ",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#contact"
                      className="text-maroon/60 hover:text-maroon font-body text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-amber-700/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-maroon/40 font-body text-xs text-center md:text-left">
              © {currentYear} Veera Handloom. All rights reserved.
            </p>
            <p className="text-maroon/40 font-body text-xs text-center">
              Handcrafted with ❤️ in Maheshwar, India
            </p>
            <a
              href={caffeineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon/30 hover:text-amber-700/60 font-body text-xs transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
