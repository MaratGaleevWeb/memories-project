import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: false, default: undefined })
  password?: string;

  @Prop({ type: String, default: undefined })
  accessToken?: string;

  @Prop({ type: String, default: undefined })
  refreshToken?: string;

  @Prop({ type: Boolean, default: false })
  isRegisteredWithGoogle: boolean;

  @Prop({ type: Boolean, default: false })
  isActivatedByLink: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
