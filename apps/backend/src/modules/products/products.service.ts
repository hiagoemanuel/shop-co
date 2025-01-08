import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { toArray } from 'src/utils/to-array'
import { IFilterProducts } from 'types/filter-products'

@Injectable()
export class ProductsService {
  whereConditions: Prisma.ProductWhereInput | undefined = {}
  orderByConditions: Prisma.ProductOrderByWithAggregationInput | undefined = {}

  constructor(private prisma: PrismaService) {}

  async allProducts() {
    return this.prisma.product.findMany()
  }

  async filter(filter: IFilterProducts) {
    this.queryContructor(filter)

    try {
      const filteredProducts = await this.prisma.product.findMany({
        where: this.whereConditions,
        orderBy: this.orderByConditions,
      })

      this.whereConditions = undefined
      this.orderByConditions = undefined

      return filteredProducts
    } catch (err) {
      this.whereConditions = undefined
      this.orderByConditions = undefined

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  queryContructor(queries: IFilterProducts) {
    Object.keys(queries).forEach((query: keyof IFilterProducts) => {
      switch (query) {
        case 'search':
          this.whereConditions = {
            name: { contains: queries.search, mode: 'insensitive' },
            ...this.whereConditions,
          }
          break
        case 'type':
          this.whereConditions = {
            type: { in: toArray(queries.type) },
            ...this.whereConditions,
          }
          break
        case 'colors':
          this.whereConditions = {
            colors: { hasSome: toArray(queries.colors) },
            ...this.whereConditions,
          }
          break
        case 'style':
          this.whereConditions = {
            type: { in: toArray(queries.type) },
            ...this.whereConditions,
          }
          break
        case 'size':
          this.whereConditions = {
            sizes: { hasSome: toArray(queries.size) },
            ...this.whereConditions,
          }
          break
        case 'price': {
          const range = toArray(queries.price)
            .map((n) => Number(n))
            .sort((n1, n2) => n1 - n2)

          this.whereConditions = {
            price: { gte: range[0], lte: range[1] },
            ...this.whereConditions,
          }
          break
        }
      }

      const orderBy = ['name', 'price', 'AVGrating']
      const sort = queries.sort

      if (!sort) return (this.orderByConditions = undefined)

      if (orderBy.includes(sort.replace('-', ''))) {
        if (sort === 'name') {
          this.orderByConditions = { name: 'asc' }
        } else if (sort === '-name') {
          this.orderByConditions = { name: 'desc' }
        }
        if (sort === 'price') {
          this.orderByConditions = { price: 'asc' }
        } else if (sort === '-price') {
          this.orderByConditions = { price: 'desc' }
        }
        if (sort === 'AVGrating') {
          this.orderByConditions = { AVGrating: 'asc' }
        } else if (sort === '-AVGrating') {
          this.orderByConditions = { AVGrating: 'desc' }
        }
      }
    })
  }

  async products(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProductWhereUniqueInput
    where?: Prisma.ProductWhereInput
    orderBy?: Prisma.ProductOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }
}
