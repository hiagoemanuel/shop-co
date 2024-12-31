import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'

export const ProductPagination = () => {
  return (
    <Pagination className="max-w-[70rem] mt-8 pt-5 border-t border-black/10">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            className="py-2 px-3 border border-black/10 rounded-lg font-medium"
            href="/"
          />
        </PaginationItem>
        <div className="flex">
          <PaginationItem>
            <PaginationLink href="/">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/">2</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden md:list-item">
            <PaginationLink href="/">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="hidden min-[714px]:list-item">
            <PaginationLink href="/">8</PaginationLink>
          </PaginationItem>
          <PaginationItem className="sm:hidden min-[714px]:list-item">
            <PaginationLink href="/">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/">10</PaginationLink>
          </PaginationItem>
        </div>
        <PaginationItem>
          <PaginationNext
            className="py-2 px-3 border border-black/10 rounded-lg font-medium"
            href="/"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
