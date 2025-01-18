import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <LoaderCircle className="size-24 stroke-2 animate-spin" />
    </div>
  )
}
