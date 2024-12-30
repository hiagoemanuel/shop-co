import { prisma } from '@/lib/prisma'

import { BrandsTape } from './components/BrandsTape'
import { Hero } from './components/Hero'
import { FeaturedProducts } from './components/FeaturedProducts'

import { BrowseDressCard } from './components/BrowseDressCard'
import { CustomerFeedback } from './components/CustomerFeedback'

export default async function Home() {
  const newArrivals = await prisma.product.findMany({
    take: 4,
    where: { AVGrating: { gte: 4 } },
  })
  const topSelling = await prisma.product.findMany({
    skip: 4,
    take: 4,
    where: { AVGrating: { gte: 4 } },
  })

  return (
    <main>
      <Hero />
      <BrandsTape />
      <div className="max-w-[1440px] mx-auto">
        <FeaturedProducts title="New Arrivals" products={newArrivals} />
        <span className="inline-block w-full border-b border-black/10" />
        <FeaturedProducts title="Top Selling" products={topSelling} />
        <BrowseDressCard />
        <CustomerFeedback />
      </div>
    </main>
  )
}
