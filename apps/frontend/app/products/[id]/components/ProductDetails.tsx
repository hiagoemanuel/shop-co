'use client'

import { HalfStar } from '@/components/svgs/HalfStar'
import { Star } from '@/components/svgs/Star'
import { ColorsCheckbox } from '@/components/ui/colors-checkbox'
import { SizesCheckbox } from '@/components/ui/sizes-checkbox'
import { IProduct } from '@/types/product-response'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

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
  const [amountCart, setAmountCart] = useState(1)
  const fullStars = Math.floor(product.AVGrating)
  const hasHalfStar = product.AVGrating % 1 >= 0.5

  const handlerAmountInput = (operator: '+' | '-') => {
    if (operator === '+') {
      if (amountCart < product.amount) setAmountCart(amountCart + 1)
    } else {
      if (amountCart > 1) setAmountCart(amountCart - 1)
    }
  }

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
            <span className="text-black">{product.AVGrating}</span>/5
          </p>
        </div>
        <div className="flex gap-2">
          <p className="sm:text-3xl text-2xl font-bold">
            $
            {product.discount
              ? Math.floor(
                  product.price - (product.discount * product.price) / 100,
                )
              : product.price}
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
        <div className="bg-cyan rounded-full overflow-hidden flex">
          <button
            className="py-3 px-4"
            type="button"
            onClick={() => handlerAmountInput('-')}
          >
            <Minus className="size-5" />
          </button>
          <input
            className="reset-numeric-input text-center"
            type="number"
            value={amountCart}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (value > amountCart) handlerAmountInput('+')
              if (value < amountCart) handlerAmountInput('-')
            }}
            min={1}
            max={product.amount}
          />
          <button
            className="py-3 px-4"
            type="button"
            onClick={() => handlerAmountInput('+')}
          >
            <Plus className="size-5" />
          </button>
        </div>
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
