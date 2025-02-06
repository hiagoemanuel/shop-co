'use client'

import { AmountButton } from '@/components/AmountButton'
import { Trash } from '@/components/svgs/Trash'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'
import { ICartProducts } from '@/types/cart'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export const CartProdcuts = ({
  productsList,
}: {
  productsList: ICartProducts[]
}) => {
  const [products, setProducts] = useState<ICartProducts[]>(productsList)
  const { toast } = useToast()

  const deleteFromCart = async (productId: string) => {
    try {
      const session = await getSession()
      const { status } = await api.delete(
        `/carts/${session?.user.id}/${productId}`,
      )
      if (status === 200) {
        const { data: newProductsList } = await api.get<ICartProducts[]>(
          `/carts/${session?.user.id}`,
        )
        setProducts(newProductsList)
        toast({
          title: 'Product removed 😢',
          variant: 'destructive',
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
    <div className="sm:h-[32rem] w-full h-[26.5rem] overflow-hidden rounded-3xl border border-black/10">
      {products.length > 0 ? (
        <div className="sm:px-6 sm:py-5 h-full p-3 overflow-y-scroll">
          {products.map((p, idx) => (
            <Fragment key={p.id}>
              <div className="flex gap-4">
                <Link href={`/products/${p.productId}`}>
                  <Image
                    className="sm:size-[7.75rem] min-w-[6.25rem] size-[6.25rem] object-cover rounded-lg"
                    src={p.image}
                    alt={p.name}
                    width={1920}
                    height={2879}
                    priority
                  />
                </Link>
                <div className="grow flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 justify-between">
                      <h1
                        className="sm:text-xl grow w-40 text-base font-bold truncate"
                        title={p.name}
                      >
                        <Link className="" href={`/products/${p.productId}`}>
                          {p.name}
                        </Link>
                      </h1>
                      <button
                        type="button"
                        onClick={() => deleteFromCart(p.id)}
                      >
                        <Trash className="sm:size-6 size-4" />
                      </button>
                    </div>
                    <p className="sm:text-sm text-xs text-black">
                      Size:{' '}
                      <span className="inline-block text-black/60 first-letter:uppercase">
                        {p.size}
                      </span>
                    </p>
                    <p className="sm:text-sm text-xs text-black">
                      Color:{' '}
                      <span className="inline-block text-black/60 first-letter:uppercase">
                        {p.color}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <h2 className="sm:text-2xl text-xl font-bold">
                      ${p.price * p.amount}
                    </h2>
                    <AmountButton
                      amount={p.amount}
                      defaultValue={p.amount}
                      size="small"
                    />
                  </div>
                </div>
              </div>
              {idx !== products.length - 1 && (
                <span className="block w-full h-px my-6 bg-black/10" />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <h1 className="sm:text-2xl text-xl font-medium">
            You have no products in your cart 😢
          </h1>
          <Link
            className="sm:text-base sm:py-3 py-2 px-10 flex justify-center items-center gap-3 border border-black/15 text-black rounded-full text-sm font-medium transition-colors hover:text-white hover:bg-black"
            href="/products"
          >
            Go shopping
            <span className="text-2xl">🥳</span>
          </Link>
        </div>
      )}
    </div>
  )
}
