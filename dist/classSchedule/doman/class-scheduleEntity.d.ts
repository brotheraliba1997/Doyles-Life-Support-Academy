import { Types } from 'mongoose';
import { User } from '../../users/domain/user';
import { CourseEntity } from '../../course/domain/course';
export declare class ClassScheduleEntity {
    constructor(partial: Partial<ClassScheduleEntity>);
    id?: string | Types.ObjectId;
    course: string | Types.ObjectId | CourseEntity;
    instructor: string | Types.ObjectId | User;
    students: (string | Types.ObjectId | User)[];
    date: string;
    time: string;
    googleMeetLink: string;
    securityKey: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    progress: number;
    startedAt?: Date;
    endedAt?: Date;
    isCompleted?: boolean;
    ClassLeftList?: boolean[];
    attendedAt?: Date;
    certificateLink?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
