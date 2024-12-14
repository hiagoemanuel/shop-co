'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { AnimatePresence } from 'framer-motion'

import { MenuListContext } from '@/contexts/MenuListContext'
import { SearchBarContext } from '@/contexts/SearchBarContext'
import { Account } from './svgs/Account'
import { Cart } from './svgs/Cart'
import { Menu } from './svgs/Menu'
import { Search } from './svgs/Search'
import { MenuList } from './MenuList'
import { MobileSearchBar } from './MobileSearchBar'

export const Header = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(MenuListContext)
  const { handleSearchBar, setHandleSearchBar } = useContext(SearchBarContext)

  return (
    <>
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm">
        <header className="lg:gap-10 lg:py-6 max-w-7xl mx-auto flex justify-between items-center px-4 py-5">
          <div className="flex gap-4 sm:gap-5 lg:gap-10">
            <button
              className="cursor-pointer sm:hidden"
              type="button"
              aria-label="Open Menu"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              <Menu />
            </button>
            <Link href="/">
              <h1 className="text-[1.563rem] sm:text-[2rem] font-integral-cf select-none">
                SHOP.CO
              </h1>
            </Link>
            <nav className="text-base text-nowrap hidden sm:flex items-center gap-6">
              <Link className="hover:underline" href="/products">
                Shop
              </Link>
              <Link className="hover:underline" href="/products">
                On Sale
              </Link>
              <Link className="hover:underline" href="/products">
                New Arrivals
              </Link>
              <Link className="hover:underline" href="/brands">
                Brands
              </Link>
            </nav>
          </div>
          <label
            className="hidden lg:flex w-full bg-cyan rounded-full items-center cursor-pointer"
            htmlFor="search-bar"
          >
            <button
              className="py-3 pr-3 pl-4 opacity-40"
              type="button"
              aria-label="Search Yours Products"
            >
              <Search />
            </button>
            <input
              className="grow h-full outline-none bg-transparent text-black/40 text-base"
              id="search-bar"
              type="text"
              placeholder="Search for Products..."
              autoComplete="off"
            />
          </label>
          <nav className="flex justify-end gap-3">
            <button
              className="lg:hidden"
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
        <AnimatePresence>
          {handleSearchBar && <MobileSearchBar />}
        </AnimatePresence>
      </div>
      <MenuList />
    </>
  )
}
