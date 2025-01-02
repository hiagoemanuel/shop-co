import { WobbleCard } from '@/components/ui/wobble-card'
import { cn } from '@/lib/utils'

import Image from 'next/image'

interface IStyleItem {
  containerClassName?: string
  title: string
  bgClassName: string
  background: {
    src: string
    alt: string
  }
}

const StyleItem = ({
  containerClassName,
  title,
  bgClassName,
  background,
}: IStyleItem) => (
  <WobbleCard
    className="xl:h-72 bg-white w-full h-48 rounded-3xl"
    containerClassName={containerClassName}
  >
    <h2 className="lg:top-6 lg:left-9 lg:text-4xl absolute z-10 top-4 left-6 text-2xl font-bold">
      {title}
    </h2>
    <Image
      className={cn('xl:w-[30rem] absolute w-72', bgClassName)}
      {...background}
      width={480}
      height={540}
      priority
    />
  </WobbleCard>
)

export const BrowseDressCard = () => {
  return (
    <section className="mx-4">
      <div className="lg:px-16 px-6 rounded-3xl bg-cyan">
        <h1 className="md:text-5xl pt-10 text-[2rem] leading-9 text-center font-integral-cf">
          BROWSE BY DRESS STYLE
        </h1>
        <div className="lg:gap-5 lg:py-16 lg:grid-cols-3 md:grid-cols-2 py-7 grid gap-4 grid-cols-1">
          <StyleItem
            title="Casual"
            bgClassName="xl:-top-[90px] xl:-right-[170px] -top-[67px] -right-[80px]"
            background={{ src: '/dress-style/casual.jpg', alt: 'casual style' }}
          />
          <StyleItem
            containerClassName="lg:col-span-2"
            title="Formal"
            bgClassName="xl:-top-[129px] xl:-right-[10px] -top-[86px] -right-[55px]"
            background={{ src: '/dress-style/formal.jpg', alt: 'formal style' }}
          />
          <StyleItem
            containerClassName="lg:col-span-2"
            title="Party"
            bgClassName="xl:-top-[144px] -top-[86px] -right-[40px]"
            background={{ src: '/dress-style/party.jpg', alt: 'party style' }}
          />
          <StyleItem
            title="Gym"
            bgClassName="xl:-top-[110px] xl:-right-[70px] -top-[74px] -right-[36px]"
            background={{ src: '/dress-style/gym.jpg', alt: 'gym style' }}
          />
        </div>
      </div>
    </section>
  )
}
