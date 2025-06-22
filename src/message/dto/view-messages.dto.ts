import { IsMongoId } from 'class-validator';

export class ViewMessagesDto {
  @IsMongoId()
  userId: string; // The other participant in the chat
}
