export declare enum PassFailStatusEnum {
    PASS = "PASS",
    FAIL = "FAIL"
}
export declare class AssignmentCheckPassFailDto {
    classScheduleId?: string;
    courseId: string;
    sessionId: string;
    markedBy: string;
    issueCertificate?: boolean;
    marks: number;
    status: PassFailStatusEnum;
}
