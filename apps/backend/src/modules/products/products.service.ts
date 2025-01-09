import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async allProducts() {
    return this.prisma.product.findMany()
  }

  async filter(filter: ProductFilterTransformedDto) {
    try {
      const filteredProducts = await this.prisma.product.findMany({
        where: this.whereConditions(filter),
        orderBy: this.orderByConditions(filter),
      })

      return filteredProducts
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  whereConditions(
    filter: ProductFilterTransformedDto,
  ): Prisma.ProductWhereInput {
    return {
      ...(filter.search && {
        name: { contains: filter.search, mode: 'insensitive' },
      }),
      ...(filter.type &&
        filter.type.length > 0 && { type: { in: filter.type } }),
      ...(filter.colors &&
        filter.colors.length > 0 && { colors: { hasSome: filter.colors } }),
      ...(filter.style && { dressStyle: { equals: filter.style } }),
      ...(filter.size &&
        filter.size.length > 0 && { sizes: { hasSome: filter.size } }),
      ...(filter.price &&
        filter.price.length === 2 && {
          price: { gte: filter.price[0], lte: filter.price[1] },
        }),
    }
  }

  orderByConditions({
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

  async products(params: { skip?: number; take?: number }) {
    const { skip, take } = params
    return this.prisma.product.findMany({ skip, take })
  }
}
