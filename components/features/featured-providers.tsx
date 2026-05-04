// Displays featured (top-rated) service providers in a scrollable grid
import Link from 'next/link'
import { ProviderCard } from '@/components/ui/provider-card'
import type { ServiceProvider } from '@/types/supabase'

interface FeaturedProvidersProps {
  providers: ServiceProvider[]
}

export function FeaturedProviders({ providers }: FeaturedProvidersProps) {
  if (providers.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground">No providers found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Top-Rated Service Providers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Highly rated professionals ready to help with your next project
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on tablet+ */}
        <div className="mt-12 grid auto-cols-[280px] grid-flow-col gap-6 overflow-x-auto pb-4 sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View all providers →
          </Link>
        </div>
      </div>
    </section>
  )
}
