import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto);
  }

  async findBetweenUsers(userA: string, userB: string) {
    return this.messageModel.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA },
      ],
    }).sort({ createdAt: 1 });
  }
}
