'use client'

import { Lens } from '@/components/ui/lens'
import Image from 'next/image'
import { useState } from 'react'

type ProductPreviewProps = {
  images: string[]
}

export const ProductPreview = ({ images }: ProductPreviewProps) => {
  const [currentImg, setCurrentImg] = useState(images[0])

  return (
    <div className="sm:flex-row sm:gap-3 flex flex-col gap-3">
      <Lens>
        <Image
          className="sm:w-[27.75rem] sm:h-[33.125rem] h-[73.605dvw] object-cover rounded-3xl"
          src={currentImg}
          width={1920}
          height={2879}
          priority
          alt="product image"
        />
      </Lens>
      <div className="sm:flex-col sm:-order-1 sm:gap-3 flex gap-3">
        {images.map((img) => (
          <Image
            className={`${currentImg === img ? 'border border-black' : ''} sm:w-[9.5rem] sm:h-[10.438rem] h-[27.18dvw] object-cover rounded-3xl cursor-pointer`}
            key={img}
            src={img}
            width={1920}
            height={2879}
            alt="product image"
            onClick={() => setCurrentImg(img)}
          />
        ))}
      </div>
    </div>
  )
}
