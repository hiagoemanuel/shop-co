import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { PrismaService } from 'src/services/prisma.service'
import { PaginationService } from './pagination.service'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PaginationService, PrismaService],
})
export class ProductsModule {}
