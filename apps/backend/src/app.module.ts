import { Module } from '@nestjs/common'
import { ProductsController } from './products/products.controller'
import { ProductService } from './products/products.service'
import { PrismaService } from './services/prisma.service'

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
})
export class AppModule {}
