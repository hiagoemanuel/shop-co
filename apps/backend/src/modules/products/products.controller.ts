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
  async getProducts(
    @Query(new ProductTransformPipe()) queries: ProductFilterTransformedDto,
  ) {
    const productResponse = await this.productsService.productResponse(queries)
    return productResponse
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
