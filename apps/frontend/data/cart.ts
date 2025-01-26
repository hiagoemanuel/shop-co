import { ProductColorType, ProductSizeType } from '@/types/product-response'

export interface ICartProducts {
  id: string
  name: string
  image: string
  size: ProductSizeType
  color: ProductColorType
  amount: number
  price: number
}

export default [
  {
    id: '286b5d4d-fbcd-4f41-a819-e91cc61d6157',
    name: 'Textured Shirt with Pockets',
    price: 629,
    color: 'black',
    size: 'medium',
    amount: 1,
    image:
      'https://res.cloudinary.com/do7x47gpm/image/upload/v1735415337/shop-co/shirt/Textured%20Shirt%20with%20Pockets/ap3ojujgbsdec77wa4b1.jpg',
  },
  {
    id: '286b5d4d-fbcd-4f41-a819-e91cc61d6157',
    name: 'Textured Shirt with Pockets',
    price: 629,
    color: 'black',
    size: 'large',
    amount: 2,
    image:
      'https://res.cloudinary.com/do7x47gpm/image/upload/v1735415337/shop-co/shirt/Textured%20Shirt%20with%20Pockets/ap3ojujgbsdec77wa4b1.jpg',
  },
  {
    id: '1dc5d916-d9d7-41ce-a10c-e54940c4f3fa',
    name: 'Carrot Fit Jeans',
    price: 269,
    color: 'grey',
    size: 'xLarge',
    amount: 2,
    image:
      'https://res.cloudinary.com/do7x47gpm/image/upload/v1736742546/shop-co/jeans/Carrot%20Fit%20Jeans/abpdoftym2qxhnjfsqhy.jpg',
  },
  {
    id: 'c38ee0a6-001e-4297-ad96-09394e7b7ded',
    name: 'Raglan Half Sleeve Hoodie',
    price: 249,
    color: 'beige',
    size: 'xxSmall',
    amount: 4,
    image:
      'https://res.cloudinary.com/do7x47gpm/image/upload/v1736741007/shop-co/hoddie/Raglan%20Half%20Sleeve%20Hoodie/pwi45s0cd1eguvttdw0l.jpg',
  },
] as ICartProducts[]
