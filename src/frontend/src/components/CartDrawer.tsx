import { ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useAppContext();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleCheckout = () => {
    toast("Feature coming soon!", {
      description:
        "Checkout will be available shortly. Thank you for your patience.",
    });
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={`backdrop fixed inset-0 z-40 bg-jet-dark/60 border-0 p-0 cursor-default ${cartOpen ? "visible" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-label="Close cart"
      />

      {/* Drawer */}
      <section
        className={`cart-drawer fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col ${cartOpen ? "open" : ""}`}
        style={{ background: "oklch(0.09 0.003 20)" }}
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gold" />
            <h2 className="font-display font-semibold text-ivory text-lg">
              Your Cart
            </h2>
            {cartItems.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-maroon text-ivory text-xs flex items-center justify-center">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-ivory/60 hover:text-gold hover:bg-gold/10 transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Gold separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div
                className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center"
                style={{ background: "oklch(0.12 0.01 20)" }}
              >
                <ShoppingBag size={32} className="text-gold/40" />
              </div>
              <div>
                <p className="text-ivory/60 font-body text-sm">
                  Your cart is empty
                </p>
                <p className="text-ivory/30 font-body text-xs mt-1">
                  Add handcrafted sarees to begin your journey
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  document
                    .querySelector("#collections")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 border border-gold/40 text-gold font-body text-sm rounded-sm hover:bg-gold/10 transition-colors"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-3 p-3 rounded-sm border border-gold/10 hover:border-gold/20 transition-colors"
                style={{ background: "oklch(0.12 0.01 20)" }}
              >
                {/* Image */}
                <div className="w-16 h-20 rounded-sm overflow-hidden flex-shrink-0 border border-gold/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-ivory text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-ivory/40 font-body text-xs mt-0.5">
                    {item.category}
                  </p>
                  <p className="text-gold font-display font-bold text-base mt-1">
                    {formatPrice(item.price)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-ivory font-body text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                  className="self-start p-1 text-ivory/30 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-gold/20 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-ivory/60 font-body text-sm">Subtotal</span>
              <span className="font-display font-bold text-gold text-lg">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <p className="text-ivory/30 font-body text-xs">
              Shipping calculated at checkout
            </p>

            {/* Checkout button */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 bg-gold text-jet font-body font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-bright transition-all duration-200 hover:shadow-gold-md"
            >
              Proceed to Checkout
            </button>

            {/* Continue shopping */}
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="w-full py-2.5 border border-gold/30 text-gold/70 font-body text-sm rounded-sm hover:border-gold hover:text-gold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </section>
    </>
  );
}
