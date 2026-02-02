import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type ClassScheduleSchemaDocument = HydratedDocument<ClassScheduleSchemaClass>;
export declare class ClassScheduleSchemaClass extends EntityDocumentHelper {
    course: Types.ObjectId;
    sessionId: string;
    students: Types.ObjectId[];
    date: string;
    time: string;
    duration: number;
    googleMeetLink?: string;
    securityKey?: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    progress: number;
    startedAt?: Date;
    endedAt?: Date;
    isCompleted?: boolean;
    ClassLeftList?: boolean[];
    googleCalendarEventLink?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
export declare const ClassScheduleSchema: import("mongoose").Schema<ClassScheduleSchemaClass, import("mongoose").Model<ClassScheduleSchemaClass, any, any, any, import("mongoose").Document<unknown, any, ClassScheduleSchemaClass, any, {}> & ClassScheduleSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClassScheduleSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ClassScheduleSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ClassScheduleSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
