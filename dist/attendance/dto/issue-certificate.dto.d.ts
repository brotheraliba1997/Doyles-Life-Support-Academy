export declare class IssueCertificateDto {
    recordId: string;
    certificateUrl: string;
    certificateId?: string;
}
export declare class BulkIssueCertificatesDto {
    courseId: string;
    sessionId: string;
    certificates: Array<{
        recordId: string;
        certificateUrl: string;
        certificateId?: string;
    }>;
}
