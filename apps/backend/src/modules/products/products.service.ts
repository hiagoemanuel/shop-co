import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'
import { FilterService } from './filter.service'
import { Prisma, Product } from '@prisma/client'
import { MetaDataDto } from './dto/pagination.dto'
import { PaginationService } from './pagination.service'

@Injectable()
export class ProductsService {
  private perPage: number = 9

  constructor(
    private prisma: PrismaService,
    private filterService: FilterService,
    private paginationService: PaginationService,
  ) {}

  findSpecific(params: {
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

  async findAll(
    filter: ProductFilterTransformedDto = {},
    perPage: number,
    skip: number,
  ): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        where: this.filterService.whereConditions(filter),
        orderBy: this.filterService.orderByConditions(filter),
        take: perPage,
        skip,
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  links(totalPages: number, currentPage: number) {
    return {
      first: this.paginationService.createLink(1),
      last: this.paginationService.createLink(totalPages),
      next: this.paginationService.createLink(
        currentPage < totalPages ? currentPage + 1 : null,
      ),
      prev: this.paginationService.createLink(
        currentPage > 1 ? currentPage - 1 : null,
      ),
    }
  }

  async meta(filter: ProductFilterTransformedDto = {}): Promise<MetaDataDto> {
    try {
      const skip = filter.page ? (filter.page - 1) * this.perPage : 0
      const currentPage = filter.page && filter.page > 0 ? filter.page : 1
      const totalProducts = await this.count(filter)
      const totalPages = Math.ceil(totalProducts / this.perPage) || 1

      const splicedProducts = await this.count(filter, this.perPage, skip)
      const from = Math.min(skip + 1, totalProducts)
      const to = Math.min(skip + splicedProducts, totalProducts)

      return {
        path: this.paginationService.url,
        currentPage,
        total: totalProducts,
        perPage: this.perPage,
        lastPage: totalPages,
        from,
        to,
        links: this.paginationService.bootstrap(currentPage, totalPages),
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async count(
    filter: ProductFilterTransformedDto,
    take?: number,
    skip?: number,
  ) {
    return await this.prisma.product.count({
      where: this.filterService.whereConditions(filter),
      take,
      skip,
    })
  }
}
