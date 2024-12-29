import { FilterProvider } from '@/contexts/FilterContext'
import { FilterButton } from './components/FilterButton'
import { Filter } from './components/Filter'

export default async function Product() {
  return (
    <div className="flex gap-5">
      <FilterProvider>
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
          prod list
        </section>
      </FilterProvider>
    </div>
  )
}
