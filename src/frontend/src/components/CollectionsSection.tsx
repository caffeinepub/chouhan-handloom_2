import { Check, Heart, ShoppingBag } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { type Product, categories, products } from "../data/products";

function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();
  const [addedState, setAddedState] = useState(false);
  const isWishlisted = wishlist.has(product.id);

  const handleAddToCart = useCallback(() => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
    setAddedState(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAddedState(false), 2000);
  }, [addToCart, product]);

  const handleWishlist = useCallback(() => {
    toggleWishlist(product.id);
  }, [toggleWishlist, product.id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="card-3d relative bg-card rounded-sm overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-400 group">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-maroon text-gold text-xs font-body font-semibold tracking-wider rounded-sm border border-gold/30">
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={16}
          className={`transition-all duration-200 ${isWishlisted ? "fill-maroon text-maroon" : "text-maroon/50"}`}
          style={isWishlisted ? { animation: "heart-pulse 0.3s ease" } : {}}
        />
      </button>

      {/* Image */}
      <div className="img-zoom-container aspect-[3/4] relative overflow-hidden bg-ivory-warm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-jet/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Quick view on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="text-xs text-ivory/80 font-body text-center">
            Click to view details
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gold/70 font-body tracking-widest uppercase">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-display font-semibold text-lg text-foreground mt-1 leading-snug group-hover:text-maroon transition-colors">
          {product.name}
        </h3>

        {/* Colors */}
        <div className="flex items-center gap-2 mt-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-gold/20 shadow-xs"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-xl text-gold">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-body font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 ${
              addedState
                ? "bg-green-700 text-white scale-95"
                : "bg-maroon text-gold hover:bg-maroon-light hover:shadow-maroon-md hover:scale-[1.02]"
            }`}
          >
            {addedState ? (
              <>
                <Check size={12} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <section
      id="collections"
      className="py-20 md:py-32 relative"
      style={{ background: "oklch(0.97 0.02 85)" }}
    >
      {/* Top border */}
      <div className="gold-border-pattern w-full mb-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/50" />
            <span className="text-xs font-body tracking-[0.3em] text-gold uppercase">
              Handwoven Excellence
            </span>
            <div className="h-px w-12 bg-gold/50" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-maroon mb-3">
            Our Collections
          </h2>
          <p className="text-maroon/60 font-body text-base max-w-xl mx-auto">
            Explore our curated range of authentic Maheshwari sarees, each a
            masterpiece of heritage craft.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="reveal-section flex flex-wrap justify-center gap-1 mb-10 border-b border-gold/20 pb-px">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`category-tab text-sm font-body font-medium tracking-wider transition-colors duration-200 ${
                activeCategory === cat.slug
                  ? "active text-maroon"
                  : "text-maroon/50 hover:text-maroon"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 reveal-section">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load more CTA */}
        <div className="text-center mt-12 reveal-section">
          <button
            type="button"
            className="px-10 py-3.5 border-2 border-maroon text-maroon font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-maroon hover:text-ivory transition-all duration-300"
          >
            View All Collections
          </button>
        </div>
      </div>

      {/* Bottom border */}
      <div className="gold-border-pattern w-full mt-16" />
    </section>
  );
}
