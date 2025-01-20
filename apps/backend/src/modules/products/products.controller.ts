import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common'
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
  async findAll(
    @Query(new ProductTransformPipe()) queries: ProductFilterTransformedDto,
  ) {
    const productResponse = await this.productsService.productResponse(queries)
    return productResponse
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.products({ where: { id: id } })

    if (product.length === 0) {
      throw new BadRequestException('This product does not exist')
    } else {
      return product[0]
    }
  }

  @Get('/t/new-arrivals')
  newArrivals() {
    return this.productsService.products({ take: 4 })
  }

  @Get('/t/top-selling')
  topSelling() {
    return this.productsService.products({
      where: { AVGrating: { gte: 4.9 } },
      orderBy: { AVGrating: 'asc' },
      take: 4,
    })
  }
}
