// Persistent header with logo, desktop navigation, action buttons, and mobile menu
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/components/features/mobile-nav'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  // Hardcoded for now — auth integration comes later
  const isLoggedIn = false

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          LocalServiceFinder
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            /* User menu (placeholder — auth integration later) */
            <Button variant="ghost" size="sm">
              My Account
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <MobileNav navLinks={navLinks} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}
