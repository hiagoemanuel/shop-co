import { Test } from '@nestjs/testing'
import { ProductsService } from './products.service'
import { PrismaService } from 'src/services/prisma.service'
import { FilterService } from './filter.service'
import { PaginationService } from './pagination.service'

const prismaMock = { product: { findMany: jest.fn() } }
const paginationMock = {
  createLink: jest.fn().mockReturnValue(''),
  bootstrap: jest.fn().mockReturnValue([]),
}

describe('ProductsService', () => {
  let productsService: ProductsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        FilterService,
        {
          provide: PaginationService,
          useValue: paginationMock,
        },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    productsService = module.get<ProductsService>(ProductsService)
  })

  it('should return an array of products', async () => {
    const productOne = { name: 'product' }
    const result = [productOne, productOne]

    prismaMock.product.findMany.mockResolvedValueOnce(result)

    const product = await productsService.findAll()
    expect(product).toBe(result)
  })

  it('should return first, last, next and prev links', () => {
    const links = productsService.links()

    expect(links).toHaveProperty('first')
    expect(links).toHaveProperty('last')
    expect(links).toHaveProperty('next')
    expect(links).toHaveProperty('prev')
  })
})
