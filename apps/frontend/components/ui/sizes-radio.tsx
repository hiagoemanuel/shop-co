import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'

const SizeRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'peer h-10 py-2 text-sm font-medium text-black/60 px-5 bg-cyan data-[state="checked"]:text-white data-[state="checked"]:bg-black transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {label}
    </RadioGroupPrimitive.Item>
  )
})
SizeRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { SizeRadioGroupItem }
