'use client'

import { createContext, useState } from 'react'

interface filterContext {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const FilterContext = createContext({} as filterContext)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FilterContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </FilterContext.Provider>
  )
}
