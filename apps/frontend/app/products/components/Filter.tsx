'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Arrow } from '@/components/svgs/Arrow'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { FilterContainer } from './FilterContainer'
import { Slider } from '@/components/ui/slider'
import { ColorsCheckbox } from '@/components/ui/colors-checkbox'
import {
  productsColors,
  productsDressStyle,
  productsSizes,
  productsType,
} from '@/data/filter'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ProductColorType, ProductSizeType } from '@/types/product-response'
import { SizesCheckbox } from '@/components/ui/sizes-checkbox'

const filterSchema = z.object({
  price: z.tuple([z.number(), z.number()]),
  colors: z.array(z.custom<ProductColorType>()),
  sizes: z.array(z.custom<ProductSizeType>()),
})

export const Filter = () => {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: { price: [50, 450], colors: [], sizes: [] },
  })

  function applyFilter(values: z.infer<typeof filterSchema>) {
    alert(JSON.stringify(values, null, 4))
  }

  return (
    <FilterContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(applyFilter)}>
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
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          className="mt-7 mb-8"
                          defaultValue={field.value}
                          onValueCommit={(value) => {
                            form.setValue('price', [value[0], value[1]])
                          }}
                          max={500}
                          step={5}
                          minStepsBetweenThumbs={20}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="colors"
                  render={() => (
                    <FormItem>
                      <div className="flex flex-wrap gap-4">
                        {productsColors.map((color) => (
                          <FormField
                            key={color.name}
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                              <FormItem key={color.name}>
                                <FormControl>
                                  <ColorsCheckbox
                                    hex={color.hex}
                                    arrowColor={color.arrow}
                                    checked={field.value?.includes(color.name)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        return field.onChange([
                                          ...field.value,
                                          color.name,
                                        ])
                                      } else {
                                        return field.onChange(
                                          field.value.filter(
                                            (value) => value !== color.name,
                                          ),
                                        )
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="sizes"
                  render={() => (
                    <FormItem>
                      <div className="flex justify-start flex-wrap gap-2">
                        {productsSizes.map((size) => (
                          <FormField
                            key={size.value}
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                              <SizesCheckbox
                                label={size.label}
                                checked={field.value?.includes(size.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    return field.onChange([
                                      ...field.value,
                                      size.value,
                                    ])
                                  } else {
                                    return field.onChange(
                                      field.value.filter(
                                        (value) => value !== size.value,
                                      ),
                                    )
                                  }
                                }}
                              />
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Dress Style</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-5">
                  {productsDressStyle.map((prod) => (
                    <Link
                      className="text-base text-black/60 hover:text-black flex justify-between items-center"
                      href={`?type=${prod.urlValue}`}
                      key={prod.type}
                    >
                      {prod.type} <Arrow />
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <button
            className="w-full p-4 rounded-full text-sm text-white font-medium text-center bg-black"
            type="submit"
          >
            Apply Filter
          </button>
        </form>
      </Form>
    </FilterContainer>
  )
}
