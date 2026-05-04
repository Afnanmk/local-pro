// Services listing page — displays all available services in a searchable grid
import Link from 'next/link'
import { getAllServices } from '@/services/services'
import { ServiceSearch } from '@/components/features/service-search'
import { ServicesGrid } from '@/components/features/services-grid'
import { FiChevronRight } from 'react-icons/fi'

interface ServicesPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const { q } = await searchParams
  const services = await getAllServices(q)

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
            <span className="text-foreground">Services</span>
          </nav>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Browse All Services
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Find the right professional for your needs. Browse our full catalog
            of services available in your area.
          </p>

          {/* Search bar */}
          <div className="mt-8">
            <ServiceSearch defaultValue={q} />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {services.length}{' '}
              {services.length === 1 ? 'service' : 'services'} found
              {q ? ` for "${q}"` : ''}
            </p>
          </div>
          <ServicesGrid services={services} />
        </div>
      </section>
    </main>
  )
}
