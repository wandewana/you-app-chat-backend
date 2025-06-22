import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessagePublisher } from './message.gateway';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  controllers: [MessageController, MessageConsumer],
  providers: [MessageService, MessagePublisher],
  exports: [MessageService, MessagePublisher],
})
export class MessageModule {}
