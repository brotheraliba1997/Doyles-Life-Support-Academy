import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type AssigmentDocument = HydratedDocument<AssignmentSchemaClass>;
export declare class AssignmentSchemaClass extends EntityDocumentHelper {
    classScheduleId: Types.ObjectId;
    courseId: Types.ObjectId;
    sessionId: Types.ObjectId;
    student: Types.ObjectId;
    markedBy: Types.ObjectId;
    marks: number;
    certificateUrl?: string;
}
export declare const AssigmentSchema: import("mongoose").Schema<AssignmentSchemaClass, import("mongoose").Model<AssignmentSchemaClass, any, any, any, import("mongoose").Document<unknown, any, AssignmentSchemaClass, any, {}> & AssignmentSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AssignmentSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AssignmentSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AssignmentSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
