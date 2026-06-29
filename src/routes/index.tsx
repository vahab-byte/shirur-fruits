import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/lib/use-lenis";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { GlowCursor } from "@/components/site/cursor";
import {
  FeaturedFruits,
  FreshPicks,
  OrganicCollection,
  Seasonal,
  Marquee,
  Categories,
  FlashSale,
  WhyChoose,
  FarmProcess,
  VideoSection,
  Reviews,
  Recipes,
  HealthBenefits,
  InstagramStrip,
  Newsletter,
  FAQ,
  Footer,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shirur Fruits — Hyper-Fresh Orchard Luxe" },
      {
        name: "description",
        content:
          "Shirur Fruits — a cinematic marketplace of estate-grown, hand-picked fruits delivered within 48 hours of peak ripeness.",
      },
      { property: "og:title", content: "Shirur Fruits — Hyper-Fresh Orchard Luxe" },
      {
        property: "og:description",
        content:
          "Estate-grown, hand-picked luxury fruits — delivered within 48 hours of peak ripeness.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  useLenis();
  return (
    <main className="relative">
      <GlowCursor />
      <Nav />
      <Hero />
      <FeaturedFruits />
      <FreshPicks />
      <Marquee />
      <OrganicCollection />
      <Seasonal />
      <Categories />
      <FlashSale />
      <WhyChoose />
      <FarmProcess />
      <VideoSection />
      <Reviews />
      <Recipes />
      <HealthBenefits />
      <InstagramStrip />
      <Newsletter />
      <FAQ />
      <Footer />
    </main>
  );
}
