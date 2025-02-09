'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SortProducts = ({ sort }: { sort?: string }) => {
  const pathname = usePathname()
  const params = useSearchParams()
  const { replace } = useRouter()

  const handlerSort = (value: string) => {
    const searchParams = new URLSearchParams(params)

    if (sort !== value) {
      searchParams.set('sort', value)

      if (value === '-AVGrating') searchParams.delete('sort')

      searchParams.delete('page')
      replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  return (
    <Select defaultValue={sort ?? '-AVGrating'} onValueChange={handlerSort}>
      <SelectTrigger className="sm:w-[7.05rem] w-[6.3rem]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="-AVGrating">Most Popular</SelectItem>
          <SelectItem value="AVGrating">Less Popular</SelectItem>
          <SelectItem value="-price">Highest Price</SelectItem>
          <SelectItem value="price">Lowest Price</SelectItem>
          <SelectItem value="name">Name (a-z)</SelectItem>
          <SelectItem value="-name">Name (z-a)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
