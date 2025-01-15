import { ChevronRight } from 'lucide-react'

export const ProductPath = () => {
  const fooPath = ['Home', 'Casual', 'One Life Graphic T-shirt']

  return (
    <div className="md:gap-3 md:mb-6 mb-3 flex gap-2">
      {fooPath.map((slug, idx) => (
        <div className="flex gap-1 items-center" key={slug}>
          <h5 className="md:text-base text-sm text-black/60 cursor-pointer hover:text-black">
            {slug}
          </h5>
          {idx !== fooPath.length - 1 && (
            <ChevronRight width="1rem" opacity="60%" />
          )}
        </div>
      ))}
    </div>
  )
}
