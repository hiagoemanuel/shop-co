'use client'

import { FilterType } from '@/app/products/components/Filter'
import api from '@/lib/axios'
import { ProductResponse } from '@/types/product-response'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'
interface IFilterContext {
  productsData: ProductResponse | undefined
  setFilter: (filters: FilterType) => void
}

export const FilterContext = createContext({} as IFilterContext)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsData, setProductsData] = useState<
    ProductResponse | undefined
  >()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = new URLSearchParams()

  const nextParams = useSearchParams()
  const [url, setUrl] = useState(`${pathname}?${nextParams.toString()}`)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get<ProductResponse>(url)
      setProductsData(data)
    }
    fetch()
  }, [url])

  const setFilter = (filter: FilterType) => {
    const queries: (keyof FilterType)[] = ['price', 'colors', 'size']

    queries.forEach((query) => {
      const price = filter['price']
      const value = filter[query].toString().replaceAll(',', '_')

      if (value) searchParams.set(query, value)
      if (price[0] === 0 && price[1] === 500) searchParams.delete('price')
    })

    setUrl(`${pathname}?${searchParams.toString()}`)
    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <FilterContext.Provider value={{ productsData, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
