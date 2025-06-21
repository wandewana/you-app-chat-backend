import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async upsert(userId: string, data: { zodiac: string; horoscope: string }) {
    return this.profileModel.findOneAndUpdate(
      { user: userId },
      { ...data, user: userId },
      { upsert: true, new: true },
    );
  }

  async findByUserId(userId: string) {
    return this.profileModel.findOne({ user: userId });
  }
}
