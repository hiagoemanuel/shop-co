import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const ColorsRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    hex: string
  }
>(({ className, hex, ...props }, ref) => {
  const arrowsBeBlack = ['yellow', 'cyan', 'white', 'beige']

  const arrowColor = (hex: string): 'white' | 'black' => {
    const arrowBlack = arrowsBeBlack.find((color) => hex === color)
    const result = arrowBlack ? 'black' : 'white'
    return result
  }

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'peer w-9 h-9 shrink-0 rounded-full border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
        className,
      )}
      style={{ backgroundColor: hex }}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Check className="h-4 w-4" color={arrowColor(hex)} strokeWidth={3} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
ColorsRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { ColorsRadioGroupItem }
