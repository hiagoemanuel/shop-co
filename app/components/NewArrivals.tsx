import { ProductCard } from '@/components/ProductCard'
import data from '@/public/new-arrivals'
import Link from 'next/link'

export const NewArrivals = () => {
  return (
    <section className="border-b border-black/10">
      <h1 className="md:text-5xl md:mt-16 md:mb-12 mt-12 mb-8 text-center text-4xl font-integral-cf">
        New Arrivals
      </h1>
      <div className="md:gap-5 px-8 flex flex-wrap gap-4 justify-center">
        {data.map((product) => (
          <ProductCard {...product} key={product.product.name} />
        ))}
      </div>
      <Link className="view-all-button" href="/prodcuts">
        View All
      </Link>
    </section>
  )
}
