// Fetches featured (top-rated) service providers and individual provider details from Supabase
import { createClient } from '@/lib/supabase/server'
import type { ServiceProvider, ProviderDetail, ProviderServiceOffering } from '@/types/supabase'

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

export async function getProviderById(
  providerId: string
): Promise<ProviderDetail | null> {
  const supabase = await createClient()

  const { data: providers, error } = await supabase
    .from('service_providers')
    .select(
      `
      *,
      provider_services (
        base_price,
        services (
          id, name, slug, description,
          service_categories (name, slug, icon_name)
        )
      )
    `
    )
    .eq('id', providerId)
    .single()

  if (error || !providers) return null

  const rawProviderServices = (providers.provider_services ?? []) as unknown as {
    base_price: number | null
    services: {
      id: string
      name: string
      slug: string
      description: string | null
      service_categories: {
        name: string
        slug: string
        icon_name: string
      } | null
    } | null
  }[]

  const services: ProviderServiceOffering[] = rawProviderServices
    .filter((ps) => ps.services !== null)
    .map((ps) => {
      const svc = ps.services!
      return {
        id: svc.id,
        name: svc.name,
        slug: svc.slug,
        description: svc.description,
        base_price: ps.base_price,
      }
    })

  const category = services.length > 0
    ? rawProviderServices[0]?.services?.service_categories ?? null
    : null
  const { provider_services: _, ...provider } = providers

  return {
    provider,
    services,
    category,
  }
}
