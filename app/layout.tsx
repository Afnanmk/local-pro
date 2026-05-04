import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/features/header'
import type { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Local Service Finder — Trusted Local Services Near You',
  description:
    'Easily discover and compare trusted local services tailored to your needs, helping you connect with reliable providers in your area.',
  robots: 'noindex', // Remove once live
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  )
}
