import { AmountButton } from '@/components/AmountButton'
import { Trash } from '@/components/svgs/Trash'
import { ICartProducts } from '@/data/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

export const CartProdcuts = ({ products }: { products: ICartProducts[] }) => {
  return (
    <div className="sm:max-h-[31rem] w-full max-h-[26.5rem] overflow-y-scroll scrollbar-hide p-3 rounded-3xl border border-black/10">
      {products.map((p, idx) => (
        <Fragment key={idx}>
          <div className="flex gap-4">
            <Link href={`/products/${p.id}`}>
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
                    <Link className="" href={`/products/${p.id}`}>
                      {p.name}
                    </Link>
                  </h1>
                  <button type="button">
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
                  initialValue={p.amount}
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
  )
}
