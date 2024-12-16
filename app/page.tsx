import { BrandsTape } from './components/BrandsTape'
import { Hero } from './components/Hero'
import { NewArrivals } from './components/NewArrivals'

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsTape />
      <div className="max-w-[1440px] mx-auto">
        <NewArrivals />
      </div>
    </main>
  )
}
