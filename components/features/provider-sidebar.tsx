// Provider detail — Right sidebar: hours, service area, contact, quote form
import { Card } from '@/components/ui/card'
import { FiClock, FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi'
import type { ProviderDetail } from '@/types/supabase'

interface ProviderSidebarProps {
  provider: ProviderDetail['provider']
}

function BusinessHours({ hours }: { hours: string }) {
  const lines = hours.trim().split('\n').filter(Boolean)

  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <FiClock className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{line}</span>
        </div>
      ))}
    </div>
  )
}

function ServiceArea({ area }: { area: string }) {
  return (
    <div>
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{area}</span>
      </div>
      <div className="mt-3 flex h-32 items-center justify-center rounded-lg bg-muted">
        <FiMapPin className="h-8 w-8 text-muted-foreground/40" />
        <span className="ml-2 text-sm text-muted-foreground">Map</span>
      </div>
    </div>
  )
}

function GetInTouch({ provider }: { provider: ProviderDetail['provider'] }) {
  return (
    <div className="space-y-3 text-sm">
      {provider.phone && (
        <a
          href={`tel:${provider.phone}`}
          className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700"
        >
          <FiPhone className="h-4 w-4 shrink-0" />
          {provider.phone}
        </a>
      )}
      {provider.email && (
        <a
          href={`mailto:${provider.email}`}
          className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700"
        >
          <FiMail className="h-4 w-4 shrink-0" />
          {provider.email}
        </a>
      )}
      {provider.website_url && (
        <a
          href={`https://${provider.website_url.replace(/^https?:\/\//, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700"
        >
          <FiGlobe className="h-4 w-4 shrink-0" />
          {provider.website_url}
        </a>
      )}
    </div>
  )
}

function SidebarSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function ProviderSidebar({ provider }: ProviderSidebarProps) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      {/* Business Hours */}
      <Card className="p-6">
        <SidebarSection title="Business Hours">
          {provider.business_hours ? (
            <BusinessHours hours={provider.business_hours} />
          ) : (
            <p className="text-sm text-muted-foreground">Not specified</p>
          )}
        </SidebarSection>
      </Card>

      {/* Service Area */}
      <Card className="p-6">
        <SidebarSection title="Service Area">
          {provider.service_area ? (
            <ServiceArea area={provider.service_area} />
          ) : (
            <p className="text-sm text-muted-foreground">Not specified</p>
          )}
        </SidebarSection>
      </Card>

      {/* Get in Touch */}
      <Card className="p-6">
        <SidebarSection title="Get in Touch">
          <GetInTouch provider={provider} />
        </SidebarSection>
      </Card>
    </div>
  )
}
