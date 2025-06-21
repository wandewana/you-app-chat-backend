import { Injectable, OnModuleInit, Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { HashService } from '../common/hash.service';
import { UsersService } from './users.service';

@Injectable()
class InitService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async onModuleInit() {
    await this.userModel.deleteOne({ email: 'test@example.com' });
    const hashedPassword = await this.hashService.hash('123456');
    await this.userModel.create({ email: 'test@example.com', password: hashedPassword });
    console.log('✔️ Test user reset with hashed password');
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [InitService, HashService, UsersService],
  controllers: [UsersController],
  exports: [HashService, UsersService],
})
export class UsersModule {}
