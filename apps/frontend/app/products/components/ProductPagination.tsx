import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import { MetaDataType } from '@/types/product-response'

export const ProductPagination = (metaData: MetaDataType) => {
  const prevLink = metaData.links[0]
  const nextLink = metaData.links[metaData.links.length - 1]
  const pages = metaData.links.filter(
    (p) => p.label !== 'Previous' && p.label !== 'Next',
  )
  return (
    <Pagination className="max-w-[70rem] mt-8 pt-5 border-t border-black/10">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          {prevLink.active}
          <PaginationPrevious
            className="py-2 px-3 border border-black/10 rounded-lg font-medium"
            isActive={false}
            href={prevLink.url ?? ''}
          />
        </PaginationItem>
        <div className="flex">
          {pages.map((link) => (
            <PaginationItem key={link.label}>
              {link.url ? (
                <PaginationLink href={link.url}>{link.label}</PaginationLink>
              ) : (
                <PaginationLink isActive={false}>{link.label}</PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>
        <PaginationItem>
          <PaginationNext
            className="py-2 px-3 border border-black/10 rounded-lg font-medium"
            href={nextLink.url ?? ''}
            isActive={nextLink.active}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
