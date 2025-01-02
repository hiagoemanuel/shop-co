import type { CSSProperties } from 'react'

import { prisma } from '@/lib/prisma'
import { FilterProvider } from '@/contexts/FilterContext'
import { FilterButton } from './components/FilterButton'
import { Filter } from './components/Filter'
import { ProductCard } from '@/components/ProductCard'
import { ProductPagination } from './components/ProductPagination'

export default async function Product() {
  const products = await prisma.product.findMany()

  return (
    <FilterProvider>
      <div className="lg:gap-5 flex gap-2">
        <Filter />
        <section className="w-full">
          <div className="sm:mb-4 mb-7 flex items-center justify-between">
            <div className="sm:justify-between sm:gap-0 w-full flex flex-wrap items-baseline gap-2">
              <h2 className="sm:text-3xl text-2xl font-bold">Products</h2>
              <h4 className="sm:text-base text-sm text-black/60">
                Showing 1-10 of 100 Products
              </h4>
            </div>
            <FilterButton />
          </div>
          <div
            className="grid justify-evenly grid-cols-[repeat(auto-fill,var(--col-size))] md:![--col-size:18.75rem] gap-x-5 gap-y-9"
            style={{ '--col-size': '12rem' } as CSSProperties}
          >
            {products.map((p) => (
              <ProductCard {...p} key={p.id} />
            ))}
          </div>
          <ProductPagination />
        </section>
      </div>
    </FilterProvider>
  )
}
