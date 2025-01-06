import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async allProducts() {
    return this.prisma.product.findMany()
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
