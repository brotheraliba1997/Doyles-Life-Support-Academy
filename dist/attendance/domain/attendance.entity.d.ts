import { Types } from 'mongoose';
import { User } from '../../users/domain/user';
import { AttendanceStatusEnum } from '../schema/attendance.schema';
export declare class AttendanceEntity {
    id?: string | Types.ObjectId;
    classScheduleId: string | Types.ObjectId | any;
    courseId: string | Types.ObjectId | any;
    sessionId: string | Types.ObjectId;
    student: string | Types.ObjectId | User;
    markedBy: string | Types.ObjectId | User;
    status: AttendanceStatusEnum;
    notes?: string;
    markedAt: Date;
    certificateUrl?: string;
    timeBlockIndex: number;
    createdAt: Date;
    updatedAt: Date;
}
