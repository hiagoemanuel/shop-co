import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="max-w-[1440px] min-h-96 mx-auto flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-integral-cf">404</h1>
        <h3 className="text-3xl font-medium">This page does not exist</h3>
        <Link
          className="text-2xl rounded-full mt-6 py-4 px-20 border border-black/20 hover:text-white hover:bg-black transition-colors"
          href="/"
        >
          Home page
        </Link>
      </div>
    </section>
  )
}
