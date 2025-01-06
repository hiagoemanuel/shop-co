import { Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { ProductsController } from './products/products.controller'
import { ProductService } from './products/products.service'

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
})
export class AppModule {}
