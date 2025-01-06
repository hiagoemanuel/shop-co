import { Controller, Get } from '@nestjs/common'
import { ProductService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  products() {
    return this.productService.allProducts()
  }

  @Get('new-arrivals')
  newArrivals() {
    return this.productService.products({ take: 4 })
  }

  @Get('top-selling')
  topSelling() {
    return this.productService.products({ take: 4, skip: 4 })
  }
}
