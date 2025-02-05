import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section>
      <div className="lg:gap-5 lg:flex-row lg:justify-center lg:items-start flex flex-col gap-5 items-center">
        <div className="lg:w-auto sm:flex-row sm:gap-3 flex flex-col gap-3 w-full justify-center">
          <Skeleton className="sm:w-[27.75rem] sm:h-[33.125rem] h-[73.605dvw] w-full object-cover rounded-3xl" />
          <div className="sm:flex-col sm:-order-1 sm:gap-3 flex gap-3">
            <Skeleton className="sm:w-[9.5rem] sm:h-[10.438rem] w-full h-[27.18dvw] rounded-3xl" />
            <Skeleton className="sm:w-[9.5rem] sm:h-[10.438rem] w-full h-[27.18dvw] rounded-3xl" />
            <Skeleton className="sm:w-[9.5rem] sm:h-[10.438rem] w-full h-[27.18dvw] rounded-3xl" />
          </div>
        </div>
        <div className="max-w-[36.875rem] w-full">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-8" />
            <Skeleton className="sm:h-5 w-[8.625rem] h-[1.125rem]" />
            <Skeleton className="sm:w-56 sm:h-9 w-44 h-8" />
          </div>
          <div className="flex flex-col gap-px mt-5 mb-6 pb-5 border-b border-black/10">
            <Skeleton className="sm:h-6 w-full h-5" />
            <Skeleton className="sm:h-6 w-3/4 h-5" />
          </div>
          <div>
            <div className="mt-5 pb-6 border-b border-black/10">
              <Skeleton className="sm:h-6 w-20 h-5 mb-4" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
              </div>
            </div>
            <div className="mb-6 py-6 border-b border-black/10">
              <Skeleton className="sm:h-6 w-20 h-5 mb-4" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="w-20 h-10 rounded-full" />
                <Skeleton className="w-24 h-10 rounded-full" />
                <Skeleton className="w-20 h-10 rounded-full" />
                <Skeleton className="w-24 h-10 rounded-full" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="w-36 h-11 rounded-full" />
              <Skeleton className="w-full h-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
