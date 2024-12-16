import type { IProduct } from '@/types/product'

export default [
  {
    product: {
      name: 'Vertical Striped Shirt',
      colors: ['#70846E'],
      size: ['xx-small', 'x-small', 'medium', 'large'],
    },
    images: {
      main: '/top-selling/vertical-striped-shirt.jpg',
      others: [],
    },
    type: 'shirt',
    price: 232,
    rating: 5,
    discount: {
      status: true,
      off: 20,
    },
  },
  {
    product: {
      name: 'Courage Graphic T-shirt',
      colors: ['#CF6335'],
      size: ['x-small', 'medium', 'large'],
    },
    images: {
      main: '/top-selling/courage-graphic-t-shirt.jpg',
      others: [],
    },
    type: 't-shirt',
    price: 145,
    rating: 4,
    discount: {
      status: false,
      off: 0,
    },
  },
  {
    product: {
      name: 'Loose Fit Bermuda Shorts',
      colors: ['#506D88'],
      size: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    },
    images: {
      main: '/top-selling/loose-fit-bermud-shorts.jpg',
      others: [],
    },
    type: 'shorts',
    price: 80,
    rating: 3,
    discount: {
      status: false,
      off: 0,
    },
  },
  {
    product: {
      name: 'Faded Skinny Jeans',
      colors: ['#232024'],
      size: ['medium', 'large', 'x-large'],
    },
    images: {
      main: '/top-selling/faded-skinny-jeans.jpg',
      others: [],
    },
    type: 'jeans',
    price: 210,
    rating: 4.5,
    discount: {
      status: false,
      off: 0,
    },
  },
] as IProduct[]
