import { ProductCard } from '@/components/ProductCard'
import type { IProduct } from '@/types/product'
import Link from 'next/link'

export const FeaturedProducts = ({
  products,
  title,
}: { products: IProduct[]; title: string }) => {
  return (
    <section>
      <h1 className="md:text-5xl md:mt-16 md:mb-12 mt-12 mb-8 text-center text-4xl font-integral-cf">
        {title}
      </h1>
      <div className="md:gap-5 px-8 flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard {...product} key={product.product.name} />
        ))}
      </div>
      <Link className="view-all-button" href="/products">
        View All
      </Link>
    </section>
  )
}
