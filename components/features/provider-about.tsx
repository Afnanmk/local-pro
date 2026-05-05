// Provider detail — About section
import { Card } from '@/components/ui/card'
import type { ProviderDetail } from '@/types/supabase'

interface ProviderAboutProps {
  provider: ProviderDetail['provider']
}

export function ProviderAbout({ provider }: ProviderAboutProps) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground">About</h2>
      {provider.description ? (
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
          {provider.description}
        </p>
      ) : (
        <p className="mt-3 text-base text-muted-foreground">
          No description provided.
        </p>
      )}
    </Card>
  )
}
