import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type OtpSchemaDocument = HydratedDocument<OtpSchemaClass>;
export declare enum OtpType {
    FORGOT_PASSWORD = "forgot_password",
    EMAIL_VERIFICATION = "email_verification",
    RESET_PASSWORD = "reset_password"
}
export declare class OtpSchemaClass extends EntityDocumentHelper {
    code: string;
    email: string;
    userId?: string | number;
    type: OtpType;
    expiresAt: Date;
    isUsed: boolean;
    usedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const OtpSchema: import("mongoose").Schema<OtpSchemaClass, import("mongoose").Model<OtpSchemaClass, any, any, any, import("mongoose").Document<unknown, any, OtpSchemaClass, any, {}> & OtpSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OtpSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OtpSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<OtpSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
