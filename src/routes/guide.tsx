import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Search, 
  ArrowLeft, 
  Heart, 
  Activity, 
  Compass, 
  ChevronRight, 
  Apple, 
  BookOpen,
  Info,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Droplet
} from "lucide-react";
import { useLenis } from "@/lib/use-lenis";
import { Nav } from "@/components/site/nav";
import { GlowCursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/sections";
import { Reveal } from "@/components/site/reveal";
import { PRODUCTS, ShopProduct } from "@/lib/products";

// Add detailed health profile metadata mapping for each fruit ID
interface FruitHealthProfile {
  benefits: string[];
  vitamins: { name: string; pct: string }[];
  wellnessProperties: string;
  botanicalFact: string;
  nutritionFacts: {
    calories: string;
    fiber: string;
    sugars: string;
    water: string;
  };
}

const HEALTH_PROFILES: Record<string, FruitHealthProfile> = {
  "1": {
    benefits: ["Anti-inflammatory Xanthones", "Improves Skin Elasticity", "Supports Cellular Health"],
    vitamins: [{ name: "Vitamin C", pct: "12% DV" }, { name: "Folate", pct: "8% DV" }, { name: "Manganese", pct: "10% DV" }],
    wellnessProperties: "Mangosteens contain a unique class of naturally occurring polyphenol compounds known as xanthones, which possess exceptionally strong antioxidant and anti-inflammatory properties.",
    botanicalFact: "Known as the 'Queen of Fruits', Queen Victoria reportedly offered a reward of 100 pounds sterling to anyone who could deliver her a fresh mangosteen.",
    nutritionFacts: { calories: "73 kcal", fiber: "1.8 g", sugars: "15.6 g", water: "81%" }
  },
  "2": {
    benefits: ["Powerful Immune Defense", "Digestive Stimulant", "Alkalizes the Body"],
    vitamins: [{ name: "Vitamin C", pct: "125% DV" }, { name: "Potassium", pct: "4% DV" }, { name: "Calcium", pct: "3% DV" }],
    wellnessProperties: "Extremely high in Vitamin C and citrus bioflavonoids. The essential oils in Amalfi Citron skin help promote blood circulation and reduce oxidative stress.",
    botanicalFact: "Unlike modern lemons, Citron is one of the four original ancestor citrus species from which all other citrus fruits evolved.",
    nutritionFacts: { calories: "29 kcal", fiber: "2.8 g", sugars: "2.5 g", water: "89%" }
  },
  "3": {
    benefits: ["Supports Heart Health", "Joint Anti-Inflammatory", "Lowers Blood Pressure"],
    vitamins: [{ name: "Vitamin C", pct: "30% DV" }, { name: "Vitamin K", pct: "16% DV" }, { name: "Folate", pct: "10% DV" }],
    wellnessProperties: "Pomegranate arils are loaded with punicalagins and punicic acid, potent antioxidants that inhibit inflammatory pathways in the cardiovascular system.",
    botanicalFact: "In ancient Persian culture, the pomegranate symbolized fertility, abundance, and eternal life due to its hundreds of crimson seeds.",
    nutritionFacts: { calories: "83 kcal", fiber: "4.0 g", sugars: "13.7 g", water: "78%" }
  },
  "4": {
    benefits: ["Protects Eye Health", "Enhances Skin Radiance", "Supports Immune Function"],
    vitamins: [{ name: "Vitamin A", pct: "25% DV" }, { name: "Vitamin C", pct: "60% DV" }, { name: "Vitamin B6", pct: "10% DV" }],
    wellnessProperties: "The bright saffron color comes from high concentrations of Beta-Carotene. It also contains Zeaxanthin, which filters harmful blue light rays to protect the eyes.",
    botanicalFact: "Alphonso mangos, grown in Maharashtra, are so premium they hold a Geographical Indication (GI) tag ensuring their authentic volcanic soil origin.",
    nutritionFacts: { calories: "60 kcal", fiber: "1.6 g", sugars: "13.7 g", water: "83%" }
  },
  "5": {
    benefits: ["Resveratrol Longevity Boost", "Regulates Blood Flow", "Protects Nervous System"],
    vitamins: [{ name: "Vitamin K", pct: "18% DV" }, { name: "Vitamin C", pct: "6% DV" }, { name: "Copper", pct: "10% DV" }],
    wellnessProperties: "The skin and seeds are packed with resveratrol, a polyphenol that activates longevity genes and helps shield cells from environmental pollutants.",
    botanicalFact: "Shine Muscat grapes are carefully hand-thinned in Yamanashi orchards so each grape gets optimal sunlight and spacing.",
    nutritionFacts: { calories: "69 kcal", fiber: "0.9 g", sugars: "15.4 g", water: "80%" }
  },
  "6": {
    benefits: ["Cardiovascular Protection", "Regulates Blood Sugar", "Anti-Aging Polyphenols"],
    vitamins: [{ name: "Vitamin C", pct: "97% DV" }, { name: "Manganese", pct: "29% DV" }, { name: "Folate", pct: "9% DV" }],
    wellnessProperties: "Rich in anthocyanins and ellagic acid, which improve endothelial function (artery health) and help slow down glucose absorption.",
    botanicalFact: "Strawberries are the only fruit that wear their seeds on the outside — with an average of 200 seeds per berry.",
    nutritionFacts: { calories: "32 kcal", fiber: "2.0 g", sugars: "4.9 g", water: "91%" }
  },
  "7": {
    benefits: ["Promotes Gut Health", "Fights Iron Deficiency", "High Soluble Fiber"],
    vitamins: [{ name: "Vitamin C", pct: "34% DV" }, { name: "Iron", pct: "8% DV" }, { name: "Magnesium", pct: "10% DV" }],
    wellnessProperties: "The black seeds supply omega-3 fats and prebiotic fibers that stimulate healthy bifidobacteria growth in the digestive tract.",
    botanicalFact: "Dragonfruits bloom on climbing cacti for only one single night, relying on nocturnal bats and moths for pollination.",
    nutritionFacts: { calories: "60 kcal", fiber: "3.0 g", sugars: "9.0 g", water: "86%" }
  },
  "8": {
    benefits: ["Volcanic Mineral Infused", "Strengthens Capillaries", "Reduces Cholesterol"],
    vitamins: [{ name: "Vitamin C", pct: "85% DV" }, { name: "Folate", pct: "12% DV" }, { name: "Potassium", pct: "6% DV" }],
    wellnessProperties: "Volcanic microclimates induce anthocyanin synthesis, turning the flesh ruby red and increasing cellular protection parameters compared to regular oranges.",
    botanicalFact: "The intense red coloration only develops when the fruit experiences cold nights under the shadow of Mount Etna.",
    nutritionFacts: { calories: "45 kcal", fiber: "2.4 g", sugars: "9.0 g", water: "87%" }
  },
  "9": {
    benefits: ["Soluble Pectin Fiber", "Improves Lung Capacity", "Supports Weight Control"],
    vitamins: [{ name: "Vitamin C", pct: "14% DV" }, { name: "Potassium", pct: "6% DV" }, { name: "Vitamin B6", pct: "5% DV" }],
    wellnessProperties: "Apples contain quercetin, a natural antihistamine and anti-inflammatory that helps clear airways and promotes lung vitality.",
    botanicalFact: "Washington state's volcanic soil and dry climate create the perfect environment for growing beautifully crisp, sweet apples.",
    nutritionFacts: { calories: "52 kcal", fiber: "2.4 g", sugars: "10.4 g", water: "86%" }
  },
  "10": {
    benefits: ["Detoxifies Liver", "Boosts Metabolism", "Low Glycemic Index"],
    vitamins: [{ name: "Vitamin C", pct: "12% DV" }, { name: "Vitamin K", pct: "15% DV" }, { name: "Potassium", pct: "5% DV" }],
    wellnessProperties: "Rich in malic acid, which binds to liver toxins and aids elimination. The higher fiber content keeps insulin spikes very low.",
    botanicalFact: "Discovered as a chance seedling in Australia in 1868 by Maria Ann Smith, hence the name 'Granny Smith'.",
    nutritionFacts: { calories: "58 kcal", fiber: "2.8 g", sugars: "9.5 g", water: "85%" }
  },
  "11": {
    benefits: ["Deep Cellular Hydration", "Prevents Muscle Cramps", "Flushes Out Toxins"],
    vitamins: [{ name: "Vitamin C", pct: "80% DV" }, { name: "Potassium", pct: "8% DV" }, { name: "Folate", pct: "6% DV" }],
    wellnessProperties: "Mosambi juice contains highly bioavailable mineral electrolytes that instantly restore hydration balance after physical activity.",
    botanicalFact: "In India, fresh Mosambi juice is traditionally prescribed as the primary recovery drink to boost energy after fevers.",
    nutritionFacts: { calories: "43 kcal", fiber: "1.4 g", sugars: "8.2 g", water: "88%" }
  },
  "12": {
    benefits: ["Boosts Antibody Synthesis", "Improves Collagen Synthesis", "Clears Skin Complexion"],
    vitamins: [{ name: "Vitamin C", pct: "90% DV" }, { name: "Vitamin A", pct: "4% DV" }, { name: "Calcium", pct: "4% DV" }],
    wellnessProperties: "Nagpur Oranges contain hesperidin, a plant chemical shown to improve blood circulation and protect arterial walls from hardening.",
    botanicalFact: "Nagpur is widely crowned as the 'Orange City' of India, famous for its juicy, loose-skinned mandarin oranges.",
    nutritionFacts: { calories: "47 kcal", fiber: "2.0 g", sugars: "9.4 g", water: "87%" }
  },
  "13": {
    benefits: ["Instant Natural Energy", "Anti-inflammatory Tannins", "Soothes Stomach Lining"],
    vitamins: [{ name: "Vitamin C", pct: "24% DV" }, { name: "Folate", pct: "6% DV" }, { name: "Iron", pct: "4% DV" }],
    wellnessProperties: "High in natural fructose and sucrose for immediate revitalization. Loaded with tannins, which possess astringent and anti-bacterial effects.",
    botanicalFact: "Chikku is native to Central America but was introduced to coastal India, where it adapted beautifully to the seaside air.",
    nutritionFacts: { calories: "83 kcal", fiber: "5.3 g", sugars: "20.0 g", water: "72%" }
  },
  "14": {
    benefits: ["Relieves Muscle Fatigue", "Regulates Heart Rhythm", "Enhances Mood & Sleep"],
    vitamins: [{ name: "Vitamin B6", pct: "15% DV" }, { name: "Vitamin C", pct: "40% DV" }, { name: "Magnesium", pct: "10% DV" }],
    wellnessProperties: "Contains excellent levels of Potassium and Magnesium, which direct muscle relaxation pathways and assist in nerve signaling.",
    botanicalFact: "The Custard Apple has a soft, segmented skin that is gently broken open by hand to reveal a custard-like vanilla sweet pulp.",
    nutritionFacts: { calories: "94 kcal", fiber: "4.4 g", sugars: "21.0 g", water: "73%" }
  },
  "15": {
    benefits: ["Bromelain Protein Digestant", "Accelerates Muscle Repair", "Reduces Nasal Congestion"],
    vitamins: [{ name: "Vitamin C", pct: "100% DV" }, { name: "Manganese", pct: "76% DV" }, { name: "Vitamin B6", pct: "9% DV" }],
    wellnessProperties: "Bromelain, an enzyme found only in pineapples, breaks down dense proteins, reducing inflammation, bloating, and joint discomfort.",
    botanicalFact: "A pineapple is not a single fruit, but a large cluster of individual berries fused around a central stem.",
    nutritionFacts: { calories: "50 kcal", fiber: "1.4 g", sugars: "10.0 g", water: "86%" }
  },
  "16": {
    benefits: ["Ultra-Hydration (92% Water)", "Improves Athletic Endurance", "Fights Oxidative Stress"],
    vitamins: [{ name: "Lycopene", pct: "Extremely High" }, { name: "Vitamin C", pct: "14% DV" }, { name: "Vitamin A", pct: "11% DV" }],
    wellnessProperties: "High in L-Citrulline, an amino acid that converts to L-arginine, boosting nitric oxide production and relaxing blood vessels.",
    botanicalFact: "Lycopene levels in watermelon are actually about 40% higher than in raw tomatoes.",
    nutritionFacts: { calories: "30 kcal", fiber: "0.4 g", sugars: "6.2 g", water: "92%" }
  },
  "17": {
    benefits: ["Papain Digestive Enzyme", "Speeds Wound Healing", "Protects Skin Elastin"],
    vitamins: [{ name: "Vitamin C", pct: "101% DV" }, { name: "Vitamin A", pct: "20% DV" }, { name: "Folate", pct: "10% DV" }],
    wellnessProperties: "The active enzyme papain makes protein digestion effortless. Beta-cryptoxanthin antioxidants support joint integrity.",
    botanicalFact: "Papaya seeds are fully edible and have a sharp, peppery taste, often dried and ground as a pepper substitute.",
    nutritionFacts: { calories: "43 kcal", fiber: "1.7 g", sugars: "7.8 g", water: "88%" }
  },
  "18": {
    benefits: ["Supports Colon Health", "Prebiotic Gut Fuel", "Regulates Blood Sugar"],
    vitamins: [{ name: "Vitamin K", pct: "5% DV" }, { name: "Copper", pct: "16% DV" }, { name: "Potassium", pct: "4% DV" }],
    wellnessProperties: "Pears contain high ratios of pectin fiber, which nourishes good bacteria in the colon and aids natural digestive regularity.",
    botanicalFact: "Pears ripen best off the tree. They are harvested hard and mature slowly at cool room temperatures.",
    nutritionFacts: { calories: "57 kcal", fiber: "3.1 g", sugars: "9.8 g", water: "84%" }
  },
  "19": {
    benefits: ["Excellent Calcium Source", "Increases Hemoglobin", "Promotes Bone Density"],
    vitamins: [{ name: "Calcium", pct: "8% DV" }, { name: "Iron", pct: "6% DV" }, { name: "Potassium", pct: "7% DV" }],
    wellnessProperties: "Rich in mineral iron, potassium, and calcium. Figs help neutralize toxic acid residues and improve hemoglobin count.",
    botanicalFact: "Figs are biologically inverted flowers. Wasps enter a tiny opening to pollinate them internally.",
    nutritionFacts: { calories: "74 kcal", fiber: "2.9 g", sugars: "16.0 g", water: "79%" }
  },
  "20": {
    benefits: ["Sustains Muscular Energy", "Helps Manage Stress", "Balances Electrolytes"],
    vitamins: [{ name: "Vitamin B6", pct: "20% DV" }, { name: "Potassium", pct: "10% DV" }, { name: "Vitamin C", pct: "12% DV" }],
    wellnessProperties: "Vitamin B6 assists in producing serotonin and dopamine, hormones that improve mood, regulate sleep, and manage stress levels.",
    botanicalFact: "Yelakki Bananas are a prized south-Indian heirloom cultivar known for their tiny size and sweet cardamom-like aroma.",
    nutritionFacts: { calories: "89 kcal", fiber: "2.6 g", sugars: "12.0 g", water: "75%" }
  },
  "21": {
    benefits: ["Heart-Healthy Oleic Acid", "Absorbs Fat-Soluble Vitamins", "Protects Brain Cells"],
    vitamins: [{ name: "Vitamin E", pct: "10% DV" }, { name: "Folate", pct: "20% DV" }, { name: "Vitamin K", pct: "26% DV" }],
    wellnessProperties: "Loaded with monounsaturated fats that improve HDL cholesterol. Eating avocado helps the body absorb antioxidants from other fruits by up to 5x.",
    botanicalFact: "Avocados are botanically single-seeded berries. They are also known as 'Alligator Pears' due to their bumpy dark skin.",
    nutritionFacts: { calories: "160 kcal", fiber: "6.7 g", sugars: "0.7 g", water: "73%" }
  },
  "22": {
    benefits: ["Cooling Hydration", "Protects Kidney Health", "High Beta-Carotene"],
    vitamins: [{ name: "Vitamin A", pct: "60% DV" }, { name: "Vitamin C", pct: "45% DV" }, { name: "Potassium", pct: "8% DV" }],
    wellnessProperties: "Rich in organic potassium salts that encourage the excretion of kidney toxins, and compounds that lower systemic heat.",
    botanicalFact: "Muskmelons have a net-like skin that acts as a natural pressure indicator for ripeness during harvest.",
    nutritionFacts: { calories: "34 kcal", fiber: "0.9 g", sugars: "8.0 g", water: "90%" }
  }
};

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Fruit & Health Guide — Shirur Fruits" },
      {
        name: "description",
        content: "Explore the health benefits, vitamins, and wellness properties of our curated 22 premium fruits.",
      },
      { property: "og:title", content: "Fruit & Health Guide — Shirur Fruits" },
      {
        property: "og:description",
        content: "Detailed health benefits, nutrition profiles, and wellness facts of our luxury fresh fruits.",
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  useLenis();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  // Categories list
  const categories = ["ALL", "CITRUS", "BERRIES", "TROPICAL", "EXOTIC", "HEIRLOOM", "VINES"];

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        product.category.toUpperCase() === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        HEALTH_PROFILES[product.id]?.benefits.some((b) =>
          b.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <main className="relative bg-white text-foreground min-h-screen">
      <GlowCursor />
      <Nav />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-cream px-6 pt-40 pb-20 md:pt-48 md:pb-24">
        <div aria-hidden className="absolute -left-20 top-20 size-[350px] rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="absolute -right-20 -bottom-20 size-[380px] rounded-full bg-accent-orange/10 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
              <BookOpen className="size-3" /> The Botanical Library
            </span>
          </Reveal>
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
            Wellness & <br />
            <span className="font-editorial lowercase text-primary">nutrition guide.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-foreground/65 md:text-sm">
              Discover the health benefits, vitamin profiles, and wellness chemistry of our premium heirloom fruits. 
              We preserve each fruit's natural bio-compounds by harvesting only at peak ripeness and maintaining strict cold-chain shipping.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-border py-4 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-cream text-foreground/60 hover:bg-cream/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center text-foreground/45">
              <Search className="size-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search fruits or benefits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-border bg-cream py-1.5 pl-9 pr-4 text-xs placeholder-foreground/40 focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Fruits Health Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-cream/40 rounded-[2rem] border border-dashed border-border">
            <Info className="size-8 mx-auto text-foreground/30 mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/70">No matching fruits found</h3>
            <p className="text-xs text-foreground/50 mt-1">Try resetting the filter or using another search query.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const profile = HEALTH_PROFILES[product.id];
              return (
                <motion.div
                  key={product.id}
                  layoutId={`fruit-card-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer overflow-hidden rounded-[2rem] border border-border bg-white p-5 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm border border-border px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-foreground/70">
                        {product.category}
                      </span>
                    </div>

                    {/* Fruit details */}
                    <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-foreground/60 italic mt-0.5 line-clamp-1">
                      {product.tagline}
                    </p>

                    {/* Key Health Benefits */}
                    <div className="mt-4 space-y-1.5">
                      {profile?.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="size-3.5 text-leaf shrink-0" />
                          <span className="text-[10px] font-semibold text-foreground/80 truncate">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                    {/* Vitamin highlights */}
                    <div className="flex gap-2">
                      {profile?.vitamins.slice(0, 2).map((vit, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold text-leaf uppercase tracking-wider"
                        >
                          {vit.name}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                      Details <ChevronRight className="size-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Detail Overlay Modal */}
      <AnimatePresence>
        {selectedProduct && (() => {
          const profile = HEALTH_PROFILES[selectedProduct.id];
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                layoutId={`fruit-card-${selectedProduct.id}`}
                className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-[2.5rem] border border-border bg-white p-6 md:p-8 shadow-2xl"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-6 top-6 rounded-full border border-border bg-white p-2 hover:bg-cream transition-colors z-10"
                >
                  <ArrowLeft className="size-4" />
                </button>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-12 mt-4">
                  {/* Left Column: Image and Category */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative aspect-square w-full rounded-3xl bg-cream flex items-center justify-center p-6 border border-border">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span className="mt-3 rounded-full bg-cream border border-border px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-foreground/60">
                      {selectedProduct.category}
                    </span>
                    <span className="mt-1 text-[9px] text-foreground/40 font-semibold">
                      Origin: {selectedProduct.origin}
                    </span>

                    {/* Nutrition Facts */}
                    {profile && (
                      <div className="w-full mt-5 rounded-2xl border border-border bg-cream/40 p-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/45 border-b border-border pb-1.5 mb-2 flex items-center gap-1.5">
                          <Activity className="size-3" /> Nutrition facts
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-foreground/75">
                          <div className="flex justify-between border-r border-border pr-2">
                            <span className="opacity-60">Energy:</span>
                            <span>{profile.nutritionFacts.calories}</span>
                          </div>
                          <div className="flex justify-between pl-2">
                            <span className="opacity-60">Fiber:</span>
                            <span>{profile.nutritionFacts.fiber}</span>
                          </div>
                          <div className="flex justify-between border-r border-border pr-2 pt-1">
                            <span className="opacity-60">Sugars:</span>
                            <span>{profile.nutritionFacts.sugars}</span>
                          </div>
                          <div className="flex justify-between pl-2 pt-1">
                            <span className="opacity-60">Hydration:</span>
                            <span>{profile.nutritionFacts.water}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Title, Health Benefits, Chemistry */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-xs text-primary italic font-medium mt-1">
                        {selectedProduct.tagline}
                      </p>

                      {/* Health Benefits List */}
                      <div className="mt-5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 flex items-center gap-1.5">
                          <Heart className="size-3 text-primary" /> Key Health Benefits
                        </h4>
                        <div className="mt-2 space-y-2">
                          {profile?.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="size-4 text-leaf shrink-0 mt-0.5" />
                              <span className="text-xs font-bold text-foreground/80">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wellness Science */}
                      <div className="mt-5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 flex items-center gap-1.5">
                          <Flame className="size-3 text-accent-orange" /> Bio-Wellness Properties
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/70 bg-cream/30 p-3 rounded-xl border border-border">
                          {profile?.wellnessProperties}
                        </p>
                      </div>

                      {/* Botanical Trivia */}
                      <div className="mt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 flex items-center gap-1.5">
                          <Compass className="size-3 text-leaf" /> Botanical Heritage
                        </h4>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/60 italic">
                          "{profile?.botanicalFact}"
                        </p>
                      </div>
                    </div>

                    {/* Vitamin Details */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex gap-2">
                        {profile?.vitamins.map((vit, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-[9px] font-bold text-leaf uppercase tracking-wider"
                          >
                            {vit.name}: <span className="text-foreground">{vit.pct}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to={`/products/${selectedProduct.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-primary hover:underline"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
