// Card component for displaying a service provider in featured listings
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FiMapPin, FiStar } from 'react-icons/fi'
import type { ServiceProvider } from '@/types/supabase'

interface ProviderCardProps {
  provider: ServiceProvider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const initials = provider.business_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="group flex min-w-[280px] flex-col transition-all duration-150 hover:shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        {/* Avatar */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground">
          {initials}
        </div>

        {/* Business name */}
        <h3 className="text-center text-base font-semibold tracking-tight">
          {provider.business_name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <FiStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{provider.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({provider.total_reviews} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <FiMapPin className="h-4 w-4" />
          <span>{provider.city}</span>
        </div>

        {/* Service tag */}
        {provider.primary_service && (
          <Badge variant="secondary">{provider.primary_service}</Badge>
        )}
      </CardContent>
    </Card>
  )
}
