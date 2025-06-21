import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../common/hash.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Controller('api')
export class UsersController {
  constructor(
    private readonly hashService: HashService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashed = await this.hashService.hash(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashed,
    });
    return { message: 'User created', user };
  }
}
