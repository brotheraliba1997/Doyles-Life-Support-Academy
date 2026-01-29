export declare class CheckPassFailDto {
    classScheduleId?: string;
    courseId: string;
    sessionId: string;
    issueCertificates?: boolean;
}
export declare class CheckPassFailStudentDto {
    studentId?: string;
}
export declare class StudentPassFailResult {
    id: string;
    studentId: string;
    studentName: string;
    totalClasses: number;
    presentCount: number;
    percentage: number;
    absentCount: number;
    result: 'PASS' | 'FAIL';
    certificateIssued?: boolean;
    certificateId?: string;
}
export declare class PassFailSummary {
    classScheduleId: string;
    courseId: string;
    sessionId: string;
    totalStudents: number;
    passedStudents: number;
    failedStudents: number;
    results: StudentPassFailResult[];
}
