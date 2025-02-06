'use client'

import { AmountButton } from '@/components/AmountButton'
import { HalfStar } from '@/components/svgs/HalfStar'
import { Star } from '@/components/svgs/Star'
import { ColorsRadioGroupItem } from '@/components/ui/colors-radio'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import { SizeRadioGroupItem } from '@/components/ui/sizes-radio'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'
import { IProduct } from '@/types/product-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formatString = (value: string): string => {
  const formattedString = value.replace(/([a-z])([A-Z])/g, '$1-$2')
  const parts = formattedString.split('-')
  if (parts.length > 1) {
    parts[0] = parts[0].toUpperCase()
    return parts.join('-')
  }
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
}

const formSchema = z.object({
  color: z.string(),
  size: z.string(),
  amount: z.number(),
})

export const ProductDetails = (product: IProduct) => {
  const { toast } = useToast()
  const fullStars = Math.floor(product.AvgRating)
  const hasHalfStar = product.AvgRating % 1 >= 0.5
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: product.colors[0],
      size: product.sizes[0],
      amount: 1,
    },
  })

  const addToCart = async (values: z.infer<typeof formSchema>) => {
    const session = await getSession()
    try {
      const { status } = await api.post(
        `/carts/${session?.user.id}/${product.id}`,
        { ...values },
      )

      if (status === 201) {
        toast({
          title: 'Congratulations 😁',
          description: 'Your product has added to your cart.',
        })
      } else {
        throw new Error()
      }
    } catch {
      toast({
        title: 'Something went wrong, try again...',
        variant: 'destructive',
      })
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
            <span className="text-black">{product.AvgRating}</span>/5
          </p>
        </div>
        <div className="flex gap-2">
          <p className="sm:text-3xl text-2xl font-bold">
            ${product.definedPrice}
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addToCart)}>
          <div
            className={`${!product.description && 'mt-5'} pb-6 border-b border-black/10`}
          >
            <h4 className="sm:text-base text-sm text-black/60 mb-4">
              Select Colors
            </h4>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    className="flex flex-wrap gap-3"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {product.colors.map((color) => (
                      <FormItem key={color}>
                        <FormControl>
                          <ColorsRadioGroupItem value={color} hex={color} />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6 py-6 border-b border-black/10">
            <h4 className="sm:text-base text-sm text-black/60 mb-4">
              Choose Size
            </h4>
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    className="flex flex-wrap gap-3"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {product.sizes.map((size) => (
                      <FormItem key={size}>
                        <FormControl>
                          <SizeRadioGroupItem
                            label={formatString(size)}
                            value={size}
                          />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AmountButton
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      amount={product.amount}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              className="sm:text-base py-3 grow rounded-full text-sm text-white font-medium bg-black"
              type="submit"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
