import { Module } from '@nestjs/common'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'
import { CartsModule } from './modules/carts/carts.module'

@Module({
  imports: [ProductsModule, UsersModule, CartsModule],
})
export class AppModule {}
