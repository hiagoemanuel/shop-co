import api from '@/lib/axios'
import { IProduct } from '@/types/product-response'
import { ProductPreview } from './components/ProductPreview'

type ProductIdPageProps = { params: Promise<{ id: string }> }

export default async function ProductIdPage({ params }: ProductIdPageProps) {
  const { id } = await params
  const { data: product } = await api.get<IProduct>(`/products/${id}`)

  return (
    <section>
      <div>
        <ProductPreview images={product.images} />
        <div></div>
      </div>
    </section>
  )
}
