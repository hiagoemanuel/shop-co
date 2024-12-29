'use client'

import { Adjust } from '@/components/svgs/Adjust'
import { Close } from '@/components/svgs/Close'
import { FilterContext } from '@/contexts/FilterContext'
import { useWidthSize } from '@/hooks/useWidthSize'
import { useContext } from 'react'

export const Filter = () => {
  const { isOpen, setIsOpen } = useContext(FilterContext)
  const widthSize = useWidthSize()
  const lgDevices = isOpen || widthSize <= 640

  return (
    (isOpen || widthSize >= 640) && (
      <div
        className={`${lgDevices ? 'sm:max-w-[18.438rem]' : 'sm:w-auto'} sm:static sm:bg-inherit sm:z-0 w-full h-dvh fixed top-0 left-0 z-50 bg-black/20`}
      >
        <aside
          className={`${lgDevices ? 'sm:p-5 sm:px-6' : 'sm:p-0'} sm:sticky sm:top-28 sm:border sm:rounded-3xl sm:w-auto sm:h-auto p-5 border-black/10 absolute bottom-0 w-full h-5/6 bg-white rounded-t-3xl`}
        >
          <div className="flex justify-between items-center">
            {lgDevices && <h3 className="text-xl font-bold">Filter</h3>}
            <button
              className="sm:hidden opacity-40 hover:opacity-100"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Close />
            </button>
            <button
              className={`${lgDevices ? '' : 'p-5'} sm:block sm:opacity-40 hidden focus-visible:opacity-100 hover:opacity-100`}
              type="button"
              aria-label="filter button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Adjust />
            </button>
          </div>
          {lgDevices && <div>content</div>}
        </aside>
      </div>
    )
  )
}
