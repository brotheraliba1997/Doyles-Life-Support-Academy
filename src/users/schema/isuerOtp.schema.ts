import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';

export type UserOtpSchemaDocument = HydratedDocument<UserOtpSchemaClass>;

export enum UserOtpType {
  FORGOT_PASSWORD = 'forgot_password',
  EMAIL_VERIFICATION = 'email_verification',
  RESET_PASSWORD = 'reset_password',
  REGISTER = 'register',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userotps',
})
export class UserOtpSchemaClass extends EntityDocumentHelper {
  @Prop({ 
    type: Types.ObjectId, 
    ref: 'UserSchemaClass', 
    required: true,
    index: true 
  })
  userId: Types.ObjectId;

  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ 
    type: String, 
    enum: UserOtpType, 
    default: UserOtpType.EMAIL_VERIFICATION 
  })
  type: UserOtpType;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  isUsed: boolean;

  @Prop({ type: Date, default: null })
  usedAt?: Date | null;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserOtpSchema = SchemaFactory.createForClass(UserOtpSchemaClass);

// Indexes for faster queries
UserOtpSchema.index({ userId: 1, type: 1 });
UserOtpSchema.index({ userId: 1, code: 1 });
UserOtpSchema.index({ email: 1, type: 1 });
UserOtpSchema.index({ code: 1 });
UserOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 
UserOtpSchema.index({ userId: 1, isUsed: 1 });
