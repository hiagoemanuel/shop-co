import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CartsService } from './carts.service'
import { Cart, ColorsType, SizesType } from '@prisma/client'
import { FindCartDto } from './dto/find-cart.dto'
import { UsersService } from '../users/users.service'

@Controller('carts')
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private userService: UsersService,
  ) {}

  @Get(':nextAuthId')
  async find(@Param('nextAuthId') nextAuthId: string): Promise<FindCartDto[]> {
    try {
      const cart = await this.cartsService.find(nextAuthId)
      if (!cart) throw 'Cart not found'
      return cart
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  @Post(':userId/:productId')
  async create(
    @Param() params: { userId: string; productId: string },
    @Body() data: { amount: number; color: ColorsType; size: SizesType },
  ): Promise<Cart> {
    try {
      return await this.cartsService.create({
        userId: params.userId,
        productId: params.productId,
        ...data,
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  @Delete(':userId/:productId')
  async delete(@Param() params: { userId: string; productId: string }) {
    try {
      return this.cartsService.delete(params.userId, params.productId)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
