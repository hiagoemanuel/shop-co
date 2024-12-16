import type { IProduct } from '@/types/product'

export default [
  {
    product: {
      name: 'T-shirt with Tape Details',
      colors: ['#000000'],
      size: ['small', 'medium', 'large', 'x-large'],
    },
    images: {
      main: '/new-arrivals/pictures/t-shirt-with-tape-details.jpg',
      others: [],
    },
    type: 't-shirt',
    price: 120,
    rating: 4.5,
    discount: {
      status: false,
      off: 0,
    },
  },
  {
    product: {
      name: 'Skinny Fit Jean',
      colors: ['#344A61'],
      size: ['medium', 'large', 'x-large', 'xx-large'],
    },
    images: {
      main: '/new-arrivals/pictures/skinny-fit-jeans.jpg',
      others: [],
    },
    type: 'jeans',
    price: 260,
    rating: 4,
    discount: {
      status: true,
      off: 20,
    },
  },
  {
    product: {
      name: 'Checkered Shirt',
      colors: ['#222D4F'],
      size: ['small', 'medium', 'large'],
    },
    images: {
      main: '/new-arrivals/pictures/checkered-shirt.jpg',
      others: [],
    },
    type: 'shirt',
    price: 180,
    rating: 4.5,
    discount: {
      status: false,
      off: 0,
    },
  },
  {
    product: {
      name: 'Sleeve Triped T-shirt',
      colors: ['#E65D35'],
      size: ['small', 'medium', 'large'],
    },
    images: {
      main: '/new-arrivals/pictures/sleeve-triped-t-shirt.jpg',
      others: [],
    },
    type: 't-shirt',
    price: 160,
    rating: 4.5,
    discount: {
      status: true,
      off: 30,
    },
  },
] as IProduct[]
