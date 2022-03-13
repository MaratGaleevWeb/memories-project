import { Model, ObjectId, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userSchema: Model<UserDocument>) {}

  async createUser({ firstName, lastName, ...rest }: CreateUserDto): Promise<UserDocument> {
    const name = firstName + ' ' + lastName;
    const newUser = await new this.userSchema({ name, ...rest }).save();
    return newUser;
  }

  async createUserWithGoogle(email: string, name: string): Promise<UserDocument> {
    const newUser = await new this.userSchema({ email, name, isRegisteredWithGoogle: true }).save();
    return newUser;
  }

  async getUserById(userId: ObjectId): Promise<UserDocument> {
    const user = await this.userSchema.findById(userId).exec();
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userSchema.findOne({ email }).exec();
    return user;
  }

  async getUserByRefreshToken(refreshToken: string): Promise<UserDocument> {
    const user = await this.userSchema.findOne({ refreshToken }).exec();
    return user;
  }

  async updateUserById(userId: ObjectId, update: UpdateQuery<UserDocument>): Promise<UserDocument> {
    const updatedUser = await this.userSchema
      .findOneAndUpdate({ _id: userId }, update, { new: true })
      .exec();
    return updatedUser;
  }

  async updateUserByRefreshToken(
    refreshToken: string,
    update: UpdateQuery<UserDocument>,
  ): Promise<UserDocument> {
    const updatedUser = await this.userSchema
      .findOneAndUpdate({ refreshToken }, update, { new: true })
      .exec();
    return updatedUser;
  }
}
