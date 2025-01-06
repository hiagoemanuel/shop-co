import { Controller, Get } from '@nestjs/common'
import { ProductService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  allProducts() {
    return this.productService.products()
  }
}
