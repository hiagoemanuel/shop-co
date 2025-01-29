'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { MenuListContext } from '@/contexts/MenuListContext'

export const MenuList = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(MenuListContext)

  return (
    <AnimatePresence>
      {menuIsOpen && (
        <motion.section
          className="fixed top-0 left-0 z-50 min-w-full h-dvh flex sm:hidden justify-center items-center bg-cyan/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.menu
            className="w-full bg-white backdrop-blur-3xl p-4 shadow-sm shadow-black/60"
            initial={{ x: '-10vh' }}
            animate={{ x: 0 }}
            exit={{ x: '10vh' }}
            transition={{ type: 'keyframes' }}
          >
            <nav className="flex flex-col items-center gap-6 text-3xl">
              <Link
                className="hover:underline"
                href="/products"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                Shop
              </Link>
              <Link
                className="hover:underline"
                href="/products"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                On Sale
              </Link>
              <Link
                className="hover:underline"
                href="/products"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                New Arrivals
              </Link>
              <Link
                className="hover:underline"
                href="/products"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                Brands
              </Link>
              <button
                className="py-4 px-10 bg-black text-white rounded-full"
                type="button"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                Close
              </button>
            </nav>
          </motion.menu>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
