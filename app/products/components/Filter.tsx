import Link from 'next/link'

import { Arrow } from '@/components/svgs/Arrow'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { FilterContainer } from './FilterContainer'

export const Filter = () => {
  const productsType = [
    { type: 'T-shirts', urlValue: 't_shirt' },
    { type: 'Shorts', urlValue: 'short' },
    { type: 'Shirts', urlValue: 'shirt' },
    { type: 'Hoodies', urlValue: 'hoodie' },
    { type: 'Jeans', urlValue: 'jeans' },
  ]

  return (
    <FilterContainer>
      <div>
        <div className="pt-5 flex flex-col gap-5">
          {productsType.map((prod) => (
            <Link
              className="text-base text-black/60 hover:text-black flex justify-between items-center"
              href={`?type=${prod.urlValue}`}
              key={prod.type}
            >
              {prod.type} <Arrow />
            </Link>
          ))}
        </div>
        <Accordion className="mt-6" type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Dress Style</AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </FilterContainer>
  )
}
