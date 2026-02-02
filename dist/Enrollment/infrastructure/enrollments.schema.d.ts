import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type EnrollmentSchemaDocument = HydratedDocument<EnrollmentSchemaClass>;
export declare class EnrollmentSchemaClass extends EntityDocumentHelper {
    user: Types.ObjectId;
    course: Types.ObjectId;
    payment?: Types.ObjectId;
    progress: number;
    status: string;
    completionDate?: Date;
    certificate?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export declare const EnrollmentSchema: import("mongoose").Schema<EnrollmentSchemaClass, import("mongoose").Model<EnrollmentSchemaClass, any, any, any, import("mongoose").Document<unknown, any, EnrollmentSchemaClass, any, {}> & EnrollmentSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EnrollmentSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<EnrollmentSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EnrollmentSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
