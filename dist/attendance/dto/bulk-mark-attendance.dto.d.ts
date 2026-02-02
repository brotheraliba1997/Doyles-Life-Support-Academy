import { AttendanceStatusEnum } from '../schema/attendance.schema';
export declare class StudentAttendanceDto {
    studentId: string;
    status: AttendanceStatusEnum;
}
export declare class BulkMarkAttendanceDto {
    classScheduleId: string;
    courseId: string;
    sessionId: string;
    startDate: string;
    startTime: string;
    markedBy: string;
    students: StudentAttendanceDto[];
}
