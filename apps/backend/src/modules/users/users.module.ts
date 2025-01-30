import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/services/prisma.service'
import { UsersService } from './users.service'
import { AccountsService } from './accounts.service'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AccountsService],
})
export class UsersModule {}
