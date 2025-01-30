import { BadRequestException, Injectable } from '@nestjs/common'
import { Account } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { AccountDto } from './dto/users.controller.dto'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOne(providerAccountId: string): Promise<Account> | null {
    return this.prisma.account.findUnique({ where: { providerAccountId } })
  }

  async create(account: AccountDto, userId: string) {
    try {
      return this.prisma.account.create({
        data: {
          provider: account.provider,
          access_token: account.access_token,
          providerAccountId: account.providerAccountId,
          scope: account.scope,
          token_type: account.token_type,
          type: account.type,
          userId,
        },
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
