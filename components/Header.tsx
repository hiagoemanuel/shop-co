'use client'

import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { MenuListContext } from '@/contexts/MenuListContext'
import { Account } from './svgs/Account'
import { Cart } from './svgs/Cart'
import { Menu } from './svgs/Menu'
import { Search } from './svgs/Search'
import { MenuList } from './MenuList'
import { Close } from './svgs/Close'

export const Header = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(MenuListContext)
  const [handleSearchBar, setHandleSearchBar] = useState(false)
  const searchBarRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', (e) => searchBarOutSideClick(e))
  }, [])

  const searchBarOutSideClick = (event: MouseEvent) => {
    const searchBar = searchBarRef.current
    if (!searchBar?.contains(event.target as Node)) setHandleSearchBar(false)
  }

  return (
    <>
      <header className="flex justify-between items-center px-4 py-5">
        <div className="flex gap-4">
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <Menu />
          </button>
          <Link href="/">
            <h1 className="font-[1.563rem] font-integral-cf select-none">
              SHOP.CO
            </h1>
          </Link>
        </div>
        <nav className="flex justify-end w-full max-w-[685px] gap-3">
          <AnimatePresence>
            {handleSearchBar && (
              <motion.label
                className="absolute z-40 top-3 left-[50%] -translate-x-1/2 w-[95%] bg-cyan rounded-full flex items-center cursor-pointer"
                htmlFor="search-bar"
                ref={searchBarRef}
                initial={{ opacity: 0, x: '-50%', originX: 'right' }}
                animate={{ opacity: 1, scaleX: [0.5, 1] }}
                exit={{ opacity: 0, x: '25%' }}
                transition={{ duration: 0.25 }}
              >
                <button className="py-3 pr-3 pl-4 opacity-40" type="button">
                  <Search />
                </button>
                <input
                  className="grow h-full outline-none bg-transparent text-black/40 text-base"
                  id="search-bar"
                  type="text"
                  placeholder="Search for Products..."
                  autoFocus
                />
                <button
                  className="py-3 pl-3 pr-4 opacity-40"
                  type="button"
                  onClick={() => setHandleSearchBar(false)}
                >
                  <Close />
                </button>
              </motion.label>
            )}
          </AnimatePresence>
          <button
            type="button"
            aria-label="Open Search Bar"
            onClick={() => setHandleSearchBar(true)}
          >
            <Search />
          </button>
          <Link href="/cart">
            <Cart />
          </Link>
          <Link href="/account">
            <Account />
          </Link>
        </nav>
      </header>
      <MenuList />
    </>
  )
}
