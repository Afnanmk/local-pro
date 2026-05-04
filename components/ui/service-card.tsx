// Card component for displaying a service in the listing grid
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CategoryIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { FiChevronRight, FiUsers } from 'react-icons/fi'
import type { ServiceWithCategory } from '@/types/supabase'

interface ServiceCardProps {
  service: ServiceWithCategory
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {

  return (
    <Link href={`/services/${service.slug}`}>
      <Card
        className={cn(
          'group flex h-full cursor-pointer flex-col transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5',
          className
        )}
      >
        {/* Icon + Header */}
        <div className="flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <CategoryIcon name={service.category_icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-base font-semibold text-foreground">
                {service.name}
              </h3>
              <FiChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <Badge variant="secondary" className="mt-1.5">
              {service.category_name}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {service.description && (
          <p className="px-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        )}

        {/* Provider count */}
        <div className="mt-auto flex items-center gap-1.5 px-6 pb-6 pt-3 text-sm text-muted-foreground">
          <FiUsers className="h-4 w-4" />
          <span>
            {service.provider_count}{' '}
            {service.provider_count === 1 ? 'provider' : 'providers'} available
          </span>
        </div>
      </Card>
    </Link>
  )
}
