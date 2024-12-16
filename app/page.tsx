import { BrandsTape } from './components/BrandsTape'
import { Hero } from './components/Hero'
import { FeaturedProducts } from './components/FeaturedProducts'

import newArrivals from '@/data/new-arrivals'
import topSelling from '@/data/top-selling'

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsTape />
      <div className="max-w-[1440px] mx-auto">
        <FeaturedProducts title="New Arrivals" products={newArrivals} />
        <span className="inline-block w-full border-b border-black/10" />
        <FeaturedProducts title="Top Selling" products={topSelling} />
      </div>
    </main>
  )
}
