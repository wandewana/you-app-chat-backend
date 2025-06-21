import { Injectable, OnModuleInit, Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { UsersController } from './users.controller';

@Injectable()
class InitService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const existing = await this.userModel.findOne({ email: 'test@example.com' });
    if (!existing) {
      await this.userModel.create({ email: 'test@example.com', password: '123456' });
      console.log('✔️ Test user inserted');
    }
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [InitService],
  controllers: [UsersController],
})
export class UsersModule {}

