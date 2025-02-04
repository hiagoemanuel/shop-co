import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-black/15',
        className,
      )}
      {...props}
    >
      <span className="absolute block animate-wave transition-transform w-full h-full bg-gradient-to-r to-trasparent via-cyan from-transparent" />
    </div>
  )
}

export { Skeleton }
