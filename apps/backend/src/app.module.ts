import { Module } from '@nestjs/common'
import { ProductsController } from './modules/products/products.controller'
import { PrismaService } from './services/prisma.service'
import { ProductsService } from './modules/products/products.service'
import { FilterService } from './modules/products/filter.service'
import { PaginationService } from './modules/products/pagination.service'

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, FilterService, PaginationService],
})
export class AppModule {}
