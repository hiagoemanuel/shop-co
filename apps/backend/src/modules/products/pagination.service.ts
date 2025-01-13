import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

interface IUrl {
  url: string
  label: string
  active: boolean
}

@Injectable({ scope: Scope.REQUEST })
export class PaginationService {
  public url: string
  private pagination: IUrl[]

  constructor(@Inject(REQUEST) private readonly req: Request) {
    if (this.req.headers.origin) {
      this.url = `${this.req.headers.origin}${this.req.url}`
    } else {
      this.url = `${this.req.protocol}://${this.req.headers.host}${this.req.url}`
    }
    this.pagination = []
  }

  bootstrap(currentPage: number, totalPages: number): IUrl[] {
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const nextPage = currentPage < totalPages ? currentPage + 1 : null

    this.setPage(prevPage, 'Previous')

    if (totalPages < 7) {
      for (let page = 1; page <= totalPages; page++) {
        this.setPage(page)
      }
      this.setPage(nextPage, 'Next')
      return this.pagination
    }

    if (currentPage !== 1 || currentPage < 1) this.setPage(1)

    if (currentPage <= 3) {
      this.setPage(currentPage)
      this.setPage(currentPage + 1)
      if (currentPage === 1) this.setPage(3)

      this.setPage(null, '...')

      for (let i = 2; i >= 0; i--) {
        this.setPage(totalPages - i)
      }
    }

    if (currentPage > 3 && totalPages - currentPage >= 3) {
      if (currentPage === totalPages - 3) {
        this.setPage(2)
        this.setPage(3)
        this.setPage(null, '...')
        this.setPage(currentPage)
        this.setPage(currentPage + 1)
        this.setPage(totalPages)
      } else {
        this.setPage(currentPage)
        this.setPage(currentPage + 1)
        this.setPage(null, '...')

        for (let i = 2; i >= 0; i--) {
          this.setPage(totalPages - i)
        }
      }
    }

    if (totalPages - currentPage < 3) {
      this.setPage(2)
      this.setPage(3)
      this.setPage(null, '...')

      if (totalPages === currentPage) {
        this.setPage(totalPages - 2)
        this.setPage(totalPages - 1)
        this.setPage(totalPages)
        this.setPage(nextPage, 'Next')
        return this.pagination
      }

      this.setPage(currentPage - 1)
      this.setPage(currentPage)
      this.setPage(totalPages)
    }

    this.setPage(nextPage, 'Next')
    return this.pagination
  }

  private setPage(pageNumber: number, label?: string | number) {
    this.pagination = [
      ...this.pagination,
      {
        url: this.createLink(pageNumber),
        label: label ? label.toString() : pageNumber.toString(),
        active: !!this.createLink(pageNumber),
      },
    ]
  }

  createLink(pageNumber: number | null): string | null {
    if (!pageNumber) return null
    const url = new URL(this.url)
    url.searchParams.set('page', pageNumber.toString())
    return url.href
  }
}
