import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { MessagePublisher } from './message.gateway';

@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class MessageController {
  constructor(private publisher: MessagePublisher) {}

  @Post('sendMessage')
  async send(@Body() dto: CreateMessageDto, @Request() req) {
    const payload = {
      sender: req.user.userId,
      receiver: dto.receiver,
      content: dto.content,
    };
    await this.publisher.publishMessage(payload);
    return { status: 'Message sent to queue' };
  }
}
