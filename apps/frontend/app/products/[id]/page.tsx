import api from '@/lib/axios'
import { IProduct } from '@/types/product-response'

type ProductIdPageProps = { params: Promise<{ id: string }> }

export default async function ProductIdPage({ params }: ProductIdPageProps) {
  const { id } = await params
  const { data } = await api.get<IProduct>(`/products/${id}`)

  return (
    <div>
      <p>product: {data.name}</p>
    </div>
  )
}
