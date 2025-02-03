import { Injectable } from '@nestjs/common'
import { Cart } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { FindCartDto } from './dto/find-cart.dto'

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async find(userId: string): Promise<FindCartDto[]> {
    const query = await this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            name: true,
            images: true,
            definedPrice: true,
            discount: true,
          },
        },
      },
    })

    const cart: FindCartDto[] = query.map((cart) => ({
      id: cart.id,
      productId: cart.productId,
      name: cart.product.name,
      image: cart.product.images[0],
      size: cart.size,
      color: cart.color,
      amount: cart.amount,
      price: cart.product.definedPrice,
      discount: cart.product.discount,
    }))

    return cart
  }

  async create(cart: CreateCartDto): Promise<Cart> {
    return await this.prisma.cart.create({ data: { ...cart } })
  }

  async delete(userId: string, productId: string) {
    return await this.prisma.cart.deleteMany({
      where: { userId, id: productId },
    })
  }

  update() {}
}
