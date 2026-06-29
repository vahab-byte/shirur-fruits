import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Heart, Eye, Plus, Star } from "lucide-react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  badgeTone?: "orange" | "yellow" | "primary";
  rating?: number;
  stock?: number;
  bg?: string;
  highlight?: boolean;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isHighlight = product.highlight;
  const tone =
    product.badgeTone === "primary"
      ? "bg-primary/15 text-leaf"
      : product.badgeTone === "yellow"
        ? "bg-accent-yellow/20 text-foreground"
        : "bg-accent-orange/15 text-accent-orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={cn(
        "group relative isolate aspect-[4/5] rounded-[2rem] p-6 will-change-transform md:p-8",
        "transition-shadow duration-500 hover:shadow-2xl hover:shadow-ink/15",
        isHighlight
          ? "bg-gradient-to-br from-primary to-leaf text-primary-foreground shadow-xl shadow-primary/30"
          : "border border-border bg-white/70 backdrop-blur-md",
      )}
    >
      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between">
        {product.badge ? (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
              isHighlight ? "bg-white/25 text-white" : tone,
            )}
          >
            {product.badge}
          </span>
        ) : (
          <span />
        )}
        <div className="flex flex-col items-end gap-1">
          {product.oldPrice ? (
            <span
              className={cn(
                "text-xs line-through",
                isHighlight ? "text-white/60" : "text-foreground/40",
              )}
            >
              ${product.oldPrice.toFixed(2)}
            </span>
          ) : null}
          <span className="font-editorial text-2xl font-bold">${product.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Image */}
      <div
        className="relative my-4 flex flex-1 items-center justify-center"
        style={{ transform: "translateZ(40px)" }}
      >
        <div
          className={cn(
            "absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-square rounded-full blur-2xl",
            isHighlight ? "bg-white/20" : "bg-foreground/5",
          )}
        />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative h-[80%] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
        />

        {/* Floating actions */}
        <div className="absolute right-0 top-2 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1">
          <IconAction>
            <Heart className="size-4" />
          </IconAction>
          <IconAction>
            <Eye className="size-4" />
          </IconAction>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em]",
            isHighlight ? "text-white/60" : "text-foreground/50",
          )}
        >
          {product.category}
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight md:text-2xl">
            {product.name}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Rating rating={product.rating ?? 4.8} mono={isHighlight} />
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest",
              isHighlight ? "text-white/70" : "text-primary",
            )}
          >
            <span className="size-1.5 rounded-full bg-current" />
            In stock
          </span>
        </div>
        <button
          className={cn(
            "group/btn mt-5 flex w-full items-center justify-between rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-all",
            isHighlight
              ? "bg-white text-primary hover:bg-cream"
              : "bg-foreground text-background hover:bg-leaf",
          )}
        >
          Add to Cart
          <span className="grid size-7 place-items-center rounded-full bg-current/10 transition-transform group-hover/btn:rotate-90">
            <Plus className="size-3" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function IconAction({ children }: { children: React.ReactNode }) {
  return (
    <button className="glass grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-white">
      {children}
    </button>
  );
}

function Rating({ rating, mono = false }: { rating: number; mono?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star className={cn("size-3.5 fill-current", mono ? "text-white" : "text-accent-yellow")} />
      <span className={cn("text-xs font-semibold", mono ? "text-white" : "text-foreground")}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
