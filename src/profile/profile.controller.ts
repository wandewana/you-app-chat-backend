import {
  Controller,
  UseGuards,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('createProfile')
  createProfile(@Body() dto: CreateProfileDto, @Request() req) {
    return this.profileService.upsert(req.user.userId, dto);
  }

  @Put('updateProfile')
  updateProfile(@Body() dto: CreateProfileDto, @Request() req) {
    return this.profileService.upsert(req.user.userId, dto);
  }

  @Get('getProfile')
  getProfile(@Request() req) {
    return this.profileService.findByUserId(req.user.userId);
  }

  @Delete('deleteProfile')
  deleteProfile(@Request() req) {
    return this.profileService.deleteByUserId(req.user.userId);
  }
}
