import { CalvinKlein } from './svgs/CalvinKlein'
import { Gucci } from './svgs/Gucci'
import { Prada } from './svgs/Prada'
import { Versace } from './svgs/Versace'
import { Zara } from './svgs/Zara'

export const BrandsTape = () => {
  return (
    <section className="bg-black">
      <div className="max-w-[1440px] mx-auto relative py-10 flex overflow-x-hidden">
        <span className="block absolute top-0 left-0 bg-gradient-to-r w-28 h-full z-10 from-black to-black/0" />
        <span className=" block absolute top-0 right-0 bg-gradient-to-l w-28 h-full z-10 from-black to-black/0" />
        <div className="md:gap-32 md:pr-32 w-max flex items-center gap-8 pr-8 animate-to-left">
          <Versace />
          <Zara />
          <Gucci />
          <Prada />
          <CalvinKlein />
        </div>
        <div className="md:gap-32 md:pr-32 w-max flex items-center gap-8 pr-8 animate-to-left">
          <Versace />
          <Zara />
          <Gucci />
          <Prada />
          <CalvinKlein />
        </div>
      </div>
    </section>
  )
}
