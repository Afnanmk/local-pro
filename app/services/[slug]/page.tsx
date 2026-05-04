// Service providers listing page — /services/[slug]
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProvidersByService } from '@/services/services'
import { ProvidersGrid } from '@/components/features/providers-grid'
import { CategoryIcon } from '@/lib/icons'
import { FiChevronRight } from 'react-icons/fi'

interface ServiceProvidersPageProps {
  params: Promise<{ slug: string }>
}

export default async function ServiceProvidersPage({
  params,
}: ServiceProvidersPageProps) {
  const { slug } = await params
  const data = await getProvidersByService(slug)

  if (!data) notFound()

  const { service, category, providers } = data

  return (
    <main className="flex flex-col">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <FiChevronRight className="h-4 w-4" />
            <Link
              href="/services"
              className="transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <FiChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.name}</span>
          </nav>

          {/* Title + category badge */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {category && (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <CategoryIcon name={category.icon_name} className="h-7 w-7" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {service.name}
              </h1>
              {service.description && (
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Provider count + Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {providers.length}{' '}
              {providers.length === 1 ? 'provider' : 'providers'} offering{' '}
              {service.name}
            </p>
          </div>

          <ProvidersGrid providers={providers} serviceName={service.name} />
        </div>
      </section>
    </main>
  )
}
