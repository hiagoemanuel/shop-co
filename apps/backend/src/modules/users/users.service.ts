import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { UserDto } from './dto/users.controller.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User> | null {
    return await this.prisma.user.findUnique({ where: { nextAuthId: id } })
  }

  async create(user: UserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          nextAuthId: user.id,
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
