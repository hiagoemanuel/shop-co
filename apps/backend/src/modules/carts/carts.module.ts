import { Module } from '@nestjs/common'
import { CartsController } from './carts.controller'
import { CartsService } from './carts.service'
import { PrismaService } from 'src/services/prisma.service'

@Module({
  controllers: [CartsController],
  providers: [PrismaService, CartsService],
})
export class CartsModule {}
