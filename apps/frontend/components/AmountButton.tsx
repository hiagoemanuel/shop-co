'use client'

import { Minus, Plus } from 'lucide-react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

type AmounButtonProps = {
  amount: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  size?: 'small' | 'medium'
}

export const AmountButton = ({
  amount,
  defaultValue,
  onValueChange,
  size = 'medium',
}: AmounButtonProps) => {
  const [value = 1, setValue] = useControllableState<number>({
    defaultProp: defaultValue || 1,
    onChange: onValueChange,
  })

  const handlerAmountInput = (operator: '+' | '-') => {
    if (operator === '+') {
      if (value < amount) setValue(value + 1)
    } else {
      if (value > 1) setValue(value - 1)
    }
  }

  return (
    <div className="bg-cyan rounded-full overflow-hidden flex">
      <button
        className={`${size === 'small' ? 'sm:py-3 sm:px-5 py-2 px-3' : 'py-3 px-4'}`}
        type="button"
        onClick={() => handlerAmountInput('-')}
      >
        <Minus
          className={`${size === 'small' ? 'sm:size-5 size-4' : 'size-5'}`}
        />
      </button>
      <input
        className="reset-numeric-input text-center"
        type="number"
        value={value}
        onChange={(e) => {
          const inputValue = Number(e.target.value)
          if (inputValue > value) handlerAmountInput('+')
          if (inputValue < value) handlerAmountInput('-')
        }}
        min={1}
        max={amount}
      />
      <button
        className={`${size === 'small' ? 'sm:py-3 sm:px-5 py-2 px-3' : 'py-3 px-4'}`}
        type="button"
        onClick={() => handlerAmountInput('+')}
      >
        <Plus
          className={`${size === 'small' ? 'sm:size-5 size-4' : 'size-5'}`}
        />
      </button>
    </div>
  )
}
