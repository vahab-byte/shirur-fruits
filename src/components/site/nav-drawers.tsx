import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { 
  X, 
  Search, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  User, 
  Award, 
  Clock, 
  Tag, 
  Heart,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { PRODUCTS, ShopProduct } from "@/lib/products";
import { toast } from "sonner";

// ==========================================
// 1. SEARCH OVERLAY
// ==========================================
interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      // Lock scroll when open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/65 backdrop-blur-md"
          />

          {/* Search box container */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative z-10 w-full bg-white px-6 py-8 border-b border-border shadow-2xl"
          >
            <div className="mx-auto max-w-4xl flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-4 flex items-center text-foreground/40">
                  <Search className="size-5" />
                </span>
                <input
                  type="text"
                  autoFocus
                  placeholder="Search our heritage orchards (e.g. Mangosteen, Mosambi, Grapes)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-cream py-3 pl-12 pr-6 text-sm placeholder-foreground/40 focus:border-primary focus:bg-white focus:outline-none transition-all"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-border text-foreground/50 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-border bg-cream p-3 hover:bg-border transition-colors shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="mx-auto max-w-4xl mt-6 max-h-[50vh] overflow-y-auto pr-2 divide-y divide-border">
                {searchResults.length === 0 ? (
                  <div className="text-center py-10">
                    <AlertCircle className="size-6 mx-auto text-foreground/30 mb-2" />
                    <p className="text-xs font-semibold text-foreground/50">No fruits match your search</p>
                  </div>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 hover:bg-cream/45 px-3 rounded-2xl transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-cream p-1.5 flex items-center justify-center shrink-0 border border-border">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-tight text-foreground group-hover:text-primary">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-foreground/50 italic line-clamp-1">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-cream border border-border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-foreground/60">
                          {product.category}
                        </span>
                        <span className="text-xs font-bold text-foreground/80">${product.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* Suggestions when query is empty */}
            {!query.trim() && (
              <div className="mx-auto max-w-4xl mt-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-foreground/40">Trending Searches</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Mangosteen", "Mosambi", "Blood Orange", "Dragonfruit", "Sitaphal"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full bg-cream border border-border px-3.5 py-1 text-[10px] font-bold text-foreground/75 hover:bg-foreground hover:text-background transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// 2. SHOPPING CART DRAWER
// ==========================================
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const confirmCheckout = () => {
    clearCart();
    setIsCheckoutOpen(false);
    onClose();
    toast.success("Order Placed Successfully! 📦 We'll deliver within 48 hours.", {
      duration: 5000,
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />

            {/* Slider panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col justify-between bg-white border-l border-border shadow-2xl p-6 md:p-8"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-5 text-primary" />
                    <h3 className="font-display text-lg font-black uppercase tracking-tight">Your Cart</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-leaf">
                      {items.length} items
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full border border-border p-2 hover:bg-cream transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2 divide-y divide-border">
                  {items.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingBag className="size-10 mx-auto text-foreground/20 mb-4" />
                      <p className="text-sm font-bold uppercase tracking-wider text-foreground/60">Your cart is empty</p>
                      <p className="text-xs text-foreground/40 mt-1">Explore our shop to add organic orchard treats.</p>
                      <Link
                        to="/shop"
                        onClick={onClose}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background hover:bg-primary transition-colors"
                      >
                        Start Shopping <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between py-4 group">
                        <div className="flex items-center gap-3">
                          <div className="size-16 rounded-2xl bg-cream p-2 border border-border flex items-center justify-center shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-foreground line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-foreground/50">{item.product.weight}</p>
                            <div className="mt-2 flex items-center gap-1.5 rounded-full border border-border bg-white p-0.5 w-max scale-90 origin-left">
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                className="grid size-6 place-items-center rounded-full hover:bg-cream"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                className="grid size-6 place-items-center rounded-full hover:bg-cream"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 justify-between h-full">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-accent-orange text-foreground/30 transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                          <span className="text-xs font-bold text-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Subtotal and Checkout Button */}
              {items.length > 0 && (
                <div className="border-t border-border pt-6 mt-4">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider text-foreground">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[9px] text-foreground/50 mt-1">Temperature-controlled express packaging and tax calculated at checkout.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={clearCart}
                      className="rounded-full border border-border bg-white py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/75 hover:bg-cream transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="rounded-full bg-foreground py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background hover:bg-leaf transition-colors flex items-center justify-center gap-1"
                    >
                      Checkout <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Dialog Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-ink/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-border bg-white p-6 md:p-8 shadow-2xl"
            >
              <div className="text-center">
                <CheckCircle2 className="size-12 text-leaf mx-auto mb-3" />
                <h3 className="font-display text-xl font-black uppercase tracking-tight">Checkout Confirmation</h3>
                <p className="text-xs text-foreground/60 mt-1">Confirm your organic orchard order.</p>

                <div className="my-6 rounded-2xl border border-border bg-cream p-4 text-left divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 text-xs">
                      <span className="font-bold text-foreground/80 truncate pr-4">
                        {item.product.name} <span className="text-foreground/45 font-medium">({item.quantity}x)</span>
                      </span>
                      <span className="font-semibold text-foreground/70">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 mt-1 font-bold text-sm text-foreground">
                    <span>Order Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="rounded-full border border-border bg-white py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/75 hover:bg-cream transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCheckout}
                    className="rounded-full bg-foreground py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background hover:bg-leaf transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// 3. USER PROFILE / MEMBER DRAWER
// ==========================================
interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          {/* Slider panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col justify-between bg-white border-l border-border shadow-2xl p-6 md:p-8"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <User className="size-5 text-primary" />
                  <h3 className="font-display text-lg font-black uppercase tracking-tight">Your Account</h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-border p-2 hover:bg-cream transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* VIP Card */}
              <div className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-leaf to-emerald-950 p-6 text-white shadow-xl shadow-leaf/10">
                <div className="absolute right-4 top-4 opacity-15">
                  <Award className="size-20" />
                </div>
                <span className="rounded-full bg-white/20 border border-white/10 px-3 py-1 text-[8px] font-extrabold uppercase tracking-widest text-white">
                  VIP Platinum Member
                </span>
                <h4 className="mt-6 font-display text-2xl font-black uppercase tracking-tight leading-none">
                  Vahab Byte
                </h4>
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 block">Member Points</span>
                    <span className="text-xl font-black uppercase tracking-tight">4,850 Pts</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 block">Card Number</span>
                    <span className="text-xs font-mono font-bold">SF-0043-9821</span>
                  </div>
                </div>
              </div>

              {/* Menu options / Details */}
              <div className="mt-8 space-y-4">
                {/* Points Progress */}
                <div className="rounded-2xl border border-border bg-cream/40 p-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-2">
                    <span>Next Reward Progress:</span>
                    <span>850 / 1000 Pts</span>
                  </div>
                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                  <span className="text-[9px] text-foreground/45 mt-2 block">150 points away from a free seasonal heirloom box!</span>
                </div>

                {/* Account Details list */}
                <div className="divide-y divide-border text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-semibold text-foreground/50">Active Vouchers:</span>
                    <span className="font-bold text-leaf flex items-center gap-1"><Tag className="size-3.5" /> 10% OFF Box (PLATINUM10)</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-semibold text-foreground/50">Shipping Address:</span>
                    <span className="font-medium text-foreground/80 truncate max-w-64 text-right">VIP Orchard Villa, Shirur Road, MH</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-semibold text-foreground/50">Member tier:</span>
                    <span className="font-bold text-primary">Elite VIP (Free Delivery)</span>
                  </div>
                </div>

                {/* History */}
                <div className="pt-4 border-t border-border">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-foreground/40 block mb-2 flex items-center gap-1"><Clock className="size-3.5" /> Recent Orders</span>
                  <div className="space-y-2.5">
                    {[
                      { id: "#1208", date: "June 25, 2026", total: "$34.50", status: "Delivered" },
                      { id: "#1142", date: "May 18, 2026", total: "$125.00", status: "Delivered" }
                    ].map((order) => (
                      <div key={order.id} className="flex justify-between items-center bg-cream/35 border border-border/80 px-3.5 py-2.5 rounded-xl text-[11px]">
                        <div>
                          <span className="font-bold text-foreground">{order.id}</span>
                          <span className="text-[9px] text-foreground/40 block mt-0.5">{order.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-foreground block">{order.total}</span>
                          <span className="text-[9px] text-leaf font-bold block mt-0.5">{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logout button */}
            <div className="pt-6 border-t border-border">
              <button
                onClick={onClose}
                className="w-full rounded-full border border-border bg-white py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/60 hover:bg-cream transition-colors"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
