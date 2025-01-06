'use client'

import { Adjust } from '@/components/svgs/Adjust'
import { FilterContext } from '@/contexts/FilterContext'
import { useContext } from 'react'

export const FilterButton = () => {
  const { setIsOpen } = useContext(FilterContext)

  return (
    <button
      className="sm:hidden p-2 rounded-full bg-cyan"
      type="button"
      onClick={() => setIsOpen(true)}
    >
      <Adjust />
    </button>
  )
}
