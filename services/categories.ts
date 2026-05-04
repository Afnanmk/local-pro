// Fetches service categories with their service counts from Supabase
import { createClient } from '@/lib/supabase/server'
import type { ServiceCategory } from '@/types/supabase'

export async function getAllCategories(): Promise<ServiceCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('service_categories')
    .select('*')
    .order('name')

  if (error || !categories) {
    console.error('Failed to fetch categories:', error)
    return []
  }

  // Count services per category
  const { data: counts, error: countError } = await supabase
    .from('services')
    .select('category_id')

  if (countError || !counts) {
    console.error('Failed to fetch service counts:', countError)
    return categories.map((c) => ({ ...c, service_count: 0 }))
  }

  const countMap = new Map<string, number>()
  for (const row of counts) {
    countMap.set(row.category_id, (countMap.get(row.category_id) ?? 0) + 1)
  }

  return categories.map((category) => ({
    ...category,
    service_count: countMap.get(category.id) ?? 0,
  })) as ServiceCategory[]
}
