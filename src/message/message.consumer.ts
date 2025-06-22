import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller()
export class MessageConsumer {
  constructor(private readonly messageService: MessageService) {}

  private notifyReceiver(sender: string, receiver: string, content: string) {
    console.log(`🔔 New message from ${sender} to ${receiver}: ${content}`);
  }

  @EventPattern('chat_message')
  async handleMessage(@Payload() payload: { sender: string; receiver: string; content: string }) {
    console.log(`📨 Message received for user: ${payload.receiver}`);

    await this.messageService.create({
      sender: payload.sender,
      receiver: payload.receiver,
      content: payload.content,
    });

    this.notifyReceiver(payload.sender, payload.receiver, payload.content);
  }
}
