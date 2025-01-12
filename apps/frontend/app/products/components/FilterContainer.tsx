'use client'

import { useContext } from 'react'
import { motion } from 'framer-motion'

import { Adjust } from '@/components/svgs/Adjust'
import { Close } from '@/components/svgs/Close'
import { FilterResponsiveContext } from '@/contexts/FilterResponsiveContext'
import { useWidthSize } from '@/hooks/useWidthSize'

export const FilterContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isOpen, setIsOpen } = useContext(FilterResponsiveContext)
  const widthSize = useWidthSize()
  const lgDevices = isOpen || widthSize < 640

  return (
    (isOpen || widthSize >= 640) && (
      <motion.div
        className={`${lgDevices ? 'sm:min-w-[18.438rem] sm:max-w-[18.438rem]' : 'sm:w-auto'} sm:static sm:bg-inherit sm:h-auto sm:z-0 w-full h-dvh fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-sm`}
        initial={{ opacity: lgDevices ? 0 : 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.aside
          className={`${lgDevices ? 'sm:p-5 sm:pt-0 sm:px-6' : 'sm:p-0'} sm:static sm:overflow-y-auto sm:border sm:rounded-3xl sm:w-auto sm:h-auto p-5 pt-0 overflow-y-scroll border-black/10 absolute bottom-0 w-full h-5/6 bg-white rounded-t-3xl`}
          initial={{ y: lgDevices ? '100vh' : 0 }}
          animate={{ y: 0 }}
          transition={{ type: 'keyframes' }}
        >
          <div
            className={`${lgDevices && 'pt-5 pb-4'} z-10 sticky top-0 bg-white border-b border-black/10 flex justify-between items-center`}
          >
            {lgDevices && <h3 className="text-xl font-bold">Filters</h3>}
            <button
              className="sm:hidden opacity-40 focus-visible:opacity-100 hover:opacity-100"
              type="button"
              aria-label="close filter"
              onClick={() => setIsOpen(false)}
            >
              <Close />
            </button>
            <button
              className={`${!lgDevices && 'p-5'} sm:block sm:opacity-40 hidden focus-visible:opacity-100 hover:opacity-100`}
              type="button"
              aria-label="filter button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Adjust />
            </button>
          </div>
          {lgDevices && children}
        </motion.aside>
      </motion.div>
    )
  )
}
