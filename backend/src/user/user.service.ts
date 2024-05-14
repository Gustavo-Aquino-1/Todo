import { Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import prisma from 'src/prisma';
import * as md5 from 'md5';
import UserLoginDto from './dto/user-login.dto';
import { createToken } from 'src/utils/jwt';

@Injectable()
export default class UserService {
  async create(user: CreateUserDto) {
    return await prisma.user.create({
      data: { ...user, password: md5(user.password) },
    });
  }

  async login({ email, password }: UserLoginDto) {
    const user = await prisma.user.findFirst({
      where: { email, password: md5(password) },
    });

    if (!user) throw new NotFoundException({ message: 'user not found' });

    const token = createToken({ id: user.id, name: user.name });

    return {
      id: user.id,
      name: user.name,
      token,
    };
  }
}
