import { Types } from 'mongoose';
import { User } from '../../users/domain/user';
export declare class AssignmentPassFailRecordEntity {
    id?: string | Types.ObjectId;
    studentId: string | Types.ObjectId | User;
    courseId: string | Types.ObjectId | any;
    sessionId: string | Types.ObjectId;
    classScheduleId?: string | Types.ObjectId | any;
    totalClasses: number;
    presentCount: number;
    absentCount: number;
    attendancePercentage: number;
    isApproved: boolean;
    approvedBy?: string | Types.ObjectId | User;
    approvedAt?: Date;
    certificateIssued: boolean;
    certificateId?: string | Types.ObjectId;
    certificateUrl?: string;
    notes?: string;
    determinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
