import orange from "@/assets/fruit-orange.png";
import lemon from "@/assets/fruit-lemon.png";
import pomegranate from "@/assets/fruit-pomegranate.png";
import mangosteen from "@/assets/fruit-mangosteen.png";
import grapes from "@/assets/fruit-grapes.png";
import strawberry from "@/assets/fruit-strawberry.png";
import mango from "@/assets/fruit-mango.png";
import dragonfruit from "@/assets/fruit-dragonfruit.png";

export type Category =
  | "Citrus"
  | "Berries"
  | "Tropical"
  | "Exotic"
  | "Heirloom"
  | "Vines";

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  badgeTone?: "orange" | "yellow" | "primary";
  rating: number;
  reviews: number;
  stock: number;
  origin: string;
  weight: string;
  tagline: string;
  description: string;
  notes: string[];
  highlights: { label: string; value: string }[];
  pairings: string[];
}

export const PRODUCTS: ShopProduct[] = [
  {
    id: "1",
    slug: "imperial-mangosteen",
    name: "Imperial Mangosteen",
    category: "Tropical",
    price: 14,
    oldPrice: 18,
    image: mangosteen,
    badge: "Limited",
    badgeTone: "orange",
    rating: 4.9,
    reviews: 218,
    stock: 24,
    origin: "Chanthaburi, Thailand",
    weight: "500 g · 6–7 pcs",
    tagline: "Velvet pulp, royal sweetness.",
    description:
      "Hand-harvested from a single estate at the precise hour of peak ripeness. Mangosteen's snow-white pulp delivers a perfumed sweetness balanced by orchid-soft acidity — the queen of tropical fruit.",
    notes: ["Lychee", "Peach", "White Flowers"],
    highlights: [
      { label: "Brix Sweetness", value: "19°" },
      { label: "Harvest", value: "48h ago" },
      { label: "Estate", value: "Single Origin" },
      { label: "Certified", value: "Organic" },
    ],
    pairings: ["Champagne", "Goat Cheese", "Cardamom Cream"],
  },
  {
    id: "2",
    slug: "amalfi-citron",
    name: "Amalfi Citron",
    category: "Citrus",
    price: 9.5,
    image: lemon,
    badge: "Seasonal Pick",
    rating: 5,
    reviews: 432,
    stock: 60,
    origin: "Amalfi Coast, Italy",
    weight: "750 g · 4 pcs",
    tagline: "Sun-honeyed Mediterranean gold.",
    description:
      "Grown on the terraced cliffs of Amalfi, these citrons carry a perfume so vivid it seasons a whole room. Thick fragrant peel, low acidity, and a juicy flesh that's nearly sweet on the tongue.",
    notes: ["Bergamot", "Honeysuckle", "Sea Mist"],
    highlights: [
      { label: "Peel Oil", value: "Ultra-high" },
      { label: "Harvest", value: "36h ago" },
      { label: "Acidity", value: "Low-Bright" },
      { label: "Certified", value: "DOP" },
    ],
    pairings: ["Burrata", "Olive Oil", "Pistachio"],
  },
  {
    id: "3",
    slug: "ruby-pomegranate",
    name: "Ruby Pomegranate",
    category: "Heirloom",
    price: 1.70,
    oldPrice: 1.90,
    image: pomegranate,
    badge: "Organic",
    badgeTone: "yellow",
    rating: 4.7,
    reviews: 156,
    stock: 18,
    origin: "Yazd, Iran",
    weight: "1.2 kg · 3 pcs",
    tagline: "Crystalline rubies, ancient terroir.",
    description:
      "An heirloom Persian cultivar grown in desert sun. Each fruit splits to reveal stained-glass arils — wine-sweet, deeply mineral, and bursting with juice.",
    notes: ["Red Berry", "Black Tea", "Iron"],
    highlights: [
      { label: "Aril Yield", value: "62%" },
      { label: "Harvest", value: "5d ago" },
      { label: "Vintage", value: "2026" },
      { label: "Certified", value: "Organic" },
    ],
    pairings: ["Lamb", "Walnut", "Pomegranate Molasses"],
  },
  {
    id: "4",
    slug: "sunblush-mango",
    name: "Sunblush Mango",
    category: "Tropical",
    price: 1.50,
    image: mango,
    rating: 4.8,
    reviews: 612,
    stock: 95,
    origin: "Ratnagiri, India",
    weight: "1 kg · 4 pcs",
    tagline: "Alphonso royalty, ripened on the tree.",
    description:
      "The Alphonso of Ratnagiri — saffron-fleshed, fiber-free, dripping with honey-tropical perfume. Tree-ripened the traditional way for unparalleled aroma.",
    notes: ["Saffron", "Honey", "Apricot"],
    highlights: [
      { label: "Brix", value: "22°" },
      { label: "Harvest", value: "60h ago" },
      { label: "Cultivar", value: "Alphonso" },
      { label: "Origin", value: "GI Tagged" },
    ],
    pairings: ["Cardamom Lassi", "Sticky Rice", "Lime"],
  },
  {
    id: "5",
    slug: "crystal-grapes",
    name: "Crystal Grapes",
    category: "Vines",
    price: 1.40,
    image: grapes,
    badge: "New",
    badgeTone: "primary",
    rating: 4.6,
    reviews: 89,
    stock: 42,
    origin: "Yamanashi, Japan",
    weight: "600 g · 1 bunch",
    tagline: "Translucent jewels, melt-on-tongue.",
    description:
      "Shine Muscat from Yamanashi — seedless, edible-skin, with a muscat aroma so pure it tastes like white wine made of fruit. Each bunch is hand-thinned to perfection.",
    notes: ["Muscat", "Rosewater", "Pear"],
    highlights: [
      { label: "Brix", value: "20°" },
      { label: "Harvest", value: "72h ago" },
      { label: "Cultivar", value: "Shine Muscat" },
      { label: "Grade", value: "Premium" },
    ],
    pairings: ["Goat Cheese", "Sparkling Sake", "Almond"],
  },
  {
    id: "6",
    slug: "field-strawberry",
    name: "Field Strawberry",
    category: "Berries",
    price: 6.5,
    oldPrice: 8,
    image: strawberry,
    badge: "-20%",
    badgeTone: "orange",
    rating: 4.9,
    reviews: 720,
    stock: 130,
    origin: "Wepion, Belgium",
    weight: "400 g · punnet",
    tagline: "Wild perfume in a tiny package.",
    description:
      "Fraises des bois grown wild-style in Belgian woodland soil. Pinkie-tip size, jam-intensity sweetness, with a perfume that fills a room when you open the box.",
    notes: ["Wild Berry", "Rose", "Vanilla"],
    highlights: [
      { label: "Brix", value: "14°" },
      { label: "Harvest", value: "18h ago" },
      { label: "Variety", value: "Mara des Bois" },
      { label: "Certified", value: "Organic" },
    ],
    pairings: ["Crème Fraîche", "Black Pepper", "Balsamic"],
  },
  {
    id: "7",
    slug: "pink-dragonfruit",
    name: "Pink Dragonfruit",
    category: "Exotic",
    price: 11,
    image: dragonfruit,
    rating: 4.7,
    reviews: 204,
    stock: 36,
    origin: "Binh Thuan, Vietnam",
    weight: "900 g · 2 pcs",
    tagline: "Magenta flesh, kiwi-sweet.",
    description:
      "Red-fleshed pitaya from coastal Vietnam — magenta-vivid, faintly tropical, with a delicate sweetness and edible black seeds that snap like poppy.",
    notes: ["Kiwi", "Watermelon", "Cactus Flower"],
    highlights: [
      { label: "Brix", value: "13°" },
      { label: "Harvest", value: "48h ago" },
      { label: "Variety", value: "Red Pitaya" },
      { label: "Vegan", value: "Yes" },
    ],
    pairings: ["Coconut Cream", "Lime", "Mint"],
  },
  {
    id: "8",
    slug: "sicilian-blood-orange",
    name: "Sicilian Blood Orange",
    category: "Citrus",
    price: 7,
    image: orange,
    badge: "Organic",
    badgeTone: "yellow",
    rating: 4.9,
    reviews: 511,
    stock: 88,
    origin: "Mount Etna, Sicily",
    weight: "1.5 kg · 8 pcs",
    tagline: "Volcanic soil, ruby juice.",
    description:
      "Tarocco oranges grown on volcanic slopes — the temperature swing between Etna's days and nights paints the flesh deep ruby and intensifies its raspberry-citrus tang.",
    notes: ["Raspberry", "Blood Orange", "Mineral"],
    highlights: [
      { label: "Brix", value: "13°" },
      { label: "Harvest", value: "40h ago" },
      { label: "Cultivar", value: "Tarocco" },
      { label: "Certified", value: "PGI · Organic" },
    ],
    pairings: ["Dark Chocolate", "Fennel", "Olive Oil"],
  },
  {
    id: "9",
    slug: "washington-red-apple",
    name: "Washington Red Apple",
    category: "Heirloom",
    price: 1.80,
    oldPrice: 2.20,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 122,
    stock: 55,
    origin: "Washington, USA",
    weight: "500 g · 3 pcs",
    tagline: "Crisp sweetness, timeless quality.",
    description: "Hand-selected, premium red apples. Perfectly crisp and sweet, delivering a clean, classic flavor profile.",
    notes: ["Honey", "Cinnamon", "Floral"],
    highlights: [
      { label: "Brix", value: "14°" },
      { label: "Type", value: "Red Delicious" },
      { label: "Crispness", value: "Excellent" }
    ],
    pairings: ["Cheddar Cheese", "Peanut Butter"]
  },
  {
    id: "10",
    slug: "granny-smith-green-apple",
    name: "Granny Smith Green Apple",
    category: "Heirloom",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 98,
    stock: 40,
    origin: "Himachal, India",
    weight: "500 g · 3 pcs",
    tagline: "Tart, crisp, and refreshing.",
    description: "Vibrant green apples with a signature sharp tartness and exceptionally firm, juicy bite. Hand-picked for perfect color and texture.",
    notes: ["Citrus", "Green Grass", "Acidic"],
    highlights: [
      { label: "Brix", value: "12°" },
      { label: "Acidity", value: "High" }
    ],
    pairings: ["Caramel", "Brie Cheese"]
  },
  {
    id: "11",
    slug: "sweet-lime-mosambi",
    name: "Sweet Lime (Mosambi)",
    category: "Citrus",
    price: 0.70,
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 140,
    stock: 120,
    origin: "Nagpur, India",
    weight: "1 kg · 6-8 pcs",
    tagline: "Cooling, sweet, high-hydration citrus.",
    description: "Locally harvested sweet limes with a mild, low-acid sweetness that is incredibly refreshing. Ideal for freshly pressed juices.",
    notes: ["Mild Citrus", "Lime Peel", "Honeyed"],
    highlights: [
      { label: "Juice Yield", value: "65%" },
      { label: "Acidity", value: "Very Low" }
    ],
    pairings: ["Rock Salt", "Mint Juice"]
  },
  {
    id: "12",
    slug: "nagpur-orange",
    name: "Nagpur Orange",
    category: "Citrus",
    price: 0.90,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 320,
    stock: 85,
    origin: "Nagpur, India",
    weight: "1 kg · 6 pcs",
    tagline: "Juicy segments, classic tangy sweetness.",
    description: "Sourced direct from Nagpur's premium orange orchards. Easy to peel with plump, sweet, and tangy segments.",
    notes: ["Zesty Orange", "Tangerine", "Bright Acid"],
    highlights: [
      { label: "Vitamin C", value: "High" },
      { label: "Harvest", value: "Daily" }
    ],
    pairings: ["Yogurt", "Dark Chocolate"]
  },
  {
    id: "13",
    slug: "sweet-chikku-sapodilla",
    name: "Sweet Chikku (Sapodilla)",
    category: "Tropical",
    price: 0.80,
    image: "https://images.unsplash.com/photo-1563147592-6767f86ba8da?w=600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 75,
    stock: 90,
    origin: "Gujarat, India",
    weight: "500 g · 5-7 pcs",
    tagline: "Brown sugar flavor, pear-like texture.",
    description: "Deliciously sweet Sapodilla with a smooth, malty, brown sugar flavor profile and soft granular texture.",
    notes: ["Brown Sugar", "Caramel", "Pear"],
    highlights: [
      { label: "Brix", value: "24°" },
      { label: "Texture", value: "Soft Granular" }
    ],
    pairings: ["Milkshakes", "Honey"]
  },
  {
    id: "14",
    slug: "custard-apple-sitaphal",
    name: "Royal Custard-Apple (Sitaphal)",
    category: "Tropical",
    price: 1.20,
    image: "https://images.unsplash.com/photo-1676993842546-ff9b61c68abc?w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 110,
    stock: 30,
    origin: "Purandar, India",
    weight: "500 g · 2 pcs",
    tagline: "Creamy custard pulp, tropical scent.",
    description: "Known locally as Sitaphal, these custard apples offer a luscious, creamy pulp that tastes like a blend of banana and vanilla custard.",
    notes: ["Vanilla Custard", "Pear", "Banana"],
    highlights: [
      { label: "Pulp", value: "Creamy" },
      { label: "Organic", value: "Yes" }
    ],
    pairings: ["Condensed Milk", "Ice Cream"]
  },
  {
    id: "15",
    slug: "golden-pineapple",
    name: "Golden Pineapple",
    category: "Tropical",
    price: 0.40,
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 185,
    stock: 65,
    origin: "Kerala, India",
    weight: "1 pc · 1.2 kg",
    tagline: "Sun-ripened tropical sweetness.",
    description: "A fully ripe golden pineapple with vibrant yellow flesh, delivering an intense tropical flavor that is both sweet and pleasantly tart.",
    notes: ["Tropical Punch", "Lime Zest", "Caramelized"],
    highlights: [
      { label: "Brix", value: "16°" },
      { label: "Acidity", value: "Balanced" }
    ],
    pairings: ["Coconut", "Chili Powder", "Mint"]
  },
  {
    id: "16",
    slug: "crimson-watermelon",
    name: "Crimson Watermelon",
    category: "Tropical",
    price: 0.25,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 290,
    stock: 50,
    origin: "Andhra Pradesh, India",
    weight: "1 pc · 3-4 kg",
    tagline: "Crisp, hydrating summer classic.",
    description: "Sweet and incredibly juicy watermelon with a deep red, crisp flesh and high water content. The ultimate thirst quencher.",
    notes: ["Melon Juice", "Green Cucumber", "Sugared"],
    highlights: [
      { label: "Water Content", value: "92%" },
      { label: "Weight", value: "3-4 kg" }
    ],
    pairings: ["Feta Cheese", "Lime Juice", "Black Pepper"]
  },
  {
    id: "17",
    slug: "sun-ripened-papaya",
    name: "Sun-Ripened Papaya",
    category: "Tropical",
    price: 0.35,
    image: "https://images.unsplash.com/photo-1693541178955-a64608f2cc0d?w=600&auto=format&fit=crop",
    rating: 4.5,
    reviews: 112,
    stock: 80,
    origin: "Karnataka, India",
    weight: "1 pc · 1 kg",
    tagline: "Buttery flesh, rich in enzymes.",
    description: "Deep orange, buttery-soft flesh with a sweet flavor and subtle musky aroma. Highly nutritious and packed with natural enzymes.",
    notes: ["Musk", "Honey", "Melon"],
    highlights: [
      { label: "Papain Enzymes", value: "High" },
      { label: "Vitamins", value: "A & C" }
    ],
    pairings: ["Lime", "Ginger", "Greek Yogurt"]
  },
  {
    id: "18",
    slug: "green-pears",
    name: "Green Pears",
    category: "Heirloom",
    price: 1.30,
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 95,
    stock: 70,
    origin: "Kashmir, India",
    weight: "500 g · 3 pcs",
    tagline: "Sweet, subtle floral notes.",
    description: "Fresh pears with a thin green skin and sweet, white, melting flesh that has a subtle floral fragrance.",
    notes: ["Honey", "Melon", "Rosewater"],
    highlights: [
      { label: "Brix", value: "13°" },
      { label: "Texture", value: "Soft & Juicy" }
    ],
    pairings: ["Blue Cheese", "Walnuts", "Honey"]
  },
  {
    id: "19",
    slug: "imperial-anjoor-fig",
    name: "Imperial Anjoor (Fig)",
    category: "Heirloom",
    price: 1.60,
    image: "https://images.unsplash.com/photo-1633932850276-4382027c868a?w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 68,
    stock: 45,
    origin: "Pune, India",
    weight: "250 g · 6-8 pcs",
    tagline: "Jammy pulp, honeyed sweetness.",
    description: "Fresh figs (Anjoor) with a soft purple skin and a rich, jammy red interior that bursts with complex, honeyed sweetness.",
    notes: ["Honey", "Berry Jam", "Maple"],
    highlights: [
      { label: "Fiber", value: "High" },
      { label: "Minerals", value: "Iron & Calcium" }
    ],
    pairings: ["Mascarpone", "Prosciutto", "Balsamic Glaze"]
  },
  {
    id: "20",
    slug: "yelakki-banana",
    name: "Yelakki Banana",
    category: "Tropical",
    price: 0.40,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 420,
    stock: 150,
    origin: "Mysore, India",
    weight: "1 Dozen",
    tagline: "Miniature, exceptionally sweet.",
    description: "Small-sized Yelakki bananas known for their thin skin and intense, honey-like sweetness. A local South Indian favorite.",
    notes: ["Honey", "Vanilla", "Cream"],
    highlights: [
      { label: "Size", value: "Miniature" },
      { label: "Sweetness", value: "Very High" }
    ],
    pairings: ["Peanut Butter", "Oats", "Milk"]
  },
  {
    id: "21",
    slug: "butter-fruit-avocado",
    name: "Butter Fruit (Avocado)",
    category: "Tropical",
    price: 1.00,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 198,
    stock: 55,
    origin: "Ooty, India",
    weight: "1 pc · 250 g",
    tagline: "Rich, buttery, nut-flavored flesh.",
    description: "Commonly known as Butter Fruit in India, this premium avocado features a rich, creamy, and nutty flesh that is loaded with healthy fats.",
    notes: ["Butter", "Nutty", "Avocado Cream"],
    highlights: [
      { label: "Healthy Fats", value: "High" },
      { label: "Texture", value: "Buttery Cream" }
    ],
    pairings: ["Toast", "Lime Juice", "Sourdough"]
  },
  {
    id: "22",
    slug: "masmillin-muskmelon",
    name: "Masmillin (Muskmelon)",
    category: "Vines",
    price: 0.40,
    image: "https://images.unsplash.com/photo-1638865553538-2434be4c62bd?w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 132,
    stock: 75,
    origin: "Punjab, India",
    weight: "1 pc · 1.5 kg",
    tagline: "Sweet orange pulp, high hydration.",
    description: "A fragrant muskmelon with pale green skin and sweet, soft orange flesh. Exceptionally juicy and perfect for hot afternoons.",
    notes: ["Melon", "Cantaloupe", "Watery"],
    highlights: [
      { label: "Water Content", value: "90%" },
      { label: "Aroma", value: "Musky" }
    ],
    pairings: ["Prosciutto", "Mint Leaves", "Salt"]
  }
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}
