import { Test } from '@nestjs/testing'
import { CartsService } from './carts.service'
import { PrismaService } from 'src/services/prisma.service'
import { CreateCartDto } from './dto/create-cart.dto'

const prismaMock = { cart: { findMany: jest.fn(), create: jest.fn() } }
const seedCart = (id: number) => ({
  id: 'cart_id_' + id,
  accountId: 'account_id_' + id,
  productId: 'product_id_' + id,
})

describe('CartsService', () => {
  let cartsService: CartsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    cartsService = module.get(CartsService)
  })

  it('should return a cart by accountId', () => {
    const result = [seedCart(123), seedCart(456)]

    prismaMock.cart.findMany.mockResolvedValueOnce(result)

    const accountId = 'account_id_123'
    const cart = cartsService.find(accountId)

    expect(cart).resolves.toBe(result)
  })

  it('should create new product in the cart', () => {
    const createCart: CreateCartDto = {
      accountId: 'account_id_123',
      productId: 'product_id_123',
      amount: 4,
      color: 'white',
      size: 'large',
    }

    const result = { id: 'cart_id_123', ...createCart }

    prismaMock.cart.create.mockResolvedValueOnce(result)

    const product = cartsService.create(createCart)

    expect(product).resolves.toBe(result)
  })

  // it('should delete a product from the cart', () => {})
  // it('shold update a product in the cart', () => {})
})
