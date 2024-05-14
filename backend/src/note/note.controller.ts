import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import NoteService from './note.service';
import IsAuthorized from 'src/guards/IsAuthorized';
import { Request } from 'express';
import { decode } from 'src/utils/jwt';

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
}
