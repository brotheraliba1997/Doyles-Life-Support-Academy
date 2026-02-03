import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';

export type OtpSchemaDocument = HydratedDocument<OtpSchemaClass>;

export enum OtpType {
  FORGOT_PASSWORD = 'forgot_password',
  EMAIL_VERIFICATION = 'email_verification',
  RESET_PASSWORD = 'reset_password',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class OtpSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ type: String, ref: 'UserSchemaClass' })
  userId?: string | number;

  @Prop({ 
    type: String, 
    enum: OtpType, 
    default: OtpType.FORGOT_PASSWORD 
  })
  type: OtpType;

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

export const OtpSchema = SchemaFactory.createForClass(OtpSchemaClass);

// Indexes for faster queries
OtpSchema.index({ email: 1, type: 1 });
OtpSchema.index({ code: 1 });
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired OTPs
