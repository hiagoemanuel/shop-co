import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { UserDto } from './dto/users.controller.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User> | null {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async create(user: UserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
