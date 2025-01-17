import { ProductBreadcrumb } from './components/ProductBreadcrumb'

type ProdcutLayoutProps = {
  children: React.ReactNode
}

export default async function ProductLayout({ children }: ProdcutLayoutProps) {
  return (
    <main className="md:mt-6 mt-5">
      <div className="2xl:px-0 max-w-[1440px] mx-auto px-4">
        <ProductBreadcrumb />
        {children}
      </div>
    </main>
  )
}
