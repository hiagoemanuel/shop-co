import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/components/Header'
import { MenuListProvider } from '@/contexts/MenuListContext'
import { SearchBarProvider } from '@/contexts/SearchBarContext'
import { Footer } from '@/components/Footer'
import './globals.css'

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
        className={`${satosho.className} ${intergralCF.variable} bg-white antialiased overflow-x-hidden mb-80`}
      >
        <MenuListProvider>
          <SearchBarProvider>
            <Header />
          </SearchBarProvider>
        </MenuListProvider>
        {children}
        <Footer />
      </body>
    </html>
  )
}
