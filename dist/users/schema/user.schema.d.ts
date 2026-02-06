import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
import { StatusSchema } from '../../statuses/infrastructure/persistence/document/entities/status.schema';
import { RoleSchema } from '../../roles/infrastructure/persistence/document/entities/role.schema';
import { FileSchemaClass } from '../../files/schema/file.schema';
export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;
export declare class UserSchemaClass extends EntityDocumentHelper {
    email: string | null;
    password?: string;
    provider: string;
    isEmailVerified: boolean;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName?: string | null;
    photo?: FileSchemaClass | null;
    role?: RoleSchema | null;
    status?: StatusSchema;
    company?: string;
    jobTitle?: string;
    emailAddress?: string;
    phoneNumber?: number;
    countryCode?: string;
    isoCode?: string;
    dob?: Date;
    gender?: string;
    address?: string;
    lat?: number;
    long?: number;
    emergencyContactName?: string;
    emergencyRelation?: string;
    emergencyCountryCode?: string;
    emergencyIsoCode?: string;
    emergencyPhoneNumber?: string;
    industry?: string;
    country?: string;
    currency?: string;
    deviceToken?: string;
    deviceType?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
    isActive: boolean;
    isUserVerified: boolean;
    isCompanyVerified: boolean;
}
export declare const UserSchema: import("mongoose").Schema<UserSchemaClass, import("mongoose").Model<UserSchemaClass, any, any, any, import("mongoose").Document<unknown, any, UserSchemaClass, any, {}> & UserSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
