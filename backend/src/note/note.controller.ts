import { Controller, Get } from '@nestjs/common';
import NoteService from './note.service';

@Controller('/note')
export default class NoteController {
  private service = new NoteService();

  @Get()
  async get() {
    return 'note';
  }
}
