import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller()
export class MessageConsumer {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('chat_message')
  async handleMessage(@Payload() payload: any) {
    console.log(`📨 Message received for user: ${payload.receiver}`);

    await this.messageService.create({
      sender: payload.sender,
      receiver: payload.receiver,
      content: payload.content,
    });
  }
}
