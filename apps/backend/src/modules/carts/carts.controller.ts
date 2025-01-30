import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CartsService } from './carts.service'
import { Cart, ColorsType, SizesType } from '@prisma/client'

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get(':accontId')
  async find(@Param('accontId') accountId: string): Promise<Cart[]> {
    try {
      const cart = await this.cartsService.find(accountId)
      if (!cart) throw 'Cart not found'
      return cart
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  @Post(':accountId/:productId')
  async create(
    @Param() params: { accountId: string; productId: string },
    @Body() data: { amount: number; color: ColorsType; size: SizesType },
  ): Promise<Cart> {
    try {
      return await this.cartsService.create({
        accountId: params.accountId,
        productId: params.productId,
        ...data,
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
