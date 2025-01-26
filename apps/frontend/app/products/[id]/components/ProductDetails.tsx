import { AmountButton } from '@/components/AmountButton'
import { HalfStar } from '@/components/svgs/HalfStar'
import { Star } from '@/components/svgs/Star'
import { ColorsCheckbox } from '@/components/ui/colors-checkbox'
import { SizesCheckbox } from '@/components/ui/sizes-checkbox'
import { IProduct } from '@/types/product-response'

const formatString = (value: string): string => {
  const formattedString = value.replace(/([a-z])([A-Z])/g, '$1-$2')
  const parts = formattedString.split('-')
  if (parts.length > 1) {
    parts[0] = parts[0].toUpperCase()
    return parts.join('-')
  }
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
}

export const ProductDetails = (product: IProduct) => {
  const fullStars = Math.floor(product.AvgRating)
  const hasHalfStar = product.AvgRating % 1 >= 0.5

  return (
    <div className="max-w-[36.875rem]">
      <div className="flex flex-col gap-3">
        <h1 className="sm:text-[2.5rem] text-2xl text-black font-integral-cf">
          {product.name}
        </h1>
        <div className="flex gap-3">
          <div className="flex gap-1">
            {Array.from({ length: fullStars }, (_, i) => (
              <Star key={i} />
            ))}
            {hasHalfStar && <HalfStar />}
          </div>
          <p className="md:text-sm inline text-xs text-black/60">
            <span className="text-black">{product.AvgRating}</span>/5
          </p>
        </div>
        <div className="flex gap-2">
          <p className="sm:text-3xl text-2xl font-bold">
            ${product.discountedPrice || product.price}
          </p>
          {product.discount && (
            <>
              <p className="sm:text-3xl text-2xl font-bold text-black/40 relative before:content-[''] before:absolute before:w-[110%] before:border before:border-[#999999] before:top-[50%] before:left-[50%] before:-translate-x-[50%]">
                ${product.price}
              </p>
              <div className="md:px-3 py-1 px-2 bg-red-600/10 flex items-center rounded-full">
                <p className="sm:text-base text-sm font-medium text-red-600">
                  -{product.discount}%
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {product.description && (
        <p className="sm:text-base mt-5 mb-6 pb-5 text-sm text-black/60 border-b border=black/10">
          {product.description}
        </p>
      )}
      <div
        className={`${!product.description && 'mt-5'} pb-6 border-b border-black/10`}
      >
        <h4 className="sm:text-base text-sm text-black/60 mb-4">
          Select Colors
        </h4>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color, idx) => (
            <ColorsCheckbox
              key={color}
              hex={color}
              arrowColor={color === 'white' ? 'black' : undefined}
              defaultChecked={idx === 0}
            />
          ))}
        </div>
      </div>
      <div className="mb-6 py-6 border-b border-black/10">
        <h4 className="sm:text-base text-sm text-black/60 mb-4">Choose Size</h4>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size, idx) => (
            <SizesCheckbox
              key={size}
              label={formatString(size)}
              defaultChecked={idx === 0}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <AmountButton amount={product.amount} />
        <button
          className="sm:text-base py-3 grow rounded-full text-sm text-white font-medium bg-black"
          type="submit"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
