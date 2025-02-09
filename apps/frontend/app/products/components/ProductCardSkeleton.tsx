import { Skeleton } from '@/components/ui/skeleton'

export const ProductCardSkeleton = () => (
  <div className="md:w-[18.75rem] w-[10.75rem] md:gap-4 flex flex-col gap-2 transition-transform group">
    <Skeleton className="md:w-[18.75rem] md:h-[18.75rem] w-[10.75rem] h-[10.75rem] rounded-xl overflow-hidden" />
    <div className="md:gap-2 flex flex-col gap-1">
      <Skeleton className="w-fullmd:h-7 h-6" />
      <Skeleton className="w-1/2 md:h-5 h-4" />
      <Skeleton className="w-2/3 md:h-8 h-7" />
    </div>
  </div>
)
