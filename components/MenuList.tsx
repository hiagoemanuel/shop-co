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
          className="absolute top-0 left-0 z-50 min-w-full h-dvh flex sm:hidden justify-center items-center bg-cyan/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.menu
            className="bg-white p-4 rounded-3xl"
            initial={{ y: '10vh' }}
            animate={{ y: 0 }}
            exit={{ y: '-10vh' }}
          >
            <nav className="flex flex-col items-center gap-6 text-3xl">
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
              <button
                className="w-full p-4 bg-black text-white rounded-full"
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
