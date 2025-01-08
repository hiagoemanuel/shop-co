import { Controller, Get, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { IFilterProducts } from 'types/filter-products'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async products(@Query() queries: IFilterProducts) {
    const products = await this.productsService.filter(queries)
    return products
  }

  @Get('new-arrivals')
  newArrivals() {
    return this.productsService.products({ take: 4 })
  }

  @Get('top-selling')
  topSelling() {
    return this.productsService.products({ take: 4, skip: 4 })
  }
}
