import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(messageData: { sender: string; receiver: string; content: string }): Promise<Message> {
    const createdMessage = new this.messageModel(messageData);
    return createdMessage.save();
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
