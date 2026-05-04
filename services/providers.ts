// Fetches featured (top-rated) service providers from Supabase
import { createClient } from '@/lib/supabase/server'
import type { ServiceProvider } from '@/types/supabase'

export async function getFeaturedProviders(limit = 6): Promise<ServiceProvider[]> {
  const supabase = await createClient()

  const { data: providers, error } = await supabase
    .from('service_providers')
    .select(`
      *,
      provider_services (
        services (
          name
        )
      )
    `)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error || !providers) {
    console.error('Failed to fetch providers:', error)
    return []
  }

  return providers.map((provider) => {
    const providerServices = provider.provider_services as { services: { name: string } | null }[] | null
    const primaryService = providerServices?.[0]?.services?.name ?? null
    const { provider_services: _, ...rest } = provider
    return { ...rest, primary_service: primaryService } as ServiceProvider
  })
}
