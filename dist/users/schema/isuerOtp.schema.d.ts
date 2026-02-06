import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type UserOtpSchemaDocument = HydratedDocument<UserOtpSchemaClass>;
export declare enum UserOtpType {
    FORGOT_PASSWORD = "forgot_password",
    EMAIL_VERIFICATION = "email_verification",
    RESET_PASSWORD = "reset_password",
    REGISTER = "register"
}
export declare class UserOtpSchemaClass extends EntityDocumentHelper {
    userId: Types.ObjectId;
    code: string;
    email: string;
    type: UserOtpType;
    expiresAt: Date;
    isUsed: boolean;
    usedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserOtpSchema: import("mongoose").Schema<UserOtpSchemaClass, import("mongoose").Model<UserOtpSchemaClass, any, any, any, import("mongoose").Document<unknown, any, UserOtpSchemaClass, any, {}> & UserOtpSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserOtpSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserOtpSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserOtpSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
