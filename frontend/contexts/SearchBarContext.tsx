'use client'

import { createContext, useState } from 'react'

interface ISearchBarContext {
  handleSearchBar: boolean
  setHandleSearchBar: (handleSearchBar: boolean) => void
}

export const SearchBarContext = createContext({} as ISearchBarContext)

export const SearchBarProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [handleSearchBar, setHandleSearchBar] = useState<boolean>(false)

  return (
    <SearchBarContext value={{ handleSearchBar, setHandleSearchBar }}>
      {children}
    </SearchBarContext>
  )
}
