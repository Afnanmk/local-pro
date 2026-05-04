"use client"

// Search input for filtering services by name
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

interface ServiceSearchProps {
  defaultValue?: string
}

export function ServiceSearch({ defaultValue = '' }: ServiceSearchProps) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const q = (formData.get('q') as string).trim()
    if (q) {
      router.push(`/services?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/services')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        name="q"
        type="text"
        defaultValue={defaultValue}
        placeholder="Search by service name..."
        className="h-10 w-full rounded-lg border border-border bg-input-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
      />
    </form>
  )
}
