'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [[min, max], setValues] = React.useState(props.defaultValue ?? [0, 0])

  return (
    <SliderPrimitive.Root
      onValueChange={(value) => setValues(value as [number, number])}
      ref={ref}
      className={cn(
        'relative flex w-[calc(100%-0.75rem)] touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-cyan">
        <SliderPrimitive.Range className="absolute h-full bg-black" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full bg-black cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4">
        <p className="absolute left-[50%] -translate-x-[50%] -bottom-8 text-sm font-medium">
          ${min}
        </p>
      </SliderPrimitive.Thumb>
      <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full bg-black cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4">
        <p className="absolute left-[50%] -translate-x-[50%] -bottom-8 text-sm font-medium">
          {`$${max}${max === 500 ? '+' : ''}`}
        </p>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
