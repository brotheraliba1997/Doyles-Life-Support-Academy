import { AttendanceStatusEnum } from '../schema/attendance.schema';
export declare class CreateAttendanceDto {
    classScheduleId: string;
    courseId: string;
    sessionId: string;
    studentId: string;
    markedBy: string;
    startDate: string;
    startTime: string;
    status: AttendanceStatusEnum;
    notes?: string;
    pdfFileName?: string;
}
