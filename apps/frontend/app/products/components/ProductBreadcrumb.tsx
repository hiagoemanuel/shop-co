'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Breadcrumb {
  label: string
  url: string
}

export const ProductBreadcrumb = () => {
  const pathname = usePathname()
  const params = useSearchParams()

  const styleParam = params.get('style')

  const breadcrumb: Breadcrumb[] = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: styleParam
        ? styleParam.charAt(0).toUpperCase() + styleParam.slice(1)
        : 'All Products',
      url: styleParam ? `${pathname}?style=${styleParam}` : '/products',
    },
  ]

  return (
    <div className="md:gap-3 md:mb-6 mb-3 flex gap-2">
      {breadcrumb.map((path, idx) => (
        <div className="flex gap-1 items-center" key={path.url}>
          <Link
            className={`${idx === breadcrumb.length - 1 ? 'text-black' : 'text-black/60'} md:text-base text-sm  cursor-pointer hover:text-black`}
            href={path.url}
          >
            {path.label}
          </Link>
          {idx !== breadcrumb.length - 1 && (
            <ChevronRight width="1rem" opacity="60%" />
          )}
        </div>
      ))}
    </div>
  )
}
