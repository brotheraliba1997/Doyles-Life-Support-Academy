import { AttendanceStatusEnum } from '../schema/attendance.schema';
export declare class FilterAttendanceDto {
    classScheduleId?: string;
    courseId?: string;
    sessionId?: string;
    studentId?: string;
    markedBy?: string;
    status?: AttendanceStatusEnum;
}
export declare class SortAttendanceDto {
    sortBy?: 'asc' | 'desc';
}
