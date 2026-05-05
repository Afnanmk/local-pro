// Provider detail hero — avatar, category badge, name, star rating, CTAs
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CategoryIcon } from '@/lib/icons'
import Image from 'next/image'
import { HiStar } from 'react-icons/hi2'
import { HiOutlineStar } from 'react-icons/hi2'
import type { ProviderDetail } from '@/types/supabase'

interface ProviderHeroProps {
  provider: ProviderDetail['provider']
  category: ProviderDetail['category']
}

function StarRating({ rating, totalReviews }: { rating: number; totalReviews: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const outlineStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <HiStar key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <span className="relative inline-flex">
            <HiOutlineStar className="h-5 w-5 text-yellow-400" />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <HiStar className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </span>
          </span>
        )}
        {Array.from({ length: outlineStars }).map((_, i) => (
          <HiOutlineStar key={`outline-${i}`} className="h-5 w-5 text-muted-foreground/30" />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">({totalReviews} reviews)</span>
    </div>
  )
}

export function ProviderHero({ provider, category }: ProviderHeroProps) {
  const initials = provider.business_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="overflow-hidden">
      {provider.avatar_url ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted sm:aspect-[21/9]">
          <Image
            src={provider.avatar_url}
            alt={provider.business_name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 66vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 sm:aspect-[21/9]">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 text-3xl font-bold text-blue-600 shadow-sm">
            {initials}
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8">
        {category && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <CategoryIcon name={category.icon_name} className="h-4 w-4" />
            {category.name}
          </span>
        )}

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {provider.business_name}
        </h1>

        <div className="mt-3">
          <StarRating rating={provider.rating} totalReviews={provider.total_reviews} />
        </div>

        {provider.emergency_service && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
            {provider.emergency_service}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="h-12 flex-1 bg-blue-600 text-white hover:bg-blue-700" size="lg">
            Contact Now
          </Button>
          <Button variant="outline" className="h-12 flex-1" size="lg">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}
