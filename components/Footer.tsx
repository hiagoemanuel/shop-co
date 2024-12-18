import { Email } from './svgs/Email'

export const Footer = () => {
  return (
    <footer className="bg-red-600">
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
        <div className="py-8 px-4">other content</div>
      </div>
    </footer>
  )
}
