'use client'

import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { MenuListContext } from '@/contexts/MenuListContext'
import { SearchBarContext } from '@/contexts/SearchBarContext'
import { Account } from './svgs/Account'
import { Cart } from './svgs/Cart'
import { Menu } from './svgs/Menu'
import { Search } from './svgs/Search'
import { MenuList } from './MenuList'
import { MobileSearchBar } from './MobileSearchBar'
import type { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

export const Header = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(MenuListContext)
  const { handleSearchBar, setHandleSearchBar } = useContext(SearchBarContext)
  const [session, setSession] = useState<Session>()

  useEffect(() => {
    const fetch = async () => {
      const data = await getSession()
      if (data) setSession(data)
    }
    fetch()
  }, [])

  return (
    <>
      <div className="sticky z-40 top-0 bg-white/80 backdrop-blur-sm">
        <header className="lg:gap-10 lg:py-6 relative max-w-7xl mx-auto flex justify-between items-center px-4 py-5">
          <span className="xl:w-full w-11/12 h-[1px] absolute bottom-0 left-[50%] -translate-x-[50%] bg-black/10 block" />
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
            <Link href="/dashboard">
              {session ? (
                <Image
                  className="min-w-[1.266rem] min-h-[1.266rem] m-[0.117rem] rounded-full border-2 border-black"
                  src={session.user?.image ?? ''}
                  width={20}
                  height={20}
                  alt="profile picture"
                />
              ) : (
                <Account />
              )}
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
