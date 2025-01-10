import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import {
  ProductFilterDto,
  ProductFilterTransformedDto,
  schemaProductFilterTrasformed,
} from 'src/modules/products/dto/product-filter.dto'
import { toArray } from 'src/utils/to-array'

@Injectable()
export class ProductTransformPipe
  implements PipeTransform<ProductFilterDto, ProductFilterTransformedDto>
{
  transform(value: ProductFilterDto): ProductFilterTransformedDto {
    try {
      const range = toArray(value.price)
        .map((d) => Number(d))
        .sort((a, b) => a - b)

      const data = {
        page: value.page ? Number(value.page) : undefined,
        search: value.search,
        type: value.type ? toArray(value.type) : undefined,
        price: value.price ? [range[0], range[1]] : undefined,
        colors: value.colors ? toArray(value.colors) : undefined,
        size: value.size ? toArray(value.size) : undefined,
        style: value.style,
        sort: value.sort,
      }

      const validation = schemaProductFilterTrasformed.parse(
        this.removeUndefinedFields(data),
      )
      return validation
    } catch {
      throw new BadRequestException('Validation failed')
    }
  }

  removeUndefinedFields(obg: object) {
    return Object.fromEntries(
      Object.entries(obg).filter((prop) => prop[1] !== undefined),
    )
  }
}
