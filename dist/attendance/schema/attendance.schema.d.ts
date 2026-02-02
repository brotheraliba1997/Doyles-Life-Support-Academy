import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type AttendanceDocument = HydratedDocument<AttendanceSchemaClass>;
export declare enum AttendanceStatusEnum {
    PRESENT = "present",
    ABSENT = "absent"
}
export declare class AttendanceSchemaClass extends EntityDocumentHelper {
    classScheduleId: Types.ObjectId;
    courseId: Types.ObjectId;
    sessionId: Types.ObjectId;
    student: Types.ObjectId;
    markedBy: Types.ObjectId;
    startDate: string;
    startTime: string;
    status: AttendanceStatusEnum;
    notes?: string;
    markedAt: Date;
    certificateUrl?: string;
}
export declare const AttendanceSchema: import("mongoose").Schema<AttendanceSchemaClass, import("mongoose").Model<AttendanceSchemaClass, any, any, any, import("mongoose").Document<unknown, any, AttendanceSchemaClass, any, {}> & AttendanceSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttendanceSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AttendanceSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AttendanceSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
