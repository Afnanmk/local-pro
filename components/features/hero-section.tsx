"use client"

// Hero section with headline, subheading, gradient background, and search bar
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FiSearch, FiMapPin } from 'react-icons/fi'

const serviceTypes = [
  { value: '', label: 'All Services' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'painting', label: 'Painting' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'moving', label: 'Moving' },
]

export function HeroSection() {
  const [location, setLocation] = useState('')
  const [serviceType, setServiceType] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Navigate to search results
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Trusted Local Services Near You
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
          Easily discover and compare trusted local services tailored to your needs,
          helping you connect with reliable providers in your area.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <FiMapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter your city or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 w-full rounded-lg border border-transparent bg-white pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-white/40"
            />
          </div>
          <div className="relative sm:w-48">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-transparent bg-white px-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-white/40"
            >
              {serviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50"
          >
            <FiSearch className="h-5 w-5" />
            Search
          </Button>
        </form>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
          <span>Trusted by 500+ providers</span>
          <span className="hidden sm:inline">|</span>
          <span>10,000+ happy customers</span>
          <span className="hidden sm:inline">|</span>
          <span>Verified reviews</span>
        </div>
      </div>
    </section>
  )
}
