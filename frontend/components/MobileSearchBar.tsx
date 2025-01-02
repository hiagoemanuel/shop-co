'use client'

import { motion } from 'framer-motion'
import { Close } from './svgs/Close'
import { Search } from './svgs/Search'
import { useContext, useEffect, useRef } from 'react'
import { SearchBarContext } from '@/contexts/SearchBarContext'

export const MobileSearchBar = () => {
  const { setHandleSearchBar } = useContext(SearchBarContext)
  const searchBarRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', searchBarOutSideClick)
    return () =>
      document.removeEventListener('mousedown', searchBarOutSideClick)
  }, [])

  const searchBarOutSideClick = (event: MouseEvent) => {
    const searchBar = searchBarRef.current
    if (!searchBar?.contains(event.target as Node)) setHandleSearchBar(false)
  }

  return (
    <motion.label
      className="lg:hidden absolute z-40 top-3 left-[50%] -translate-x-1/2 w-[98.1%] bg-cyan rounded-full flex items-center cursor-pointer"
      htmlFor="search-bar"
      ref={searchBarRef}
      initial={{ opacity: 0, x: '-50%', originX: 'right' }}
      animate={{ opacity: 1, scaleX: [0.5, 1] }}
      exit={{ opacity: 0, x: '25%' }}
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
        autoFocus
      />
      <button
        className="py-3 pl-3 pr-4 opacity-40"
        type="button"
        aria-label="Close Search Bar"
        onClick={() => setHandleSearchBar(false)}
      >
        <Close />
      </button>
    </motion.label>
  )
}
