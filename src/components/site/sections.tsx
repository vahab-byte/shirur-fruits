import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Leaf, Snowflake, Sparkles, Truck, ShieldCheck, Clock, Play, ChevronDown, Camera } from "lucide-react";
import { Reveal, SplitWords } from "./reveal";
import { MagneticButton } from "./magnetic-button";
import { ProductCard, type Product } from "./product-card";
import { PRODUCTS } from "@/lib/products";

const slugOf = (id: string) => PRODUCTS.find((p) => p.id === id)?.slug ?? id;

import orange from "@/assets/fruit-orange.png";
import lemon from "@/assets/fruit-lemon.png";
import pomegranate from "@/assets/fruit-pomegranate.png";
import mangosteen from "@/assets/fruit-mangosteen.png";
import grapes from "@/assets/fruit-grapes.png";
import strawberry from "@/assets/fruit-strawberry.png";
import mango from "@/assets/fruit-mango.png";
import dragonfruit from "@/assets/fruit-dragonfruit.png";
import orchard from "@/assets/orchard-hero.jpg";
import farmer from "@/assets/farmer.jpg";
import recipe1 from "@/assets/recipe-1.jpg";
import recipe2 from "@/assets/recipe-2.jpg";
import recipe3 from "@/assets/recipe-3.jpg";

/* ───────────────────────── Featured Fruits ───────────────────────── */
const featured: Product[] = [
  {
    id: "1",
    name: "Imperial Mangosteen",
    category: "Tropical",
    price: 14,
    oldPrice: 18,
    image: mangosteen,
    badge: "Limited",
    badgeTone: "orange",
    rating: 4.9,
    bg: "bg-cream",
  },
  {
    id: "2",
    name: "Amalfi Citron",
    category: "Citrus",
    price: 9.5,
    image: lemon,
    badge: "Seasonal Pick",
    rating: 5,
    highlight: true,
  },
  {
    id: "3",
    name: "Ruby Pomegranate",
    category: "Heirloom",
    price: 22,
    oldPrice: 26,
    image: pomegranate,
    badge: "Organic",
    badgeTone: "yellow",
    rating: 4.7,
  },
];

