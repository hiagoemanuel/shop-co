import { Skeleton } from '@/components/ui/skeleton'
import { CSSProperties } from 'react'

export default function Loading() {
  return (
    <section className="w-full">
      <div
        className="sm:gap-x-5 grid justify-evenly grid-cols-[repeat(auto-fill,var(--col-size))] md:![--col-size:18.75rem] gap-x-2 gap-y-9"
        style={{ '--col-size': '10.75rem' } as CSSProperties}
      >
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            className="md:w-[18.75rem] w-[10.75rem] md:gap-4 flex flex-col gap-2 transition-transform group"
            key={idx}
          >
            <Skeleton className="md:w-[18.75rem] md:h-[18.75rem] w-[10.75rem] h-[10.75rem] rounded-xl overflow-hidden" />
            <div className="md:gap-2 flex flex-col gap-1">
              <Skeleton className="w-fullmd:h-7 h-6" />
              <Skeleton className="w-1/2 md:h-5 h-4" />
              <Skeleton className="w-2/3 md:h-8 h-7" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
