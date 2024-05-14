import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma';
import UserDto from 'src/user/dto/user.dto';

@Injectable()
export default class NoteService {
  async get(user: Partial<UserDto>, startIn = 0) {
    return await prisma.note.findMany({
      where: { userId: user.id },
      skip: startIn || 0,
      take: 10,
    });
  }
}
