import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, ArrowUpRight, Sparkles } from "lucide-react";
import { useLenis } from "@/lib/use-lenis";
import { Nav } from "@/components/site/nav";
import { GlowCursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/sections";
import { Reveal, SplitWords } from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import { PRODUCTS, type Category } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Shirur Fruits" },
      {
        name: "description",
        content:
          "Browse the Shirur Fruits collection — estate-grown citrus, berries, tropicals and rare heirlooms, delivered within 48 hours of harvest.",
      },
      { property: "og:title", content: "Shop — Shirur Fruits" },
      {
        property: "og:description",
        content:
          "Estate-grown citrus, berries, tropicals and rare heirlooms — delivered within 48 hours of harvest.",
      },
    ],
  }),
  component: ShopPage,
});

const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Citrus",
  "Berries",
  "Tropical",
  "Exotic",
  "Heirloom",
  "Vines",
];

const SORTS = ["Featured", "Price: Low → High", "Price: High → Low", "Top Rated"] as const;

function ShopPage() {
  useLenis();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Featured");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      cat === "All" ? true : p.category === cat,
    ).filter((p) =>
      q.trim() ? p.name.toLowerCase().includes(q.toLowerCase()) : true,
    );
    if (sort === "Price: Low → High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, q, sort]);

  return (
    <main className="relative bg-white">
      <GlowCursor />
      <Nav />

      {/* Hero strip */}
      <section className="relative overflow-hidden bg-cream px-6 pt-40 pb-20">
        <div
          aria-hidden
          className="absolute -left-32 top-20 size-[420px] rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-24 -bottom-32 size-[480px] rounded-full bg-accent-orange/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
              <Sparkles className="size-3" /> The Full Orchard
            </span>
          </Reveal>
          <h1 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-[8rem]">
            <SplitWords text="Shop" />{" "}
            <span className="font-editorial lowercase text-primary">everything.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/65 md:text-base">
              Every fruit in the Shirur Fruits collection — single-origin, peak-ripeness, delivered
              within 48 hours of harvest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-20 z-30 border-y border-border bg-white/80 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-cream text-foreground/70 hover:bg-foreground/5"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
              <Search className="size-4 text-foreground/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search fruits…"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-foreground/40"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
              <SlidersHorizontal className="size-4 text-foreground/40" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
                className="bg-transparent text-sm outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/50">
            <span>{items.length} fruits</span>
            <span>Free shipping over $60</span>
          </div>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-cream py-32 text-center">
              <p className="font-display text-2xl font-black uppercase tracking-tight">
                Nothing matches.
              </p>
              <p className="mt-2 text-sm text-foreground/60">
                Try a different category or clear your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p, i) => (
                <Link
                  key={p.id}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="block"
                >
                  <ProductCard product={p} index={i} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-cream px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-foreground p-10 text-background md:flex-row md:items-center md:p-16"
        >
          <div>
            <h3 className="font-display text-4xl font-black uppercase leading-tight tracking-tighter md:text-6xl">
              Can't decide? <span className="font-editorial lowercase text-primary">Subscribe.</span>
            </h3>
            <p className="mt-3 max-w-md text-sm text-background/60">
              A curator-built box of seasonal fruit on your doorstep every two weeks.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground hover:bg-leaf"
          >
            Start a Subscription
            <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
