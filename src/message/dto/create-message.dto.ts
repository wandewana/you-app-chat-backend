import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  sender: string;

  @IsMongoId()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
