import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getModelToken } from '@nestjs/mongoose';

const mockMessageModel = {
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockResolvedValue([]),
  create: jest.fn(),
};

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getModelToken('Message'),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findBetweenUsers', () => {
    it('should return sorted messages between two users', async () => {
      const mockMessages = [{ content: 'Hi' }, { content: 'Hello' }];
      mockMessageModel.sort.mockResolvedValueOnce(mockMessages);

      const result = await service.findBetweenUsers('userA', 'userB');

      expect(mockMessageModel.find).toHaveBeenCalledWith({
        $or: [
          { sender: 'userA', receiver: 'userB' },
          { sender: 'userB', receiver: 'userA' },
        ],
      });

      expect(mockMessageModel.sort).toHaveBeenCalledWith({ createdAt: 1 });
      expect(result).toEqual(mockMessages);
    });

    it('should return an empty array if no messages are found', async () => {
      mockMessageModel.sort.mockResolvedValueOnce([]);

      const result = await service.findBetweenUsers('userX', 'userY');

      expect(result).toEqual([]);
    });
  });
});
