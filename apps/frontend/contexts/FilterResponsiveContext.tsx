'use client'

import { createContext, useState } from 'react'

interface IFilterResponsiveContext {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const FilterResponsiveContext = createContext(
  {} as IFilterResponsiveContext,
)

export const FilterResponsiveProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FilterResponsiveContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </FilterResponsiveContext.Provider>
  )
}
