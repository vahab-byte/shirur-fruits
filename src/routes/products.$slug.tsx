import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  Leaf,
  Sparkles,
} from "lucide-react";
import { useLenis } from "@/lib/use-lenis";
import { Nav } from "@/components/site/nav";
import { GlowCursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/sections";
import { Reveal } from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import { getProduct, PRODUCTS } from "@/lib/products";
import { cartStore } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Shirur Fruits` : "Shirur Fruits";
    const desc = p?.tagline ?? "Estate-grown fruit, delivered at peak ripeness.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: ProductPage,
});

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6 text-center">
      <div>
        <h1 className="font-display text-6xl font-black uppercase tracking-tighter">404</h1>
        <p className="mt-3 text-sm text-foreground/60">That fruit isn't in our orchard.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-background"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}

function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">
          Something went wrong
        </h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-background"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function ProductPage() {
  useLenis();
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").ShopProduct };
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "details" | "shipping">("description");

  useEffect(() => {
    setQty(1);
    setTab("description");
  }, [product.id]);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 3);
  const fallback = PRODUCTS.filter((p) => p.id !== product.id)
    .slice(0, 3)
    .filter((p) => !related.find((r) => r.id === p.id));
  const youMayLike = [...related, ...fallback].slice(0, 3);

  return (
    <main className="relative bg-white">
      <GlowCursor />
      <Nav />

      {/* Breadcrumb */}
      <div className="px-6 pt-32">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Detail */}
      <section className="px-6 pt-10 pb-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          {/* Gallery */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-10 top-10 size-[420px] rounded-full bg-primary/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -right-10 bottom-0 size-[360px] rounded-full bg-accent-orange/20 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-cream"
            >
              <motion.img
                key={product.id}
                src={product.image}
                alt={product.name}
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute inset-0 m-auto h-3/4 w-3/4 object-contain drop-shadow-2xl"
              />
              <div className="absolute left-6 top-6 flex flex-col gap-2">
                {product.badge ? (
                  <span className="rounded-full bg-foreground/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-background">
                    {product.badge}
                  </span>
                ) : null}
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground">
                  In Stock · {product.stock}
                </span>
              </div>
            </motion.div>

            {/* Thumb strip */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <button
                  key={i}
                  className="group aspect-square overflow-hidden rounded-2xl border border-border bg-cream transition hover:border-primary"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-contain p-3 transition-transform group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
                <Sparkles className="size-3" />
                {product.category} · {product.origin}
              </span>
            </Reveal>
            <h1 className="mt-5 font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-3 font-editorial text-xl italic text-primary md:text-2xl">
              {product.tagline}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent-yellow text-accent-yellow" />
                <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-foreground/50">({product.reviews} reviews)</span>
              </div>
              <span className="text-foreground/20">·</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                {product.weight}
              </span>
            </div>

            <div className="mt-7 flex items-end gap-3">
              <span className="font-editorial text-5xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice ? (
                <span className="pb-2 text-base text-foreground/40 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              ) : null}
              {product.oldPrice ? (
                <span className="ml-1 rounded-full bg-accent-orange/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              ) : null}
            </div>

            {/* Quantity + CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-10 place-items-center rounded-full hover:bg-cream"
                  aria-label="Decrease"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="grid size-10 place-items-center rounded-full hover:bg-cream"
                  aria-label="Increase"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  cartStore.addToCart(product, qty);
                  toast.success(`${product.name} added to cart! (${qty}x) 🍎`);
                }}
                className="group flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-background transition hover:bg-leaf"
              >
                Add to Cart · ${(product.price * qty).toFixed(2)}
                <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:rotate-90">
                  <Plus className="size-3" />
                </span>
              </button>
              <button
                aria-label="Wishlist"
                className="grid size-14 place-items-center rounded-full border border-border bg-white hover:border-accent-orange hover:text-accent-orange"
              >
                <Heart className="size-4" />
              </button>
            </div>

            {/* Highlights grid */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-border bg-cream p-4"
                >
                  <div className="font-editorial text-2xl font-bold text-primary">{h.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
              {[
                { Icon: Truck, t: "48h Delivery" },
                { Icon: Leaf, t: "Single Origin" },
                { Icon: ShieldCheck, t: "Freshness Guarantee" },
              ].map(({ Icon, t }) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-3"
                >
                  <Icon className="size-4 text-primary" />
                  {t}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-12">
              <div className="flex gap-1 border-b border-border">
                {(["description", "details", "shipping"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition ${
                      tab === t ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
                    }`}
                  >
                    {t}
                    {tab === t ? (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute -bottom-px left-0 h-0.5 w-full bg-primary"
                      />
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="pt-6 text-sm leading-relaxed text-foreground/75">
                {tab === "description" && (
                  <div>
                    <p>{product.description}</p>
                    <div className="mt-5">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">
                        Flavor Notes
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.notes.map((n) => (
                          <span
                            key={n}
                            className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">
                        Pairs Well With
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.pairings.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {tab === "details" && (
                  <ul className="space-y-2">
                    <li>
                      <span className="font-semibold text-foreground">Origin:</span> {product.origin}
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Weight:</span> {product.weight}
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Category:</span>{" "}
                      {product.category}
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">In stock:</span>{" "}
                      {product.stock} units
                    </li>
                  </ul>
                )}
                {tab === "shipping" && (
                  <ul className="space-y-2">
                    <li>Temperature-controlled transit, packed in compostable cushioning.</li>
                    <li>Standard delivery 24–48h. Free over $60.</li>
                    <li>Freshness guarantee — full refund if you're not delighted.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You may also like */}
      {youMayLike.length > 0 && (
        <section className="bg-cream px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter md:text-6xl">
                You may <span className="font-editorial lowercase text-primary">also like</span>
              </h2>
              <Link
                to="/shop"
                className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] hover:text-primary md:inline-flex"
              >
                All Fruits <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {youMayLike.map((p, i) => (
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
          </div>
        </section>
      )}

      <div className="bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to Shop
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
