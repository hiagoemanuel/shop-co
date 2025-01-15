import { ProductColorType, ProductSizeType } from '@/types/product-response'

export const productsType = [
  { type: 'T-shirts', urlValue: 'tShirt' },
  { type: 'Shorts', urlValue: 'short' },
  { type: 'Shirts', urlValue: 'shirt' },
  { type: 'Hoodies', urlValue: 'hoodie' },
  { type: 'Jeans', urlValue: 'jeans' },
] as const

export interface IProductsColors {
  name: ProductColorType
  hex: string
  arrow?: 'black' | 'white'
}

export const productsColors: IProductsColors[] = [
  { name: 'beige', hex: '#D9B99B', arrow: 'black' },
  { name: 'black', hex: '#000000' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'brown', hex: '#964B00' },
  { name: 'cyan', hex: '#00FFFF', arrow: 'black' },
  { name: 'grey', hex: '#808080' },
  { name: 'green', hex: '#008000' },
  { name: 'orange', hex: '#ffa500' },
  { name: 'purple', hex: '#800080' },
  { name: 'red', hex: '#FF0000' },
  { name: 'white', hex: '#FFFFFF', arrow: 'black' },
  { name: 'yellow', hex: '#FFFF00', arrow: 'black' },
] as const

export interface IProductsSizes {
  value: ProductSizeType
  label: string
}

export const productsSizes: IProductsSizes[] = [
  { value: 'xxSmall', label: 'XX-Small' },
  { value: 'xSmall', label: 'X-Small' },
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xLarge', label: 'X-Large' },
  { value: 'xxLarge', label: 'XX-Large' },
  { value: 'xxxLarge', label: '3X-Large' },
  { value: 'xxxxLarge', label: '4X-Large' },
] as const

export const productsDressStyle = [
  { type: 'All Products', urlValue: '/products' },
  { type: 'Casual', urlValue: '?style=casual' },
  { type: 'Formal', urlValue: '?style=formal' },
  { type: 'Party', urlValue: '?style=party' },
  { type: 'Gym', urlValue: '?style=gym' },
] as const
