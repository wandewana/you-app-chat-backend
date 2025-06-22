import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessagePublisher } from './message.gateway';

describe('MessageController', () => {
  let controller: MessageController;

  const mockMessageService = {
    findBetweenUsers: jest.fn(),
  };

  const mockMessagePublisher = {
    publishMessage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: MessagePublisher,
          useValue: mockMessagePublisher,
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
