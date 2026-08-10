import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { OccasionCollections } from '@/components/home/OccasionCollections';
import { LiveDarshanCard } from '@/components/home/LiveDarshanCard';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <main style={{ background: '#F5F0E8' }}>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. CATEGORY SHOWCASE */}
      <CategorySection />

      {/* 3. BEST SELLERS / FEATURED PRODUCTS */}
      <FeaturedSection />

      {/* 4. BRAND STORY / FEATURED PRODUCT */}
      <BrandStorySection />

      {/* 5. SACRED OCCASIONS */}
      <OccasionCollections />

      {/* 6. LIVE DARSHAN SHOWCASE */}
      <LiveDarshanCard />

      {/* 7. TESTIMONIALS / REVIEWS */}
      <TestimonialsSection />
    </main>
  );
}
