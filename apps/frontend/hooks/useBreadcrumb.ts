'use client'

import api from '@/lib/axios'
import { IProduct } from '@/types/product-response'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Breadcrumb {
  label: string
  url: string
}

export const useBreadcrumb = (): Breadcrumb[] => {
  const breadcrumb: Breadcrumb[] = []
  const [product, setProduct] = useState<IProduct>()
  const params = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const fetch = async () => {
      const productId = pathname.replace('/products', '').replace('/', '')
      if (productId) {
        const { data } = await api.get<IProduct>(`/products/${productId}`)
        setProduct(data)
      }
    }
    fetch()
  }, [pathname])

  breadcrumb.push({ label: 'Home', url: '/' })
  breadcrumb.push({ label: 'Products', url: '/products' })

  const styleParam = params.get('style')

  if (styleParam) {
    breadcrumb.push({
      label: formatString(styleParam),
      url: `/products/?style=${styleParam}`,
    })
  } else if (product && pathname !== '/products') {
    breadcrumb.push({
      label: formatString(product.dressStyle),
      url: `/products/?style=${product.dressStyle}`,
    })
    breadcrumb.push({
      label: formatString(product.type).replace('Tshirt', 'T-shirt'),
      url: `/products/?type=${product.type}`,
    })
  }

  return breadcrumb
}

const formatString = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase()
}
