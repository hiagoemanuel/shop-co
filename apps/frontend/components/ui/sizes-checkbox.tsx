'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'
const SizesCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string
  }
>(({ className, label, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-10 py-2 text-sm font-medium text-black/60 px-5 bg-cyan data-[state="checked"]:text-white data-[state="checked"]:bg-black transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    {label}
  </CheckboxPrimitive.Root>
))

SizesCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { SizesCheckbox }
