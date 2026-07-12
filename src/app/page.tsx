import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { BestSellers } from "@/components/home/BestSellers";
import { FestivalCollection } from "@/components/home/FestivalCollection";
import { LiveDarshanPreview } from "@/components/home/LiveDarshanPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <ScrollReveal delay={0.1}>
        <FeaturedCollections />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <CategoryShowcase />
      </ScrollReveal>
      
      <ScrollReveal delay={0.15}>
        <BestSellers />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <FestivalCollection />
      </ScrollReveal>
      
      <ScrollReveal delay={0.15}>
        <LiveDarshanPreview />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <Testimonials />
      </ScrollReveal>
    </>
  );
}
