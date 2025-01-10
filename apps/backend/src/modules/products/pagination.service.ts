import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common'
import { PaginationLinksDto } from './dto/pagination.dto'
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
      const totalProducts = await this.prismaService.product.count({
        where: this.productService.whereConditions(filter),
      })
      const totalPages = Math.ceil(totalProducts / this.productService.perPage)
      const currentPage = (!filter.page || filter.page <= 0) && 1

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
}
