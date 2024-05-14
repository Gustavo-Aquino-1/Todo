import { Body, Controller, Post } from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UserLoginDto from './dto/user-login.dto';

@Controller('/user')
export default class UserController {
  private service = new UserService();

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.service.create(user);
  }

  @Post('/login')
  async login(@Body() data: UserLoginDto) {
    return this.service.login(data);
  }
}
