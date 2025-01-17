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
  filter: ProductFilterTransformedDto

  private perPage: number = 9
  private skip: number
  private currentPage: number
  private totalPages: number
  private productCount: number

  constructor(
    private prisma: PrismaService,
    private filterService: FilterService,
    private paginationService: PaginationService,
  ) {}

  async productResponse(filter: ProductFilterTransformedDto) {
    this.filter = filter
    this.skip = this.filter.page ? (this.filter.page - 1) * this.perPage : 0
    this.currentPage = filter.page && filter.page > 0 ? filter.page : 1
    this.productCount = await this.prisma.product.count({
      where: this.filterService.whereConditions(filter),
    })
    const totalPages = Math.ceil(this.productCount / this.perPage)
    this.totalPages = totalPages !== 0 ? totalPages : 1

    return {
      data: await this.data(),
      links: this.links(),
      meta: await this.meta(),
    }
  }

  products(params: {
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

  private async data(): Promise<Product[]> {
    try {
      const filteredProducts = await this.prisma.product.findMany({
        where: this.filterService.whereConditions(this.filter),
        orderBy: this.filterService.orderByConditions(this.filter),
        take: this.perPage,
        skip: this.skip,
      })
      return filteredProducts
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  private links() {
    return {
      first: this.paginationService.createLink(1),
      last: this.paginationService.createLink(this.totalPages),
      next: this.paginationService.createLink(
        this.currentPage < this.totalPages ? this.currentPage + 1 : null,
      ),
      prev: this.paginationService.createLink(
        this.currentPage > 1 ? this.currentPage - 1 : null,
      ),
    }
  }

  private async meta(): Promise<MetaDataDto> {
    try {
      const totalProduct = await this.prisma.product.findMany({
        where: this.filterService.whereConditions(this.filter),
        select: { id: true },
        take: this.perPage,
        skip: this.skip,
      })

      const from = Math.min(this.skip + 1, this.productCount)
      const to = Math.min(this.skip + totalProduct.length, this.productCount)

      return {
        path: this.paginationService.url,
        currentPage: this.currentPage,
        perPage: this.perPage,
        total: this.productCount,
        lastPage: this.totalPages,
        from,
        to,
        links: this.paginationService.bootstrap(
          this.currentPage,
          this.totalPages,
        ),
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }
}
