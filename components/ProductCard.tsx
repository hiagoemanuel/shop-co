import Link from 'next/link'
import type { IProduct } from '@/types/product'
import Image from 'next/image'
import { Star } from './svgs/Star'
import { HalfStar } from './svgs/HalfStar'

export const ProductCard = (product: IProduct) => {
  const fullStars = Math.floor(product.AVGrating)
  const hasHalfStar = product.AVGrating % 1 >= 0.5

  return (
    <Link
      className="md:w-[18.75rem] w-48 md:gap-4 flex flex-col gap-2 transition-transform group"
      href={`/products/${product.id}`}
    >
      <div className="md:w-[18.75rem] md:h-[18.75rem] w-48 h-48 rounded-xl overflow-hidden">
        <Image
          className="w-full -translate-y-[15%] transition-transform group-hover:scale-105"
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
        />
      </div>
      <div className="md:gap-2 flex flex-col gap-1">
        <h3
          className="md:text-xl text-base font-bold truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            {Array.from({ length: fullStars }, (_, i) => (
              <Star key={i} />
            ))}
            {hasHalfStar && <HalfStar />}
          </div>
          <p className="md:text-sm inline text-xs text-black/60">
            <span className="text-black">{product.AVGrating}</span>/5
          </p>
        </div>
        <div className="flex gap-2">
          <p className="md:text-2xl text-xl font-bold">
            $
            {product.discount
              ? Math.floor(
                  product.price - (product.discount * product.price) / 100,
                )
              : product.price}
          </p>
          {product.discount && (
            <>
              <p className="md:text-2xl text-xl font-bold text-black/40 relative before:content-[''] before:absolute before:w-[110%] before:border before:border-[#999999] before:top-[50%] before:left-[50%] before:-translate-x-[50%]">
                ${product.price}
              </p>
              <div className="md:px-3 py-1 px-2 bg-red-600/10 flex items-center rounded-full">
                <p className="text-xs font-medium text-red-600">
                  -{product.discount}%
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
