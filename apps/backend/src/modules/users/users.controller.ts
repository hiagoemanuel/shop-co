import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/users.controller.dto'
import { UsersService } from './users.service'
import { AccountsService } from './accounts.service'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() { account, user }: CreateUserDto) {
    const userExists = await this.usersService.findOne(user.email)

    if (userExists) {
      const accountExists = await this.accountsService.findOne(
        account.providerAccountId,
      )

      if (!accountExists) {
        await this.accountsService.create(account, userExists.id)
      }
    } else {
      const { id } = await this.usersService.create(user)
      await this.accountsService.create(account, id)
    }
  }
}
