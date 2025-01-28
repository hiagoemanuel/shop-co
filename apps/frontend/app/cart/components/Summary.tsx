import { ArrowRight, Tag } from 'lucide-react'

export const Summary = () => {
  return (
    <div className="lg:min-w-[31.25rem] min-[900px]:min-w-80 sm:px-6 sm:gap-6 h-fit p-5 flex flex-col gap-4 rounded-3xl border border-black/10">
      <h1 className="sm:text-2xl text-xl font-bold">Order Summary</h1>
      <div className="flex flex-col gap-5">
        <div className="sm:text-xl text-base flex justify-between">
          <h2 className="text-black/60">Subtotal</h2>
          <p className="font-bold">$565</p>
        </div>
        <div className="sm:text-xl text-base flex justify-between">
          <h2 className="text-black/60">Discount (-20%)</h2>
          <p className="font-bold text-[#FF3333]">-$113</p>
        </div>
        <div className="sm:text-xl text-base flex justify-between">
          <h2 className="text-black/60">Delivery Fee</h2>
          <p className="font-bold">$15</p>
        </div>
        <span className="block w-full h-px bg-black/10" />
        <div className="sm:text-xl text-base flex justify-between">
          <h1>Total</h1>
          <p className="sm:text-2xl text-xl font-bold">$467</p>
        </div>
      </div>
      <div className="flex gap-3">
        <label
          className="grow p-4 flex gap-2 rounded-full bg-cyan cursor-pointer"
          htmlFor="promo"
        >
          <Tag className="sm:size-6 size-5 stroke-black/40" />
          <input
            className="sm:text-base w-full outline-none bg-transparent text-sm text-black/40"
            type="text"
            id="promo"
            placeholder="Add promo code"
          />
        </label>
        <button
          className="lg:px-8 sm:text-base text-sm py-4 px-6 text-white bg-black font-medium rounded-full"
          type="button"
        >
          Apply
        </button>
      </div>
      <button className="sm:text-base sm:py-5 py-4 flex justify-center items-center gap-3 bg-black text-white rounded-full text-sm font-medium">
        Go to Checkout
        <ArrowRight className="sm:size-6 size-5" />
      </button>
    </div>
  )
}
