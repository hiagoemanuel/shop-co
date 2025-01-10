import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'

@Injectable()
export class ProductsService {
  perPage: number = 9

  constructor(private prisma: PrismaService) {}

  async products(params: { skip?: number; take?: number }) {
    const { skip, take } = params
    return this.prisma.product.findMany({ skip, take })
  }

  async filter(filter: ProductFilterTransformedDto) {
    const perPage = this.perPage

    try {
      const filteredProducts = await this.prisma.product.findMany({
        where: this.whereConditions(filter),
        orderBy: this.orderByConditions(filter),
        take: perPage,
        skip: filter.page ? filter.page * perPage - perPage : 0,
      })

      return filteredProducts
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

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
      ...(price && { price: { gte: price[0], lte: price[1] } }),
    }
  }

  private orderByConditions({
    sort,
  }: ProductFilterTransformedDto): Prisma.ProductOrderByWithAggregationInput {
    return {
      ...(sort === 'name' && { name: 'asc' }),
      ...(sort === 'price' && { price: 'asc' }),
      ...(sort === 'AVGrating' && { AVGrating: 'asc' }),
      ...(sort === '-name' && { name: 'desc' }),
      ...(sort === '-price' && { price: 'desc' }),
      ...(sort === '-AVGrating' && { AVGrating: 'desc' }),
    }
  }
}
