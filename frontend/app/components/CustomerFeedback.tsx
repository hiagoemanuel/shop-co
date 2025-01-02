import type { ICustomerFeedback } from '@/types/customer-feedback'
import customerFeedback from '@/data/customer-feedback'
import { Star } from '@/components/svgs/Star'
import { Verify } from '@/components/svgs/Verify'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const CustomerCard = (custormer: ICustomerFeedback) => {
  const fullStars = Math.floor(custormer.rating)

  return (
    <div className="lg:w-[25rem] lg:h-60 w-[22.375rem] h-52 p-6 rounded-3xl border border-black/10 select-none">
      <div className="mb-3 flex gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <div className="mb-2 flex gap-1 items-center">
        <h4 className="lg:text-xl text-base font-bold">{custormer.name}</h4>
        {custormer.isVerify && <Verify />}
      </div>
      <p className="lg:text-base text-sm text-black/60">{custormer.feedback}</p>
    </div>
  )
}

export const CustomerFeedback = () => {
  return (
    <section className="mt-12">
      <div>
        <h1 className="w-min sm:w-auto lg:text-5xl lg:mb-10 ml-4 mb-6 text-3xl font-integral-cf">
          OUR HAPPY CUSTOMERS
        </h1>
      </div>
      <Carousel opts={{ loop: true }}>
        <span className="z-10 absolute left-0 w-8 h-full bg-gradient-to-r from-white to-white/0" />
        <span className="z-10 absolute right-0 w-8 h-full bg-gradient-to-l from-white to-white/0" />
        <CarouselContent>
          {customerFeedback.map((customer) => (
            <CarouselItem className="basis-1/1" key={customer.name}>
              <CustomerCard {...customer} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="lg:-top-16 absolute -top-14 right-4 flex gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  )
}
