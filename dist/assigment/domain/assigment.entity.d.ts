import { Types } from 'mongoose';
import { User } from '../../users/domain/user';
export declare class AssigmentEntity {
    id?: string | Types.ObjectId;
    classScheduleId: string | Types.ObjectId | any;
    courseId: string | Types.ObjectId | any;
    sessionId: string | Types.ObjectId;
    student: string | Types.ObjectId | User;
    markedBy: string | Types.ObjectId | User;
    marks: number;
    notes?: string;
    certificateUrl?: string;
    timeBlockIndex: number;
    createdAt: Date;
    updatedAt: Date;
}
