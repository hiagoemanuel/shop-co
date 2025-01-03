import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async products() {
    return this.prismaService.product.findMany()
  }
}
