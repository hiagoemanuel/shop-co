import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'
import { FilterService } from './filter.service'
import { Product } from '@prisma/client'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { MetaDataDto } from './dto/pagination.dto'

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  filter: ProductFilterTransformedDto

  private perPage: number = 3
  private url: string
  private skip: number
  private currentPage: number
  private totalPages: number
  private productCount: number

  constructor(
    private prisma: PrismaService,
    private filterService: FilterService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async productResponse(filter: ProductFilterTransformedDto) {
    this.url = `${this.req.protocol}://${this.req.headers.host}${this.req.url}`
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

  async products(params: { skip?: number; take?: number }) {
    const { skip, take } = params
    return this.prisma.product.findMany({ skip, take })
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
      first: this.createLink(1),
      last: this.createLink(this.totalPages),
      next: this.createLink(
        this.currentPage < this.totalPages ? this.currentPage + 1 : null,
      ),
      prev: this.createLink(this.currentPage > 1 ? this.currentPage - 1 : null),
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

      const links = Array.from({ length: this.totalPages }).map((_, idx) => {
        const page = idx + 1

        return {
          url: this.createLink(page),
          label: page.toString(),
          active: this.createLink(page) ? true : false,
        }
      })

      const prevPage = this.currentPage > 1 ? this.currentPage - 1 : null
      const nextPage =
        this.currentPage < this.totalPages ? this.currentPage + 1 : null

      return {
        path: this.url,
        currentPage: this.currentPage,
        perPage: this.perPage,
        total: this.productCount,
        lastPage: this.totalPages,
        from,
        to,
        links: [
          {
            url: this.createLink(prevPage),
            label: 'Previous',
            active: this.createLink(prevPage) ? true : false,
          },
          ...links,
          {
            url: this.createLink(nextPage),
            label: 'Next',
            active: this.createLink(nextPage) ? true : false,
          },
        ],
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  private createLink(pageNumber: number) {
    const url = new URL(this.url)

    if (pageNumber) {
      url.searchParams.set('page', pageNumber.toString())
      return url.href
    } else {
      return null
    }
  }
}
