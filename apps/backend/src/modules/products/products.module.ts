import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { PrismaService } from 'src/services/prisma.service'
import { ProductsService } from './products.service'
import { FilterService } from './filter.service'
import { PaginationService } from './pagination.service'

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, FilterService, PaginationService],
})
export class ProductsModule {}
