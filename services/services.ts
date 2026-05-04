// Fetches all services with category info and provider counts from Supabase
import { createClient } from '@/lib/supabase/server'
import type { ServiceWithCategory, ServiceWithProviders, ProviderListing } from '@/types/supabase'

export async function getAllServices(search?: string): Promise<ServiceWithCategory[]> {
  const supabase = await createClient()

  let query = supabase
    .from('services')
    .select(
      `
      id, name, slug, description, category_id, created_at,
      service_categories ( name, icon_name ),
      provider_services ( provider_id )
    `
    )
    .order('name')

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query

  if (error || !data) {
    console.error('Failed to fetch services:', error)
    return []
  }

  return data.map((row) => {
    const categories = row.service_categories as { name: string; icon_name: string }[] | null
    const category = categories?.[0] ?? null
    const providers = row.provider_services as { provider_id: string }[] | null

    return {
      id: row.id,
      category_id: row.category_id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      created_at: row.created_at,
      category_name: category?.name ?? 'Unknown',
      category_icon: category?.icon_name ?? 'FiGrid',
      provider_count: providers?.length ?? 0,
    } as ServiceWithCategory
  })
}

export async function getProvidersByService(
  slug: string
): Promise<ServiceWithProviders | null> {
  const supabase = await createClient()

  const { data: service, error } = await supabase
    .from('services')
    .select(
      `
      id, name, slug, description,
      service_categories (name, icon_name),
      provider_services (
        base_price,
        service_providers (
          id, business_name, description, city, rating, total_reviews, avatar_url, phone, email
        )
      )
    `
    )
    .eq('slug', slug)
    .single()

  if (error || !service) return null

  const rows = (service.provider_services ?? []) as unknown as {
    base_price: number | null
    service_providers: {
      id: string
      business_name: string
      description: string | null
      city: string
      rating: number
      total_reviews: number
      avatar_url: string | null
    } | null
  }[]

  const providers: ProviderListing[] = rows
    .filter((ps) => ps.service_providers !== null)
    .map((ps) => {
      const sp = ps.service_providers!
      return {
        id: sp.id,
        business_name: sp.business_name,
        description: sp.description,
        city: sp.city,
        rating: sp.rating,
        total_reviews: sp.total_reviews,
        avatar_url: sp.avatar_url,
        base_price: ps.base_price,
      }
    })

  const category = service.service_categories as unknown as {
    name: string
    icon_name: string
  } | null

  return {
    service: {
      id: service.id,
      name: service.name,
      slug: service.slug,
      description: service.description,
    },
    category: category ?? null,
    providers,
  }
}
