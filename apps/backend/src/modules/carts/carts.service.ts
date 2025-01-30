import { Injectable } from '@nestjs/common'
import { Cart } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { CreateCartDto } from './dto/create-cart.dto'

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async find(accountId: string): Promise<Cart[]> {
    return await this.prisma.cart.findMany({ where: { accountId } })
  }

  async create(cart: CreateCartDto): Promise<Cart> {
    return await this.prisma.cart.create({ data: { ...cart } })
  }
  delete() {}
  update() {}
}
