'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

type AmounButtonProps = {
  amount: number
  initialValue?: number
  size?: 'small' | 'medium'
}

export const AmountButton = ({
  amount,
  initialValue,
  size = 'medium',
}: AmounButtonProps) => {
  const [amountCart, setAmountCart] = useState(initialValue || 1)

  const handlerAmountInput = (operator: '+' | '-') => {
    if (operator === '+') {
      if (amountCart < amount) setAmountCart(amountCart + 1)
    } else {
      if (amountCart > 1) setAmountCart(amountCart - 1)
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
        value={amountCart}
        onChange={(e) => {
          const value = Number(e.target.value)
          if (value > amountCart) handlerAmountInput('+')
          if (value < amountCart) handlerAmountInput('-')
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
