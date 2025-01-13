'use client'

import { useContext, type CSSProperties } from 'react'

import { FilterResponsiveProvider } from '@/contexts/FilterResponsiveContext'
import { FilterButton } from './components/FilterButton'
import { Filter } from './components/Filter'
import { ProductPagination } from './components/ProductPagination'
import { ProductCard } from '@/components/ProductCard'
import { FilterContext } from '@/contexts/FilterContext'

export default function Product() {
  const { productsData } = useContext(FilterContext)

  if (!productsData) return <h1>Loading</h1>

  const { data: products, meta: metaData } = productsData

  return (
    <FilterResponsiveProvider>
      <div className="lg:gap-5 flex gap-2">
        <Filter />
        <section className="w-full">
          <div className="sm:mb-4 mb-7 flex items-center justify-between">
            <div className="sm:justify-between sm:gap-0 w-full flex flex-wrap items-baseline gap-2">
              <h2 className="sm:text-3xl text-2xl font-bold">Products</h2>
              <h4 className="sm:text-base text-sm text-black/60">
                Showing {metaData.from}-{metaData.to} of {metaData.total}{' '}
                Products
              </h4>
            </div>
            <FilterButton />
          </div>
          {products.length > 0 ? (
            <>
              <div
                className="grid justify-evenly grid-cols-[repeat(auto-fill,var(--col-size))] md:![--col-size:18.75rem] gap-x-5 gap-y-9"
                style={{ '--col-size': '12rem' } as CSSProperties}
              >
                {products?.map((p) => <ProductCard {...p} key={p.id} />)}
              </div>
              <ProductPagination {...metaData} />
            </>
          ) : (
            <h1>Nothing was found</h1>
          )}
        </section>
      </div>
    </FilterResponsiveProvider>
  )
}
