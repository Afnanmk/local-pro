// Provider card for the service listing page — avatar, rating, description, location, price, CTA
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { HiStar } from 'react-icons/hi2'
import { FiMapPin } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import type { ProviderListing } from '@/types/supabase'

interface ProviderListingCardProps {
  provider: ProviderListing
  className?: string
}

function StarRating({ rating, totalReviews }: { rating: number; totalReviews: number }) {
  const filled = Math.round(rating)

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          className={cn(
            'h-4 w-4',
            i < filled
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground/30'
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-foreground">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-muted-foreground">
        ({totalReviews})
      </span>
    </div>
  )
}

export function ProviderListingCard({ provider, className }: ProviderListingCardProps) {
  const initials = provider.business_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const priceLabel =
    provider.base_price != null
      ? `From $${provider.base_price}/hr`
      : 'Request Quote'

  return (
    <Card className={cn('group flex flex-col transition-all duration-150 hover:shadow-lg', className)}>
      {/* Avatar + header */}
      <div className="flex items-start gap-4 p-6">
        {provider.avatar_url ? (
          <Image
            src={provider.avatar_url}
            alt={provider.business_name}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-600">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground">
            {provider.business_name}
          </h3>

          <StarRating rating={provider.rating} totalReviews={provider.total_reviews} />

          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <FiMapPin className="h-3.5 w-3.5" />
            <span>{provider.city}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {provider.description && (
        <p className="px-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {provider.description}
        </p>
      )}

      {/* Footer: price + CTA */}
      <div className="mt-auto flex items-center justify-between px-6 pb-6 pt-4">
        <span className="text-sm font-semibold text-blue-600">
          {priceLabel}
        </span>
        <Link href={`/providers/${provider.id}`} className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors duration-150 hover:bg-accent hover:text-accent-foreground">
          View Profile
        </Link>
      </div>
    </Card>
  )
}
