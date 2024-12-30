import Link from 'next/link'

import { Arrow } from '@/components/svgs/Arrow'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { FilterContainer } from './FilterContainer'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

interface IProductsColors {
  name: string
  hex: string
  arrow?: 'black' | 'white'
}

export const Filter = () => {
  const productsType = [
    { type: 'T-shirts', urlValue: 't_shirt' },
    { type: 'Shorts', urlValue: 'short' },
    { type: 'Shirts', urlValue: 'shirt' },
    { type: 'Hoodies', urlValue: 'hoodie' },
    { type: 'Jeans', urlValue: 'jeans' },
  ]

  const productsColors: IProductsColors[] = [
    { name: 'beige', hex: 'bg-[#D9B99B]', arrow: 'black' },
    { name: 'black', hex: 'bg-[#000000]' },
    { name: 'blue', hex: 'bg-[#0000FF]' },
    { name: 'brown', hex: 'bg-[#964B00]' },
    { name: 'cyan', hex: 'bg-[#00FFFF]', arrow: 'black' },
    { name: 'grey', hex: 'bg-[#808080]' },
    { name: 'green', hex: 'bg-[#008000]' },
    { name: 'orange', hex: 'bg-[#ffa500]' },
    { name: 'purple', hex: 'bg-[#800080]' },
    { name: 'red', hex: 'bg-[#FF0000]' },
    { name: 'white', hex: 'bg-[#FFFFFF]', arrow: 'black' },
    { name: 'yellow', hex: 'bg-[#FFFF00]', arrow: 'black' },
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
            <AccordionContent>
              <Slider
                className="mt-7 mb-8"
                defaultValue={[50, 450]}
                max={500}
                step={5}
                minStepsBetweenThumbs={20}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-4">
                {productsColors.map((color) => (
                  <Checkbox
                    className={color.hex}
                    arrowColor={color.arrow}
                    key={color.name}
                  />
                ))}
              </div>
            </AccordionContent>
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
