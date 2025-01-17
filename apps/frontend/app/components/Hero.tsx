import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="lg:items-center lg:gap-12 md:gap-2 bg-[#F2F0F1] flex flex-wrap justify-center">
      <div className="lg:my-12 lg:mx-0 lg:max-w-xl lg:gap-8 md:my-10 sm:max-w-md sm:items-start max-w-[22.375rem] flex flex-col items-stretch gap-6 mx-4 mt-10">
        <h1 className="lg:text-[4rem] sm:text-5xl text-4xl font-integral-cf">
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </h1>
        <p className="sm:text-base text-sm text-black/60">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Link
          className="lg:mb-4 bg-black rounded-full py-4 px-16 text-white font-medium text-center"
          href="/products"
        >
          Shop Now
        </Link>
        <div className="lg:flex-nowrap flex justify-center flex-wrap gap-7">
          <div>
            <h1 className="lg:text-[2.5rem] text-2xl font-bold">200+</h1>
            <p className="lg:text-base text-black/60 text-xs text-nowrap">
              International Brands
            </p>
          </div>
          <span className="block h-[3.25rem] border-r border-black/10" />
          <div>
            <h1 className="lg:text-[2.5rem] text-2xl font-bold">2,000+</h1>
            <p className="lg:text-base text-black/60 text-xs text-nowrap">
              High-Quality Products
            </p>
          </div>
          <span className="sm:block hidden h-[3.25rem] border-r border-black/10" />
          <div>
            <h1 className="lg:text-[2.5rem] text-2xl font-bold">30,000+</h1>
            <p className="lg:text-base text-black/60 text-xs text-nowrap">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
      <div className="select-none self-end">
        <Image
          className="xl:w-[38.75rem] xl:h-auto w-[24.375rem] h-[28rem]"
          src="/models.png"
          priority
          width={620}
          height={663}
          alt="models picture"
        />
      </div>
    </section>
  )
}
