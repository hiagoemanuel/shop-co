'use client'

import { createContext, useState } from 'react'

interface IMenuListContext {
  menuIsOpen: boolean
  setMenuIsOpen: (menuIsOpen: boolean) => void
}

export const MenuListContext = createContext({} as IMenuListContext)

export const MenuListProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <MenuListContext value={{ menuIsOpen, setMenuIsOpen }}>
      {children}
    </MenuListContext>
  )
}
