import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { MessagePublisher } from './message.gateway';
import { MessageService } from './message.service';
import { ViewMessagesDto } from './dto/view-messages.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class MessageController {
  constructor(
    private publisher: MessagePublisher,
    private readonly messageService: MessageService,
  ) {}

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

  @Get('viewMessages')
  async viewMessages(@Query() query: ViewMessagesDto, @Request() req) {
    const currentUserId = req.user.userId;
    const chatPartnerId = query.userId;

    const messages = await this.messageService.findBetweenUsers(currentUserId, chatPartnerId);

    return { messages };
  }
}
