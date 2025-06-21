import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class UsersController {
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return { message: 'Valid input received', data: createUserDto };
  }
}
