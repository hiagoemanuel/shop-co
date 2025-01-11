import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import type { IProduct } from '@/types/product-response'
import Link from 'next/link'

export const FeaturedProducts = ({
  products,
  title,
}: {
  products: IProduct[]
  title: string
}) => {
  return (
    <section>
      <h1 className="md:text-5xl md:mt-16 md:mb-12 mt-12 mb-8 text-center text-4xl font-integral-cf">
        {title}
      </h1>
      <Carousel
        opts={{
          dragFree: true,
          breakpoints: { '(min-width:  1280px)': { active: false } },
        }}
      >
        <CarouselContent className="xl:justify-center xl:gap-5 mx-8 gap-4 select-none">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </CarouselContent>
      </Carousel>
      <Link className="view-all-button" href="/products">
        View All
      </Link>
    </section>
  )
}
