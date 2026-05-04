// Grid of provider cards for the /services/[slug] listing page
import { ProviderListingCard } from '@/components/ui/provider-listing-card'
import type { ProviderListing } from '@/types/supabase'

interface ProvidersGridProps {
  providers: ProviderListing[]
  serviceName: string
}

export function ProvidersGrid({ providers, serviceName }: ProvidersGridProps) {
  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-16 text-center">
        <p className="text-lg font-medium text-foreground">
          No providers available
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no providers offering {serviceName}. Check back
          soon or browse other services.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <ProviderListingCard key={provider.id} provider={provider} />
      ))}
    </div>
  )
}
