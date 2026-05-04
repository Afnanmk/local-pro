// Homepage — Server Component that assembles all homepage sections
import { getAllCategories } from '@/services/categories'
import { getFeaturedProviders } from '@/services/providers'
import { HeroSection } from '@/components/features/hero-section'
import { CategoryGrid } from '@/components/features/category-grid'
import { FeaturedProviders } from '@/components/features/featured-providers'
import { HowItWorks } from '@/components/features/how-it-works'
import { Footer } from '@/components/features/footer'

export default async function HomePage() {
  const [categories, providers] = await Promise.all([
    getAllCategories(),
    getFeaturedProviders(6),
  ])

  return (
    <main className="flex flex-col">
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProviders providers={providers} />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Footer />
    </main>
  )
}