export function FeaturedFruits() {
  return (
    <section id="shop" className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
                <Sparkles className="size-3" /> Curated Harvest
              </span>
            </Reveal>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter text-balance md:text-7xl">
              <SplitWords text="Curated" />
              <br />
              <span className="font-editorial lowercase text-primary">handpicked.</span>
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sm text-foreground/60">
              Selected daily from high-altitude estates, delivered within 24 hours of peak
              ripeness — each piece graded for sweetness and aroma.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] hover:text-primary"
            >
              View entire collection
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/products/$slug"
              params={{ slug: slugOf(p.id) }}
              className={`block ${i === 1 ? "md:-translate-y-12" : ""}`}
            >
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Fresh Picks (scrollable strip) ───────────────────────── */
const picks: Product[] = [
  { id: "p1", name: "Sunblush Mango", category: "Tropical", price: 8.5, image: mango, rating: 4.8 },
  { id: "p2", name: "Crystal Grapes", category: "Heirloom", price: 12, image: grapes, badge: "New", badgeTone: "primary", rating: 4.6 },
  { id: "p3", name: "Field Strawberry", category: "Berries", price: 6.5, oldPrice: 8, image: strawberry, badge: "-20%", badgeTone: "orange", rating: 4.9 },
  { id: "p4", name: "Pink Dragonfruit", category: "Exotic", price: 11, image: dragonfruit, rating: 4.7 },
  { id: "p5", name: "Sicilian Blood Orange", category: "Citrus", price: 7, image: orange, badge: "Organic", badgeTone: "yellow", rating: 4.9 },
];

export function FreshPicks() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Today's <span className="font-editorial lowercase text-accent-orange">fresh</span> picks
          </h2>
          <div className="hidden gap-2 md:flex">
            <button className="grid size-12 place-items-center rounded-full border border-border bg-white/60 transition hover:bg-white">←</button>
            <button className="grid size-12 place-items-center rounded-full bg-foreground text-background transition hover:bg-leaf">→</button>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {picks.map((p, i) => (
            <Link key={p.id} to="/products/$slug" params={{ slug: slugOf(p.id) }} className="block">
              <ProductCard product={p} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Organic / Big editorial split ───────────────────────── */
export function OrganicCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground px-6 py-32 text-background">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, oklch(0.74 0.18 50 / 0.6), transparent), radial-gradient(40% 40% at 80% 70%, oklch(0.62 0.18 145 / 0.6), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
              <Leaf className="size-3" /> 100% Organic Certified
            </span>
          </Reveal>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            <SplitWords text="Grown" />
            <br />
            <span className="font-editorial lowercase text-primary">slowly,</span>
            <br />
            <SplitWords text="ripened" delay={0.2} />
            <br />
            <span className="font-editorial lowercase text-accent-orange">naturally.</span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-background/60">
              No pesticides, no waxes, no shortcuts. Our certified estates use regenerative
              farming and solar-cured harvesting to deliver fruit at its peak — never one day past.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                ["120+", "Heritage Estates"],
                ["48h", "Farm to Door"],
                ["0", "Synthetic Pesticides"],
                ["97%", "Customer Reorders"],
              ].map(([k, v]) => (
                <div key={k} className="border-l border-white/15 pl-4">
                  <div className="font-editorial text-4xl font-bold text-primary">{k}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/50">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <MagneticButton variant="primary" className="mt-10">
              Explore Organic
            </MagneticButton>
          </Reveal>
        </div>

        <div className="relative h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 w-3/5">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10">
              <img src={farmer} alt="Farmer" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute right-0 bottom-0 w-2/3">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10">
              <img src={orchard} alt="Orchard" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </motion.div>
          <motion.img
            src={lemon}
            alt=""
            className="absolute -top-8 right-4 size-40 drop-shadow-2xl animate-float-y"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Seasonal Bento ───────────────────────── */
const seasons = [
  { name: "Spring", img: strawberry, color: "from-pink-200 to-pink-400", note: "Berries Bloom" },
  { name: "Summer", img: mango, color: "from-amber-200 to-orange-400", note: "Tropical Peak" },
  { name: "Autumn", img: pomegranate, color: "from-rose-300 to-red-500", note: "Crisp Crops" },
  { name: "Winter", img: orange, color: "from-orange-200 to-orange-500", note: "Citrus Surge" },
];

export function Seasonal() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-yellow/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
              <Snowflake className="size-3" /> Four Seasons
            </span>
          </Reveal>
          <h2 className="mt-6 font-display text-5xl font-black uppercase tracking-tighter md:text-7xl">
            Seasonal <span className="font-editorial lowercase text-primary">edits.</span>
          </h2>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {seasons.map((s, i) => (
            <motion.a
              href="#"
              key={s.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gradient-to-br ${s.color} p-6 text-foreground shadow-xl`}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                    {s.note}
                  </div>
                  <div className="font-display text-3xl font-black uppercase tracking-tighter md:text-5xl">
                    {s.name}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em]">
                  Shop
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="pointer-events-none absolute -bottom-6 -right-6 size-44 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */
export function Marquee() {
  const items = [
    "Farm to Home",
    "Zero Carbon Transit",
    "Estate Grown",
    "Micro Batches",
    "48h Delivery",
    "100% Organic",
  ];
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border bg-accent-yellow/10 overflow-hidden py-10">
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-4xl font-black uppercase tracking-tighter text-foreground/15 md:text-6xl">
            {i % 2 === 0 ? <span>{t}</span> : <span className="font-editorial lowercase italic text-primary/30">{t}</span>}
            <span className="size-3 rounded-full bg-primary/30" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Categories ───────────────────────── */
const categories = [
  { name: "Citrus", img: orange, count: 24 },
  { name: "Berries", img: strawberry, count: 18 },
  { name: "Tropical", img: mango, count: 32 },
  { name: "Exotic", img: dragonfruit, count: 12 },
  { name: "Heirloom", img: pomegranate, count: 9 },
  { name: "Vines", img: grapes, count: 14 },
];

export function Categories() {
  return (
    <section className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 flex items-end justify-between">
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Popular <span className="font-editorial lowercase text-primary">categories</span>
          </h2>
          <a href="#" className="hidden text-xs font-bold uppercase tracking-[0.22em] hover:text-primary md:block">
            All Categories →
          </a>
        </header>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <motion.a
              href="#"
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="group relative flex aspect-square flex-col items-center justify-end overflow-hidden rounded-3xl border border-border bg-cream p-4 text-center"
            >
              <img
                src={c.img}
                alt=""
                loading="lazy"
                className="absolute inset-x-0 top-2 mx-auto h-3/5 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="relative z-10">
                <div className="font-display text-base font-extrabold uppercase tracking-tight">{c.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
                  {c.count} items
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Flash Sale ───────────────────────── */
export function FlashSale() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent-orange via-accent-orange to-yellow-400 p-10 text-white shadow-2xl shadow-accent-orange/20 md:p-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
              <Clock className="size-3" /> Flash Sale · Ends Soon
            </span>
            <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
              Up to <span className="font-editorial">40% off</span><br />exotic citrus
            </h2>
            <p className="mt-6 max-w-md text-sm text-white/85">
              Limited inventory from our Sicilian micro-orchard. Once sold, gone for the season.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {["02", "14", "37", "08"].map((n, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="glass-dark grid size-16 place-items-center rounded-2xl border border-white/30 font-editorial text-3xl font-bold text-white md:size-20 md:text-4xl">
                    {n}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                    {["Days","Hours","Min","Sec"][i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <MagneticButton variant="ghost" className="bg-white/95 text-foreground hover:bg-white">
                Claim Offer →
              </MagneticButton>
            </div>
          </div>
          <div className="relative h-[400px]">
            <motion.img
              src={orange}
              alt=""
              loading="lazy"
              className="absolute inset-0 m-auto size-80 animate-float-y drop-shadow-2xl"
            />
            <motion.img
              src={lemon}
              alt=""
              loading="lazy"
              className="absolute right-0 top-4 size-40 animate-float-y-rev drop-shadow-2xl"
            />
            <div aria-hidden className="absolute inset-0 -z-10 m-auto size-72 animate-spin-slow rounded-full border border-dashed border-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Why Choose ───────────────────────── */
const why = [
  { icon: Leaf, t: "Estate Grown", d: "Sourced direct from regenerative micro-orchards." },
  { icon: Truck, t: "48h Delivery", d: "Cold-chain transit keeps cells intact." },
  { icon: ShieldCheck, t: "Quality Guarantee", d: "If it isn't perfect, your next box is on us." },
  { icon: Sparkles, t: "Peak Ripeness", d: "Hand-picked at exact sugar concentration." },
];

export function WhyChoose() {
  return (
    <section className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Reveal>
            <h2 className="font-display text-5xl font-black uppercase tracking-tighter md:text-7xl">
              Why <span className="font-editorial lowercase text-primary">verve.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <motion.div
              key={w.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-cream p-8"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-6">
                <w.icon className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-extrabold uppercase tracking-tight">
                {w.t}
              </h3>
              <p className="mt-2 text-sm text-foreground/60">{w.d}</p>
              <span aria-hidden className="absolute -bottom-10 -right-10 size-32 rounded-full bg-primary/5 transition-all group-hover:scale-150" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Farm Process ───────────────────────── */
const steps = [
  { n: "01", t: "Orchard Selection", d: "We monitor each tree's mineral and hydration levels daily." },
  { n: "02", t: "Solar-Cured Harvest", d: "Picked only after reaching ideal sugar concentration." },
  { n: "03", t: "Cold Chain Transit", d: "Temperature-controlled logistics from branch to box." },
  { n: "04", t: "Doorstep Delivery", d: "Hand-packed and arriving within 48 hours of picking." },
];

export function FarmProcess() {
  return (
    <section className="bg-foreground px-6 py-32 text-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
            Farm to <span className="font-editorial lowercase text-primary">home.</span>
          </h2>
          <p className="max-w-sm text-sm text-background/60">
            Four obsessive steps stand between the seed and your kitchen. No middlemen, no warehouses, no wax.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              className="bg-foreground p-8 md:p-10"
            >
              <div className="font-editorial text-6xl font-bold text-primary">{s.n}</div>
              <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight">
                {s.t}
              </h3>
              <p className="mt-3 text-sm text-background/55">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Video Section ───────────────────────── */
export function VideoSection() {
  return (
    <section className="relative overflow-hidden bg-foreground px-6 pb-32 text-background">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2.5rem] border border-white/10">
            <img src={orchard} alt="Orchard story" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="glass-dark grid size-24 place-items-center rounded-full border border-white/30 md:size-32"
              >
                <Play className="size-8 fill-white text-white" />
              </motion.button>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-background/60">
                  Watch the story
                </span>
                <h3 className="mt-2 font-display text-3xl font-black uppercase tracking-tighter md:text-5xl">
                  Inside the <span className="font-editorial lowercase">orchard.</span>
                </h3>
              </div>
              <div className="hidden text-right text-[10px] font-bold uppercase tracking-[0.22em] text-background/50 md:block">
                03:24 · Documentary
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */
const reviews = [
  { name: "Amelia R.", role: "Chef, Brooklyn", text: "I've worked with the world's best produce suppliers. Verve outshines them all — the fruit literally smells like a garden." },
  { name: "Kenji T.", role: "Subscriber · 2 yrs", text: "Every box is a small ceremony. The packaging, the scent, the perfectly graded fruit. Nothing else compares." },
  { name: "Lara M.", role: "Hotelier, Lisbon", text: "We replaced our entire fruit program with Verve. Guest satisfaction scores jumped 28% the first month." },
];

export function Reviews() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-5xl font-black uppercase tracking-tighter md:text-7xl">
            Loved by <span className="font-editorial lowercase text-primary">connoisseurs.</span>
          </h2>
          <div className="hidden items-center gap-2 md:flex">
            <span className="font-editorial text-5xl font-bold text-primary">4.96</span>
            <div className="text-xs">
              <div className="font-bold uppercase tracking-widest">avg rating</div>
              <div className="text-foreground/50">12,400+ reviews</div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col gap-6 rounded-[2rem] border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="font-editorial text-6xl leading-none text-primary">"</div>
              <blockquote className="text-base leading-relaxed text-foreground/80">{r.text}</blockquote>
              <figcaption className="mt-auto border-t border-border pt-4">
                <div className="font-bold">{r.name}</div>
                <div className="text-xs uppercase tracking-widest text-foreground/50">{r.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery + Recipes ───────────────────────── */
export function Recipes() {
  const items = [
    { img: recipe1, t: "Rainbow Bowl", tag: "Breakfast · 5 min" },
    { img: recipe2, t: "Sunrise Press", tag: "Drinks · 2 min" },
    { img: recipe3, t: "Berry Smoothie Bowl", tag: "Lunch · 8 min" },
  ];
  return (
    <section className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex items-end justify-between">
          <div>
            <span className="inline-flex rounded-full bg-accent-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-orange">
              From the kitchen
            </span>
            <h2 className="mt-6 font-display text-5xl font-black uppercase tracking-tighter md:text-7xl">
              Recipe <span className="font-editorial lowercase text-primary">ideas.</span>
            </h2>
          </div>
          <a href="#" className="hidden text-xs font-bold uppercase tracking-[0.22em] hover:text-primary md:block">
            Recipe Index →
          </a>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((r, i) => (
            <motion.a
              href="#"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -6 }}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
                <img
                  src={r.img}
                  alt={r.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">{r.t}</h3>
                  <p className="text-xs uppercase tracking-widest text-foreground/50">{r.tag}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Health Benefits ───────────────────────── */
const benefits = [
  { v: "Vitamin C", d: "Boosts immunity & collagen synthesis", c: "text-accent-orange" },
  { v: "Antioxidants", d: "Fights cellular oxidative stress", c: "text-primary" },
  { v: "Fiber Rich", d: "Supports gut microbiome health", c: "text-accent-yellow" },
  { v: "Hydration", d: "Up to 92% water content naturally", c: "text-blue-500" },
];

export function HealthBenefits() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
            Eat the <span className="font-editorial lowercase text-primary">rainbow.</span>
          </h2>
          <p className="mt-6 max-w-md text-foreground/60">
            Every box is curated to deliver a complete spectrum of nutrients — selected by our in-house nutritionists.
          </p>
          <div className="mt-10 space-y-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.v}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5"
              >
                <div className={`font-editorial text-3xl font-bold ${b.c}`}>0{i + 1}</div>
                <div>
                  <div className="font-display text-base font-extrabold uppercase tracking-tight">{b.v}</div>
                  <div className="text-sm text-foreground/60">{b.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square">
          <div aria-hidden className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-primary/10 blur-3xl" />
          <motion.img
            src={pomegranate}
            alt=""
            loading="lazy"
            className="absolute inset-0 m-auto size-80 animate-float-y drop-shadow-2xl md:size-[28rem]"
          />
          <motion.img src={strawberry} alt="" loading="lazy" className="absolute left-0 top-10 size-32 animate-float-y-rev drop-shadow-2xl" />
          <motion.img src={grapes} alt="" loading="lazy" className="absolute right-0 bottom-10 size-36 animate-float-y drop-shadow-2xl" style={{ animationDelay: "-3s" }} />
          <motion.img src={dragonfruit} alt="" loading="lazy" className="absolute right-12 top-0 size-28 animate-float-y-rev drop-shadow-2xl" style={{ animationDelay: "-5s" }} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Instagram strip ───────────────────────── */
export function InstagramStrip() {
  const imgs = [recipe1, farmer, recipe2, orchard, recipe3, farmer];
  return (
    <section className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter md:text-6xl">
            <span className="font-editorial lowercase text-primary">follow</span> @shirurfruits
          </h2>
          <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]">
            <Camera className="size-4" /> Instagram
          </a>
        </header>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {imgs.map((src, i) => (
            <motion.a
              href="#"
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-foreground/0 transition-colors group-hover:bg-foreground/40">
                <Camera className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Newsletter ───────────────────────── */
export function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-primary px-6 py-32 text-primary-foreground">
      <div aria-hidden className="absolute -left-20 top-1/2 size-96 -translate-y-1/2 rounded-full bg-leaf blur-3xl opacity-50" />
      <div aria-hidden className="absolute -right-32 -bottom-32 size-96 rounded-full bg-accent-yellow blur-3xl opacity-30" />
      <motion.img
        src={lemon}
        alt=""
        loading="lazy"
        className="absolute left-[8%] top-12 hidden size-32 animate-float-y drop-shadow-2xl md:block"
      />
      <motion.img
        src={strawberry}
        alt=""
        loading="lazy"
        className="absolute right-[8%] bottom-12 hidden size-36 animate-float-y-rev drop-shadow-2xl md:block"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            Join the <span className="font-editorial lowercase">harvest.</span>
          </h2>
          <p className="mt-6 text-balance text-primary-foreground/80">
            Weekly notes on rare varietals, kitchen rituals, and first-look access to limited releases.
          </p>
        </Reveal>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full p-2"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent px-5 py-3 text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none"
          />
          <button className="rounded-full bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-background transition-transform hover:scale-105">
            Subscribe
          </button>
        </form>
        <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
          No spam · Unsubscribe anytime
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
const faqs = [
  { q: "How fresh are the fruits when they arrive?", a: "We harvest, pack, and dispatch within the same day. Most boxes arrive within 48 hours of picking via temperature-controlled transit." },
  { q: "Where do you source your produce?", a: "Direct from over 120 certified estates across Italy, Japan, California, Mexico, and Southeast Asia. No warehouses, no middlemen." },
  { q: "Is everything truly organic?", a: "Every grower in our network is certified organic and uses regenerative practices. We audit each estate twice a year." },
  { q: "What if my order arrives damaged?", a: "Send us a photo within 48 hours and we'll send a fresh replacement immediately — no questions asked." },
  { q: "Do you ship internationally?", a: "Currently the continental US, UK, and EU. APAC and Middle East coming Q3." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <h2 className="font-display text-5xl font-black uppercase tracking-tighter md:text-7xl">
            Frequently <span className="font-editorial lowercase text-primary">asked.</span>
          </h2>
        </header>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-border bg-white transition-colors hover:border-primary/30"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left"
                >
                  <span className="font-display text-base font-extrabold uppercase tracking-tight md:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-all ${
                      isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-cream text-foreground"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-8 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  return (
    <footer className="bg-foreground px-6 pt-32 pb-12 text-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="font-display text-7xl font-black uppercase leading-[0.9] tracking-tighter md:text-9xl">
              Shirur<span className="text-primary">.</span>
            </h3>
            <p className="mt-6 max-w-md text-sm text-background/55">
              A cinematic fruit marketplace for the obsessive eater. Estate-grown, hand-picked,
              delivered to your door.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-background/40">Shop</h4>
              {["All Fruits", "Seasonal", "Subscriptions", "Gift Boxes"].map((l) => (
                <a key={l} href="#" className="text-sm text-background/80 hover:text-primary">
                  {l}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-background/40">Studio</h4>
              {["Our Orchard", "Journal", "Wholesale", "Press"].map((l) => (
                <a key={l} href="#" className="text-sm text-background/80 hover:text-primary">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-background/40">
            © 2026 Shirur Fruits — Estate to Door
          </span>
          <div className="flex gap-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-background/40">
            <a href="#" className="hover:text-background">Instagram</a>
            <a href="#" className="hover:text-background">Twitter</a>
            <a href="#" className="hover:text-background">Pinterest</a>
            <a href="#" className="hover:text-background">Vimeo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
