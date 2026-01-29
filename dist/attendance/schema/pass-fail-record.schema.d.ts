import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type PassFailRecordDocument = HydratedDocument<PassFailRecordSchemaClass>;
export declare enum PassFailStatusEnum {
    PASS = "PASS",
    FAIL = "FAIL"
}
export declare class PassFailRecordSchemaClass extends EntityDocumentHelper {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    sessionId: Types.ObjectId;
    classScheduleId?: Types.ObjectId;
    status: PassFailStatusEnum;
    totalClasses: number;
    presentCount: number;
    absentCount: number;
    attendancePercentage: number;
    isApproved: boolean;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
    certificateIssued: boolean;
    certificateId?: Types.ObjectId;
    certificateUrl?: string;
    notes?: string;
    determinedAt: Date;
}
export declare const PassFailRecordSchema: import("mongoose").Schema<PassFailRecordSchemaClass, import("mongoose").Model<PassFailRecordSchemaClass, any, any, any, import("mongoose").Document<unknown, any, PassFailRecordSchemaClass, any, {}> & PassFailRecordSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PassFailRecordSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PassFailRecordSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PassFailRecordSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
