import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common'
import { MetaDataDto, PaginationLinksDto } from './dto/pagination.dto'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { PrismaService } from 'src/services/prisma.service'
import { ProductsService } from './products.service'
import { ProductFilterTransformedDto } from './dto/product-filter.dto'

@Injectable({ scope: Scope.REQUEST })
export class PaginationService {
  private readonly url: string

  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private prismaService: PrismaService,
    private productService: ProductsService,
  ) {
    this.url = `${req.protocol}://${req.headers.host}${req.url}`
  }

  async links(
    filter: ProductFilterTransformedDto,
  ): Promise<PaginationLinksDto> {
    try {
      const productCount = await this.prismaService.product.count({
        where: this.productService.whereConditions(filter),
      })
      const totalPages = Math.ceil(productCount / this.productService.perPage)
      const currentPage = filter.page && filter.page > 0 ? filter.page : 1

      return {
        first: this.createLink(1),
        last: this.createLink(totalPages),
        next: this.createLink(
          currentPage < totalPages ? currentPage + 1 : null,
        ),
        prev: this.createLink(currentPage > 1 ? currentPage - 1 : null),
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  private createLink(pageNumber: number | null) {
    const url = new URL(this.url)

    if (pageNumber) {
      url.searchParams.set('page', pageNumber.toString())
      return url.href
    } else {
      return null
    }
  }

  async metaData(filter: ProductFilterTransformedDto): Promise<MetaDataDto> {
    const productCount = await this.prismaService.product.count({
      where: this.productService.whereConditions(filter),
    })
    const totalProduct = await this.prismaService.product.findMany({
      where: this.productService.whereConditions(filter),
      select: { id: true },
      take: this.productService.perPage,
      skip: filter.page ? (filter.page - 1) * this.productService.perPage : 0,
    })

    const totalPages = Math.ceil(productCount / this.productService.perPage)
    const currentPage = filter.page && filter.page > 0 ? filter.page : 1

    const skip = filter.page
      ? (filter.page - 1) * this.productService.perPage
      : 0

    const from = Math.min(skip + 1, productCount)
    const to = Math.min(skip + totalProduct.length, productCount)

    return {
      path: this.url,
      currentPage: currentPage,
      perPage: this.productService.perPage,
      total: productCount,
      lastPage: totalPages,
      from,
      to,
      links: [{ url: this.url, label: '1', active: true }],
    }
  }
}
