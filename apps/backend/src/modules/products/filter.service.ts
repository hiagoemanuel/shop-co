import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'

@Injectable()
export class FilterService {
  whereConditions({
    search,
    type,
    colors,
    style,
    size,
    price,
  }: ProductFilterTransformedDto): Prisma.ProductWhereInput {
    return {
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
      ...(type && { type: { in: type } }),
      ...(colors && { colors: { hasSome: colors } }),
      ...(style && { dressStyle: { equals: style } }),
      ...(size && { sizes: { hasSome: size } }),
      ...(price && {
        definedPrice: {
          gte: price[0],
          lte: price[1] !== 500 ? price[1] : undefined,
        },
      }),
    }
  }

  orderByConditions({
    sort,
  }: ProductFilterTransformedDto): Prisma.ProductOrderByWithAggregationInput {
    if (!sort) return { AvgRating: 'desc' }

    return {
      ...(sort === 'name' && { name: 'asc' }),
      ...(sort === 'price' && { definedPrice: 'asc' }),
      ...(sort === 'AVGrating' && { AVGrating: 'asc' }),
      ...(sort === '-name' && { name: 'desc' }),
      ...(sort === '-price' && { definedPrice: 'desc' }),
      ...(sort === '-AVGrating' && { AVGrating: 'desc' }),
    }
  }
}
