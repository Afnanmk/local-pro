// Displays service categories in a responsive card grid
import { Card, CardContent } from '@/components/ui/card'
import { CategoryIcon } from '@/lib/icons'
import type { ServiceCategory } from '@/types/supabase'

interface CategoryGridProps {
  categories: ServiceCategory[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Service Categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse trusted professionals across every service you need at home
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            return (
              <Card
                key={category.id}
                className="group cursor-pointer transition-all duration-150 hover:shadow-lg hover:scale-[1.02]"
              >
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                    <CategoryIcon name={category.icon_name} className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.service_count}{' '}
                    {category.service_count === 1 ? 'service' : 'services'}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
