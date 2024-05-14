import { Controller, Get } from '@nestjs/common';
import UserService from './user.service';

@Controller('/user')
export default class UserController {
  private service = new UserService();

  @Get()
  async get() {
    return 'user';
  }
}
