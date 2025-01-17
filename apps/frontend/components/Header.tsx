'use client'

import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { MenuListContext } from '@/contexts/MenuListContext'
import { Account } from './svgs/Account'
import { Cart } from './svgs/Cart'
import { Menu } from './svgs/Menu'
import { Search } from './svgs/Search'
import { MenuList } from './MenuList'
import type { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useWidthSize } from '@/hooks/useWidthSize'
import { Close } from './svgs/Close'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

export const Header = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(MenuListContext)
  const { register, handleSubmit } = useForm<{ search: string }>()
  const { replace } = useRouter()
  const [handleSearchBar, setHandleSearchBar] = useState(false)
  const [session, setSession] = useState<Session>()
  const params = useSearchParams()
  const width = useWidthSize()
  const searchBarRef = useRef<HTMLLabelElement>(null)
  const searchVariants = {
    initial: width < 1024 ? { opacity: 0, x: '-50%', originX: 'right' } : {},
    animate: width < 1024 ? { opacity: 1, scaleX: [0.5, 1] } : { x: 0 },
    exit: width < 1024 ? { opacity: 0, x: '25%' } : {},
  }

  useEffect(() => {
    const fetch = async () => {
      const data = await getSession()
      if (data) setSession(data)
    }
    fetch()
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', searchBarOutSideClick)
    return () =>
      document.removeEventListener('mousedown', searchBarOutSideClick)
  }, [])

  const searchBarOutSideClick = (event: MouseEvent) => {
    const searchBar = searchBarRef.current
    if (!searchBar?.contains(event.target as Node)) setHandleSearchBar(false)
  }

  const handlerSearch: SubmitHandler<{ search: string }> = ({ search }) => {
    const searchParams = new URLSearchParams(params)

    if (search) {
      searchParams.set('search', search)
      searchParams.delete('page')
    } else {
      searchParams.delete('search')
    }
    replace(`/products?${searchParams.toString()}`)
  }

  return (
    <>
      <div className="sticky z-40 top-0 bg-white/80 backdrop-blur-sm">
        <header className="lg:gap-10 lg:py-6 relative max-w-[1440px] mx-auto flex justify-between items-center px-4 py-5">
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
              <Link className="hover:underline" href="/products">
                Brands
              </Link>
            </nav>
          </div>
          <AnimatePresence>
            {(handleSearchBar || width >= 1024) && (
              <form className="w-full" onSubmit={handleSubmit(handlerSearch)}>
                <motion.label
                  className="flex bg-cyan rounded-full items-center cursor-pointer absolute lg:static z-40 lg:z-0 top-3 left-[50%] -translate-x-1/2 w-[98.1%] lg:translate-x-0 lg:w-full"
                  htmlFor="search-bar"
                  ref={searchBarRef}
                  variants={searchVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
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
                    autoFocus={width < 1024}
                    {...register('search')}
                  />
                  <button
                    className="lg:hidden py-3 pl-3 pr-4 opacity-40"
                    type="button"
                    aria-label="Close Search Bar"
                    onClick={() => setHandleSearchBar(false)}
                  >
                    <Close />
                  </button>
                </motion.label>
              </form>
            )}
          </AnimatePresence>
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
      </div>
      <MenuList />
    </>
  )
}
