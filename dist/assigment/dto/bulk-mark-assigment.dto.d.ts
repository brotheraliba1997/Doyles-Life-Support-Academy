export declare class StudentAssignmentDto {
    studentId: string;
    marks?: number;
}
export declare class BulkMarkAssignmentDto {
    classScheduleId: string;
    courseId: string;
    sessionId: string;
    markedBy: string;
    students: StudentAssignmentDto[];
}
