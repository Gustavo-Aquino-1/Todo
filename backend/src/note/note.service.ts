import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma';
import UserDto from 'src/user/dto/user.dto';
import CreateNoteDto from './dto/create-note.dto';

@Injectable()
export default class NoteService {
  async get(user: Partial<UserDto>, startIn = 0) {
    return await prisma.note.findMany({
      where: { userId: user.id },
      skip: startIn || 0,
      take: 10,
    });
  }

  async create(note: CreateNoteDto, id: number) {
    return await prisma.note.create({
      data: { ...note, userId: id } as any,
    });
  }
}
