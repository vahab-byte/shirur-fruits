import { motion, useMotionValue, useSpring } from "motion/react";
import { forwardRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, className, variant = "primary", onClick },
  ref,
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:bg-leaf",
        variant === "ghost" &&
          "glass text-foreground hover:bg-white/70",
        className,
      )}
    >
      {children}
    </motion.button>
  );
});
