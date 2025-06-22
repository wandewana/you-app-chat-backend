import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('api')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('testSend')
  testSend(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }
}
