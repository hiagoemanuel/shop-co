'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SyntheticEvent } from 'react'
import { z } from 'zod'

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
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ProductColorType, ProductSizeType } from '@/types/product-response'
import { SizesCheckbox } from '@/components/ui/sizes-checkbox'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { CheckCircle2Icon } from 'lucide-react'

const filterSchema = z.object({
  price: z.tuple([z.number(), z.number()]).default([0, 500]),
  colors: z.array(z.custom<ProductColorType>()).default([]),
  size: z.array(z.custom<ProductSizeType>()).default([]),
  type: z.array(z.string()).default([]),
})
export type FilterType = z.infer<typeof filterSchema>

export const Filter = () => {
  const params = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const filterValue = (): FilterType => {
    const { price, colors, size, type } = filterSchema.parse({
      price: params
        ?.get('price')
        ?.split('_')
        .map((p) => Number(p)),
      colors: params?.get('colors')?.split('_'),
      size: params?.get('sizes')?.split('_'),
      type: params.get('type')?.split('_'),
    })

    return { price, colors, size, type }
  }

  const form = useForm<FilterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: filterValue(),
  })

  const applyFilter: SubmitHandler<FilterType> = (filter) => {
    const queries: (keyof FilterType)[] = ['price', 'colors', 'size']
    const searchParams = new URLSearchParams(params)

    queries.forEach((query, idx) => {
      const value = filter[query].toString().replaceAll(',', '_')

      if (value) {
        if (value === '0_500') return searchParams.delete('price')
        searchParams.set(queries[idx], value)
      } else {
        searchParams.delete(queries[idx])
      }
    })

    searchParams.delete('page')
    replace(`${pathname}?${searchParams.toString()}`)
  }

  const handlerTypeFilter = (e: SyntheticEvent<HTMLButtonElement>) => {
    const searchParams = new URLSearchParams(params)
    const currentTypes = searchParams.get('type')?.split('_')
    const newType = e.currentTarget.id

    if (currentTypes?.includes(newType)) {
      const updatedTypes = currentTypes.filter((t) => t !== newType)
      if (updatedTypes.length === 0) {
        searchParams.delete('type')
      } else {
        searchParams.set('type', updatedTypes.toString().replaceAll(',', '_'))
      }
    } else if (currentTypes) {
      const updatedTypes = [...currentTypes, newType]
      searchParams.set('type', updatedTypes?.toString().replaceAll(',', '_'))
    } else {
      searchParams.set('type', newType)
    }

    const filterState = searchParams.get('type')?.split('_')
    form.setValue('type', filterState ?? [])

    searchParams.delete('page')
    replace(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <FilterContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(applyFilter)}>
          <div className="pt-5 flex flex-col gap-5">
            {productsType.map((prod) => (
              <button
                className={`${form.getValues('type').includes(prod.urlValue) ? 'font-bold text-black' : 'text-black/60'} text-base hover:text-black flex justify-between items-center`}
                onClick={handlerTypeFilter}
                type="button"
                id={prod.urlValue}
                key={prod.type}
                {...form.register('type')}
              >
                {prod.type}{' '}
                {form.getValues('type').includes(prod.urlValue) ? (
                  <CheckCircle2Icon fill="black" stroke="white" />
                ) : (
                  <Arrow />
                )}{' '}
              </button>
            ))}
          </div>
          <Accordion className="mt-6" type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="price"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          className="mt-7 mb-8"
                          defaultValue={form.getValues('price')}
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
                  name="size"
                  render={() => (
                    <FormItem>
                      <div className="flex justify-start flex-wrap gap-2">
                        {productsSizes.map((size) => (
                          <FormField
                            key={size.value}
                            control={form.control}
                            name="size"
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
                    <a
                      className="text-base text-black/60 hover:text-black flex justify-between items-center"
                      href={`${prod.urlValue}`}
                      key={prod.type}
                    >
                      {prod.type} <Arrow />
                    </a>
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
