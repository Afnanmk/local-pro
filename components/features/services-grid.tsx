// Responsive grid of service cards for the services listing page
import { ServiceCard } from '@/components/ui/service-card'
import type { ServiceWithCategory } from '@/types/supabase'

interface ServicesGridProps {
  services: ServiceWithCategory[]
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No services found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or browse all services.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
