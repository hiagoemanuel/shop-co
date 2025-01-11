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
  private pagination: IUrl[]
  url: string

  constructor(@Inject(REQUEST) private readonly req: Request) {
    this.url = `${this.req.protocol}://${this.req.headers.host}${this.req.url}`
    this.pagination = []
  }

  bootstrap(currentPage: number, totalPages: number): IUrl[] {
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const nextPage = currentPage < totalPages ? currentPage + 1 : null

    this.setPage = { label: 'Previous', pageNumber: prevPage }

    if (totalPages < 7) {
      for (let page = 1; page <= totalPages; page++) {
        this.setPage = { label: page.toString(), pageNumber: page }
      }
      return this.pagination
    }

    if (currentPage !== 1) this.setPage = { label: '1', pageNumber: 1 }
    if (currentPage < 1) this.setPage = { label: '1', pageNumber: 1 }

    if (currentPage <= 3) {
      this.setPage = { label: currentPage.toString(), pageNumber: currentPage }
      this.setPage = {
        label: `${currentPage + 1}`,
        pageNumber: currentPage + 1,
      }
      if (currentPage === 1) this.setPage = { label: '3', pageNumber: 3 }

      this.setPage = { label: '...', pageNumber: null }

      for (let i = 2; i >= 0; i--) {
        const pageNumber = totalPages - i
        this.setPage = { label: pageNumber.toString(), pageNumber }
      }
      this.setPage = { label: 'Next', pageNumber: nextPage }
      return this.pagination
    }

    if (currentPage > 3 && totalPages - currentPage >= 3) {
      this.setPage = { label: currentPage.toString(), pageNumber: currentPage }
      this.setPage = {
        label: `${currentPage + 1}`,
        pageNumber: currentPage + 1,
      }

      this.setPage = { label: '...', pageNumber: null }

      for (let i = 2; i >= 0; i--) {
        const pageNumber = totalPages - i
        this.setPage = { label: pageNumber.toString(), pageNumber }
      }
      this.setPage = { label: 'Next', pageNumber: nextPage }
      return this.pagination
    }

    if (totalPages - currentPage < 3) {
      this.setPage = { label: '2', pageNumber: 2 }
      this.setPage = { label: '3', pageNumber: 3 }
      this.setPage = { label: '...', pageNumber: null }

      if (totalPages === currentPage) {
        this.setPage = {
          label: `${totalPages - 2}`,
          pageNumber: totalPages - 2,
        }
        this.setPage = {
          label: `${totalPages - 1}`,
          pageNumber: totalPages - 1,
        }
        this.setPage = { label: totalPages.toString(), pageNumber: totalPages }
        return this.pagination
      }

      this.setPage = {
        label: `${currentPage - 1}`,
        pageNumber: currentPage - 1,
      }
      this.setPage = { label: currentPage.toString(), pageNumber: currentPage }
      this.setPage = { label: totalPages.toString(), pageNumber: totalPages }
    }

    this.setPage = { label: 'Next', pageNumber: nextPage }
    return this.pagination
  }

  set setPage({ label, pageNumber }: { label: string; pageNumber: number }) {
    this.pagination = [
      ...this.pagination,
      {
        url: this.createLink(pageNumber),
        label,
        active: this.createLink(pageNumber) ? true : false,
      },
    ]
  }

  createLink(pageNumber: number) {
    const url = new URL(this.url)

    if (pageNumber) {
      url.searchParams.set('page', pageNumber.toString())
      return url.href
    } else {
      return null
    }
  }
}
