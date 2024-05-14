import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import NoteService from './note.service';
import IsAuthorized from 'src/guards/IsAuthorized';
import { Request } from 'express';
import { decode } from 'src/utils/jwt';
import CreateNoteDto from './dto/create-note.dto';

@Controller('/note')
export default class NoteController {
  private service = new NoteService();

  @UseGuards(new IsAuthorized())
  @Get()
  async get(@Req() req: Request) {
    const user = decode(req.headers.authorization || '');
    if (!user) throw new UnauthorizedException({ message: 'unauthorized' });
    const { startIn } = req.query;
    return this.service.get(user as any, +startIn);
  }

  @UseGuards(new IsAuthorized())
  @Post()
  async create(@Body() note: CreateNoteDto, @Req() req: Request) {
    try {
      const { id } = decode(req.headers.authorization) as any;
      return this.service.create(note, id);
    } catch (error) {
      throw new UnauthorizedException({ message: 'unauthorized' });
    }
  }
}
