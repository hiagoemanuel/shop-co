import { ProductPath } from '../../components/ProductPath'

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="md:mt-6 mt-5">
      <div className="2xl:px-0 max-w-[1440px] mx-auto px-4">
        <ProductPath />
        {children}
      </div>
    </main>
  )
}
