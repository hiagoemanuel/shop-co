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
    @Query(new ProductTransformPipe()) filter: ProductFilterTransformedDto,
  ) {
    const meta = await this.productsService.meta(filter)
    const skip = filter.page ? (filter.page - 1) * meta.perPage : 0
    const data = await this.productsService.findAll(filter, meta.perPage, skip)
    const links = this.productsService.links(meta.lastPage, meta.currentPage)

    return { data, links, meta }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findSpecific({
      where: { id: id },
    })

    if (product.length === 0) {
      throw new BadRequestException('This product does not exist')
    } else {
      return product[0]
    }
  }

  @Get('/t/new-arrivals')
  newArrivals() {
    return this.productsService.findSpecific({ take: 4 })
  }

  @Get('/t/top-selling')
  topSelling() {
    return this.productsService.findSpecific({
      where: { AVGrating: { gte: 4.9 } },
      orderBy: { AVGrating: 'asc' },
      take: 4,
    })
  }
}
