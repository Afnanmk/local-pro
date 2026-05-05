// Provider detail — Services Offered grid
import { Card } from '@/components/ui/card'
import { FiCheckCircle } from 'react-icons/fi'
import type { ProviderServiceOffering } from '@/types/supabase'

interface ProviderServicesProps {
  services: ProviderServiceOffering[]
}

export function ProviderServices({ services }: ProviderServicesProps) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground">Services Offered</h2>

      {services.length === 0 ? (
        <p className="mt-4 text-muted-foreground">This provider offers no services currently.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
            >
              <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{service.name}</h3>
                {service.description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                )}
                <p className="mt-2 text-sm font-semibold text-blue-600">
                  {service.base_price != null
                    ? `From $${service.base_price}/hr`
                    : 'Request Quote'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
