import api from '@/lib/axios'
import { IProduct } from '@/types/product-response'
import { ProductPreview } from './components/ProductPreview'
import { ProductDetails } from './components/ProductDetails'

type ProductIdPageProps = { params: Promise<{ id: string }> }

export default async function ProductIdPage({ params }: ProductIdPageProps) {
  const { id } = await params
  const { data: product } = await api.get<IProduct>(`/products/${id}`)

  return (
    <section>
      <div className="lg:gap-5 lg:flex-row lg:justify-center lg:items-start flex flex-col gap-5 items-center">
        <ProductPreview images={product.images} />
        <ProductDetails {...product} />
      </div>
    </section>
  )
}
