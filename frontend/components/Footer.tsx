import Link from 'next/link'
import data from '@/data/footer'

import { Email } from './svgs/Email'

export const Footer = () => {
  return (
    <footer className="bg-cyan">
      <div className="sm:pt-[5.625rem] relative max-w-[1440px] mx-auto mt-[11.5rem] pt-[10.75rem]">
        <div className="xl:px-16 sm:-top-[5.625rem] sm:flex-nowrap sm:justify-between sm:h-[11.25rem] absolute w-[calc(100%_-_2rem)] -top-[8.438rem] left-[50%] -translate-x-[50%] p-8 bg-black rounded-3xl flex flex-wrap justify-center items-center gap-8">
          <h1 className="lg:text-4xl lg:w-[34.5rem] sm:w-auto w-72 text-3xl text-white font-integral-cf">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>
          <form className="w-full sm:max-w-96 flex flex-col gap-3">
            <label
              className="bg-white rounded-full px-4 py-3 flex items-center gap-3"
              htmlFor="email"
            >
              <Email />
              <input
                className="lg:text-base outline-none text-black/40 text-sm"
                type="email"
                placeholder="Enter your email address"
                autoComplete="off"
                id="email"
              />
            </label>
            <input
              className="lg:text-base bg-white text-black py-3 rounded-full text-sm text-center font-medium cursor-pointer"
              type="submit"
              value="Subscribe to Newsletter"
            />
          </form>
        </div>
        <div className="px-4 pt-8">
          <div className="lg:flex-row flex flex-col justify-between">
            <div className="mb-6">
              <h1 className="lg:text-4xl mb-3 text-3xl font-integral-cf text-black">
                SHOP.CO
              </h1>
              <p className="lg:w-[15.5rem] mb-5 text-sm text-black/60 ">
                We have clothes that suits your style and which you&#39;re proud
                to wear. From women to men.
              </p>
              <div className="flex gap-3">
                {data.medias.map((media) => (
                  <Link
                    className="w-7 h-7 group rounded-full bg-white hover:bg-black transition-colors border border-black/20 flex justify-center items-center"
                    href={media.link}
                    target="_blank"
                    key={media.icon}
                  >
                    <media.icon />
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:w-full lg:justify-items-center md:grid-cols-4 mb-10 grid grid-cols-2 gap-6 justify-between">
              {data.links.map((linkGroup) => (
                <div key={linkGroup.title}>
                  <h1 className="lg:text-base lg:mb-6 mb-4 text-sm font-medium uppercase space tracking-widest">
                    {linkGroup.title}
                  </h1>
                  <div className="lg:gap-5 flex flex-col gap-4">
                    {linkGroup.links.map((link) => (
                      <Link
                        className="lg:text-base text-sm text-black/60 hover:underline"
                        href={link.href}
                        key={link.label}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className="inline-block w-full border-t border-black/10" />
          <div className="md:flex-row md:mt-6 mt-4 pb-20 flex flex-col justify-between items-center gap-4">
            <h4 className="text-sm text-black/60">
              Shop.co © 2000-2023, All Rights Reserved
            </h4>
            <div className="flex gap-3">
              {data.payments.map((payment) => (
                <div
                  className="w-10 h-6 rounded-sm bg-white flex justify-center items-center"
                  key={payment.name}
                >
                  <payment.icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
