import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { SearchDrawer, CartDrawer, ProfileDrawer } from "./nav-drawers";

const links: { label: string; to: string }[] = [
  { label: "Shop", to: "/shop" },
  { label: "Our Orchard", to: "/" },
  { label: "The Process", to: "/process" },
  { label: "Fruit Guide", to: "/guide" },
  { label: "Journal", to: "/" },
];

export function Nav() {
  const { count } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { scrollY } = useScroll();
  const padY = useTransform(scrollY, [0, 120], [22, 12]);
  const width = useTransform(scrollY, [0, 200], ["96%", "82%"]);
  const radius = useTransform(scrollY, [0, 200], [24, 999]);
  const blur = useTransform(scrollY, [0, 200], [8, 22]);
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(255,255,255,0.25)", "rgba(255,255,255,0.7)"],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px) saturate(160%)`);

  return (
    <>
      <motion.nav
        style={{ paddingTop: padY, paddingBottom: padY }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <motion.div
          style={{
            width,
            borderRadius: radius,
            backdropFilter: filter,
            WebkitBackdropFilter: filter,
            background: bg,
          }}
          className="flex items-center justify-between gap-6 border border-white/30 px-6 py-3 shadow-lg shadow-ink/5"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block size-6 rounded-full bg-gradient-to-br from-primary via-leaf to-accent-orange" />
            <span className="font-display text-lg font-extrabold uppercase tracking-tighter">
              Shirur Fruits.
            </span>
          </Link>
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="group relative text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-full hover:bg-white/60 transition-transform active:scale-95"
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              aria-label="Account"
              className="hidden size-10 place-items-center rounded-full hover:bg-white/60 sm:grid transition-transform active:scale-95"
            >
              <User className="size-4" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="relative grid size-10 place-items-center rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-transform"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent-orange text-[10px] font-bold text-white animate-pulse">
                  {count}
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Drawers */}
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
