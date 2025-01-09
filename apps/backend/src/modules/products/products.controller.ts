import { Controller, Get, Query, UsePipes } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.piper'
import {
  ProductFilterTransformedDto,
  schemaProductFilter,
} from './dto/product-filter.dto'
import { ProductTransformPipe } from 'src/common/pipes/product-transform.piper'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(schemaProductFilter))
  async products(
    @Query(new ProductTransformPipe()) queries: ProductFilterTransformedDto,
  ) {
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
