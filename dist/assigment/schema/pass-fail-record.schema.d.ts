import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type PassFailRecordDocument = HydratedDocument<AssigmentPassFailRecordSchemaClass>;
export declare enum PassFailStatusEnum {
    PASS = "PASS",
    FAIL = "FAIL"
}
export declare class AssigmentPassFailRecordSchemaClass extends EntityDocumentHelper {
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
export declare const PassFailRecordSchema: import("mongoose").Schema<AssigmentPassFailRecordSchemaClass, import("mongoose").Model<AssigmentPassFailRecordSchemaClass, any, any, any, import("mongoose").Document<unknown, any, AssigmentPassFailRecordSchemaClass, any, {}> & AssigmentPassFailRecordSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AssigmentPassFailRecordSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AssigmentPassFailRecordSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AssigmentPassFailRecordSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
