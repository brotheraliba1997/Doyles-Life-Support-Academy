export declare class ApprovePassFailDto {
    recordId: string;
    approve: boolean;
    notes?: string;
    certificateUrl?: string;
    pdfFileName?: string;
    operatorId?: string;
}
export declare class GetPassFailRecordsDto {
    courseId: string;
    sessionId: string;
    status?: 'PASS' | 'FAIL';
    isApproved?: boolean;
    certificateIssued?: boolean;
}
