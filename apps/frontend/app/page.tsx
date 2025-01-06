import { BrandsTape } from './components/BrandsTape'
import { Hero } from './components/Hero'

import { BrowseDressCard } from './components/BrowseDressCard'
import { CustomerFeedback } from './components/CustomerFeedback'
import { FeaturedProducts } from './components/FeaturedProducts'
import api from '@/lib/axios'
import { IProduct } from '@/types/product'

export default async function Home() {
  const { data: arrivals } = await api.get<IProduct[]>('products/new-arrivals')
  const { data: topSelling } = await api.get<IProduct[]>('products/top-selling')

  return (
    <main>
      <Hero />
      <BrandsTape />
      <div className="max-w-[1440px] mx-auto">
        <FeaturedProducts title="New Arrivals" products={arrivals} />
        <span className="inline-block w-full border-b border-black/10" />
        <FeaturedProducts title="Top Selling" products={topSelling} />
        <BrowseDressCard />
        <CustomerFeedback />
      </div>
    </main>
  )
}
