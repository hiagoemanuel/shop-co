import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import cartProducts from '@/data/cart'
import { CartProdcuts } from './components/CartProducts'
import { Summary } from './components/Summary'

export default async function Cart() {
  return (
    <main className="md:mt-6 mt-5">
      <div className="2xl:px-0 max-w-[1440px] mx-auto px-4">
        <div className="md:gap-3 md:mb-6 mb-3 flex gap-2">
          <Link className="flex gap-1 items-center" href="/">
            <h5 className="md:text-base text-sm text-black/60 hover:text-black">
              Home
            </h5>
            <ChevronRight width="1rem" opacity="60%" />
          </Link>
          <Link className="flex gap-1 items-center" href="/cart">
            <h5 className="md:text-base text-sm text-black">Cart</h5>
          </Link>
        </div>
        <section>
          <h1 className="md:text-[2.5rem] mb-5 text-3xl font-bold font-integral-cf">
            Your Cart
          </h1>
          <div className="min-[900px]:flex-row flex flex-col gap-5">
            <CartProdcuts products={cartProducts} />
            <Summary />
          </div>
        </section>
      </div>
    </main>
  )
}
