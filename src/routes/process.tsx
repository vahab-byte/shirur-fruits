import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowUpRight,
  Leaf,
  Sun,
  Droplets,
  Thermometer,
  ShieldCheck,
  Sprout,
  Compass,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useLenis } from "@/lib/use-lenis";
import { Nav } from "@/components/site/nav";
import { GlowCursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/sections";
import { Reveal, SplitWords } from "@/components/site/reveal";

import orchard from "@/assets/orchard-hero.jpg";
import farmer from "@/assets/farmer.jpg";
import orange from "@/assets/fruit-orange.png";
import lemon from "@/assets/fruit-lemon.png";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — Shirur Fruits" },
      {
        name: "description",
        content: "Discover how Shirur Fruits monitors, harvests, and delivers peak-ripeness luxury fruit to your door within 48 hours.",
      },
      { property: "og:title", content: "Our Process — Shirur Fruits" },
      {
        property: "og:description",
        content: "Discover our scientific, obsessive approach to peak-ripeness fruit harvesting and cold-chain logistics.",
      },
    ],
  }),
  component: ProcessPage,
});

const DETAILED_STEPS = [
  {
    n: "01",
    t: "Orchard Analytics",
    subtitle: "Real-time mineral & leaf spectroscopy",
    icon: Sprout,
    desc: "We don't harvest on a calendar schedule. Every block of our heritage orchards is equipped with soil telemetry tracking water tension and mineral ratios. Using handheld spectrometer scanners, we read the chlorophyll and hydration levels of leaves directly from the branch to determine if the tree is in its absolute zone of peak synthesis.",
    details: [
      "Real-time soil sensors",
      "Handheld spectroscopy mapping",
      "Exact mineral level optimization",
      "Zero preventative chemicals"
    ]
  },
  {
    n: "02",
    t: "Brix-Certified Harvest",
    subtitle: "Picked at exact sugar concentration",
    icon: Sun,
    desc: "A fruit's sweetness and complexity are determined by its Brix rating (the percentage of sugar solids). While commercial farms pick fruit green and hard to survive shipping, we test individual fruits on the tree. We harvest only when they reach our premium Brix threshold, ensuring full flavor development on the branch.",
    details: [
      "Brix refractometer testing",
      "Selective single-fruit picking",
      "Harvested only at maximum sugars",
      "Manual curation for sizing"
    ]
  },
  {
    n: "03",
    t: "Pure-Bloom Preparation",
    subtitle: "Zero synthetic wax, zero chemicals",
    icon: Leaf,
    desc: "Supermarket fruits are washed with harsh detergents and coated in synthetic wax to extend shelf life. Shirur Fruits preserves the fruit's natural 'bloom'—the waxy, white coating the fruit naturally produces to protect itself. We lightly brush, hand-wrap in breathable, compostable cushions, and pack into aerated crates.",
    details: [
      "Preservation of natural fruit bloom",
      "100% compostable packaging",
      "No post-harvest chemical treatments",
      "Sanitized using pure ozone gas"
    ]
  },
  {
    n: "04",
    t: "GPS Cold-Chain Logistics",
    subtitle: "Branch to box in under 48 hours",
    icon: Thermometer,
    desc: "Any exposure to heat after picking accelerates degradation. Within 30 minutes of harvest, our fruits are cooled to their specific optimum temperature. They travel in temperature-monitored refrigerated vehicles with live GPS logs, keeping the cellular structure perfectly intact until arrival.",
    details: [
      "Branch-to-cooler in under 30 minutes",
      "Continuous GPS temperature logs",
      "Humidity-optimized cold transit",
      "Guaranteed under 48-hour delivery"
    ]
  }
];

const COMPARISONS = [
  {
    feature: "Harvest Timing",
    supermarket: "Picked 4–6 weeks early, green and sour",
    shirur: "Picked at exact peak sugar & aroma on the tree",
    isGood: false
  },
  {
    feature: "Flavor Development",
    supermarket: "Artificially ripened in gas chambers, dull flavor",
    shirur: "Naturally solar-cured on the branch, complex profile",
    isGood: true
  },
  {
    feature: "Surface Coating",
    supermarket: "Coated in petroleum or synthetic wax",
    shirur: "Raw, untouched natural bloom preserved",
    isGood: true
  },
  {
    feature: "Storage Time",
    supermarket: "Cold-stored in gas warehouses for up to 12 months",
    shirur: "Arrives at your home within 48 hours of harvest",
    isGood: true
  },
  {
    feature: "Chemical Exposure",
    supermarket: "Fungicides applied post-harvest to stop rot",
    shirur: "Zero post-harvest chemicals, pure ozone sanitization",
    isGood: true
  }
];

