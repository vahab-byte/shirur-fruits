import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { SplitWords } from "./reveal";
import orchard from "@/assets/orchard-hero.jpg";
import orange from "@/assets/fruit-orange.png";
import lemon from "@/assets/fruit-lemon.png";
import strawberry from "@/assets/fruit-strawberry.png";
import grapes from "@/assets/fruit-grapes.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax
  const mx = useRef(0);
  const my = useRef(0);
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.current = (e.clientX - rect.left) / rect.width - 0.5;
    my.current = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current?.style.setProperty("--mx", String(mx.current));
    ref.current?.style.setProperty("--my", String(my.current));
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative min-h-[100svh] overflow-hidden bg-cream pt-32 pb-24"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {/* Background image with parallax + gradient overlay */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img
          src={orchard}
          alt=""
          className="h-full w-full object-cover opacity-50"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/20 to-cream" />
        <div
          className="absolute inset-0 opacity-70 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 30%, oklch(0.86 0.17 90 / 0.5), transparent 60%), radial-gradient(50% 50% at 80% 70%, oklch(0.74 0.18 50 / 0.45), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Floating gradient blobs */}
      <div
        aria-hidden
        className="animate-blob absolute -left-32 top-1/3 -z-10 size-[420px] bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob absolute -right-24 top-10 -z-10 size-[480px] bg-accent-orange/30 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      {/* Floating fruits — mouse parallax via CSS var */}
      <FloatingFruit
        src={orange}
        alt=""
        className="left-[4%] top-[22%] size-44 md:size-72"
        depth={40}
        delay={0}
      />
      <FloatingFruit
        src={lemon}
        alt=""
        className="right-[6%] top-[18%] size-40 md:size-64"
        depth={-50}
        delay={1}
      />
      <FloatingFruit
        src={strawberry}
        alt=""
        className="left-[10%] bottom-[10%] size-32 md:size-52"
        depth={-30}
        delay={2}
      />
      <FloatingFruit
        src={grapes}
        alt=""
        className="right-[12%] bottom-[14%] size-36 md:size-56"
        depth={55}
        delay={1.5}
      />

      {/* Headline */}
      <motion.div
        style={{ y: yTitle, opacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
        >
          <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
          Season 03 · Sun-Ripened Harvest
        </motion.span>

        <h1 className="font-display text-[14vw] font-black uppercase leading-[0.85] tracking-[-0.04em] text-balance md:text-[9.5rem]">
          <SplitWords text="Hyper" className="block" />
          <span className="block">
            <span className="font-editorial lowercase text-primary">fresh.</span>{" "}
            <SplitWords text="Orchard" delay={0.15} />
          </span>
          <SplitWords text="Luxe." className="block" delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-10 max-w-xl text-balance text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          A cinematic marketplace of estate-grown fruit, hand-picked at the precise moment of
          peak ripeness and delivered within 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 md:flex-row"
        >
          <MagneticButton variant="primary">
            Shop Now <ArrowRight className="ml-2 size-3.5" />
          </MagneticButton>
          <MagneticButton variant="ghost">Explore Fruits</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="grid size-9 place-items-center rounded-full border border-foreground/15 bg-white/40 backdrop-blur"
        >
          <ArrowDown className="size-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingFruit({
  src,
  alt,
  className,
  depth,
  delay,
}: {
  src: string;
  alt: string;
  className: string;
  depth: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + delay * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute z-[5] ${className}`}
      style={{
        transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px), 0)`,
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="animate-float-y h-full w-full drop-shadow-2xl"
        style={{ animationDelay: `-${delay * 1.7}s` }}
      >
        <img src={src} alt={alt} className="h-full w-full object-contain" loading="eager" />
      </div>
    </motion.div>
  );
}
