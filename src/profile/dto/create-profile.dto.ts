import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  zodiac: string;

  @IsString()
  horoscope: string;
}