function ProcessPage() {
  useLenis();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="relative bg-white text-foreground">
      <GlowCursor />
      <Nav />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-cream px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div
          aria-hidden
          className="absolute -left-32 top-20 size-[420px] rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-24 -bottom-32 size-[480px] rounded-full bg-accent-orange/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
              <Compass className="size-3" /> The Science of Luxe Produce
            </span>
          </Reveal>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-[8rem]">
            Obsessed with <br />
            <span className="font-editorial lowercase text-primary">perfection.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-lg">
              Four rigorous steps stand between our estate orchards and your palate. 
              We combine regenerative farming with modern food science to deliver fruit 
              exactly as nature intended: raw, fresh, and bursting with flavor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Interactive Journey */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Step Navigation Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <header className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/40">
                  Interactive Guide
                </span>
                <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl mt-2">
                  The Four Stages
                </h2>
              </header>

              <div className="flex flex-col gap-3">
                {DETAILED_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = step.icon;
                  return (
                    <button
                      key={step.n}
                      onClick={() => setActiveStep(idx)}
                      className={`group flex items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                        isActive
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                          : "border-border bg-white hover:border-foreground/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex size-12 items-center justify-center rounded-xl transition ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-cream text-foreground/75 group-hover:bg-foreground/5"
                          }`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                            Stage {step.n}
                          </div>
                          <div className="font-display text-lg font-bold uppercase tracking-tight">
                            {step.t}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-editorial text-2xl font-bold transition ${
                          isActive ? "text-primary scale-110" : "text-foreground/20"
                        }`}
                      >
                        {step.n}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Detail Content Card */}
            <div className="lg:col-span-7">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[2.5rem] border border-border bg-cream p-8 md:p-12 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-editorial text-7xl font-bold leading-none text-primary/30">
                      {DETAILED_STEPS[activeStep].n}
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {DETAILED_STEPS[activeStep].subtitle}
                      </div>
                      <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl mt-1">
                        {DETAILED_STEPS[activeStep].t}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-8 text-sm md:text-base leading-relaxed text-foreground/75">
                    {DETAILED_STEPS[activeStep].desc}
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DETAILED_STEPS[activeStep].details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-leaf shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-foreground/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-foreground/50">
                  <span>Shirur Quality Assurance Certified</span>
                  <ShieldCheck className="size-5 text-primary" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Split Image Section */}
      <section className="bg-foreground text-background py-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Leaf className="size-3" /> Earth First Sourcing
              </span>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
                Regenerative <br />
                <span className="font-editorial lowercase text-primary">farming.</span>
              </h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-background/60">
                We believe that premium fruit is a byproduct of healthy soil. 
                Our partner estates practice regenerative agriculture—incorporating 
                cover cropping, organic composting, and bio-diverse ecosystems. 
                This results in stronger tree roots, better water retention, 
                and ultimately, fruit that is noticeably sweeter and more aromatic.
              </p>
              <div className="mt-8 border-l border-primary pl-4">
                <p className="text-xs italic text-background/50">
                  "By farming in harmony with the local biome, our fruit contains up to 
                  15% higher concentration of natural sugars and antioxidants."
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  — Dr. Sanjay Shirur, Agronomist
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                <img src={farmer} alt="Farming Process" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <motion.img
                src={lemon}
                alt=""
                className="absolute -bottom-8 -left-8 size-32 drop-shadow-2xl animate-float-y"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Comparison Table */}
      <section className="bg-cream px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <header className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-orange">
              The Reality Check
            </span>
            <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tighter md:text-5xl">
              Supermarket vs. <span className="font-editorial lowercase text-primary">shirur.</span>
            </h2>
          </header>

          <div className="overflow-x-auto rounded-[2rem] border border-border bg-white shadow-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-cream/50 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                  <th className="p-6 md:p-8">Feature</th>
                  <th className="p-6 md:p-8">Generic Store Fruit</th>
                  <th className="p-6 md:p-8 text-primary">Shirur Fruits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs md:text-sm">
                {COMPARISONS.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-cream/10 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-foreground">{comp.feature}</td>
                    <td className="p-6 md:p-8 text-foreground/60 flex items-start gap-2">
                      <AlertCircle className="size-4 text-accent-orange shrink-0 mt-0.5" />
                      <span>{comp.supermarket}</span>
                    </td>
                    <td className="p-6 md:p-8 text-foreground font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-leaf shrink-0 mt-0.5" />
                        <span>{comp.shirur}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process FAQ Section */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-black uppercase tracking-tighter md:text-5xl">
              Process <span className="font-editorial lowercase text-primary">FAQs.</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.22em] text-foreground/40 mt-2">
              Everything you need to know about our standards
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What is fruit 'bloom' and why does it matter?",
                a: "Natural bloom is a thin, powdery coating produced by the fruit itself to prevent moisture loss and shield it from insects. Commercial growers wash this off, which damages the skin, requiring them to coat the fruit in petroleum-based waxes. By keeping the bloom intact, we maintain the fruit's natural freshness longer without chemicals."
              },
              {
                q: "How does the temperature-monitored shipping work?",
                a: "Different fruits require different temperatures (e.g., berries do best at 2°C, while tropical mangosteens prefer 12°C). Our boxes are packed with customized thermal insulation layers and organic gel cooling packs tailored to the exact mix of fruits you order, protecting them during transit."
              },
              {
                q: "Do you ship internationally?",
                a: "To guarantee our 48-hour peak-ripeness threshold, we currently ship within national regions via express cold logistics. This ensures the fruit never sits in import custom warehouses for weeks."
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border p-6 md:p-8 hover:border-foreground/20 transition-all">
                <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-foreground flex items-center gap-2">
                  <span className="text-primary font-editorial text-lg font-bold">Q.</span> {faq.q}
                </h3>
                <p className="mt-3 text-xs md:text-sm leading-relaxed text-foreground/60 pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-foreground p-10 text-background md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tighter md:text-5xl">
              Experience the <span className="font-editorial lowercase text-primary">difference.</span>
            </h3>
            <p className="mt-3 max-w-md text-xs md:text-sm text-background/60">
              Taste estate-grown luxury. Hand-picked at peak sugar, delivered within 48 hours.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground hover:bg-leaf transition-colors"
            >
              Shop Curated Box
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
