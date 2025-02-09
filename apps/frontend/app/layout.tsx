import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/components/Header'
import { MenuListProvider } from '@/contexts/MenuListContext'
import { Footer } from '@/components/Footer'
import './globals.css'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { tanstackClient } from '@/lib/tanstack'

const satosho = localFont({
  src: './fonts/satoshi.woff2',
  variable: '--font-satoshi',
})

const intergralCF = localFont({
  src: './fonts/integralCF-Bold.woff2',
  weight: '700',
  variable: '--font-integral-cf',
})

export const metadata: Metadata = { title: 'Shop.co | E-Commerce' }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${satosho.className} ${intergralCF.variable} bg-white antialiased overflow-x-hidden`}
      >
        <Suspense>
          <QueryClientProvider client={tanstackClient}>
            <MenuListProvider>
              <Header />
            </MenuListProvider>
            {children}
            <Footer />
          </QueryClientProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  )
}
