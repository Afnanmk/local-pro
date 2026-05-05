// Provider detail page — /providers/[id]
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviderById } from '@/services/providers'
import { ProviderHero } from '@/components/features/provider-hero'
import { ProviderAbout } from '@/components/features/provider-about'
import { ProviderServices } from '@/components/features/provider-services'
import { ProviderSidebar } from '@/components/features/provider-sidebar'
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi'

interface ProviderDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProviderDetailPage({
  params,
}: ProviderDetailPageProps) {
  const { id } = await params
  const data = await getProviderById(id)

  if (!data) notFound()

  const { provider, services, category } = data

  return (
    <main className="flex flex-col">
      {/* Breadcrumb bar */}
      <section className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <FiChevronRight className="h-4 w-4 shrink-0" />
              <Link href="/services" className="transition-colors hover:text-foreground">
                Services
              </Link>
              {services.length > 0 && (
                <>
                  <FiChevronRight className="h-4 w-4 shrink-0" />
                  <Link
                    href={`/services/${services[0].slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {services[0].name}
                  </Link>
                </>
              )}
              <FiChevronRight className="h-4 w-4 shrink-0" />
              <span className="truncate text-foreground">{provider.business_name}</span>
            </nav>

            {services.length > 0 && (
              <Link
                href={`/services/${services[0].slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                <FiArrowLeft className="h-4 w-4" />
                Back to providers
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left column — main content */}
            <div className="flex flex-1 flex-col gap-8 lg:max-w-[70%]">
              <ProviderHero provider={provider} category={category} />
              <ProviderAbout provider={provider} />
              <ProviderServices services={services} />
            </div>

            {/* Right column — sidebar */}
            <div className="w-full lg:w-[350px] lg:shrink-0">
              <ProviderSidebar provider={provider} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
