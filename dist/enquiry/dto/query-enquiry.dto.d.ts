export declare class FilterEnquiryDto {
    subject?: string;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    designation?: string;
    enquiryType?: string;
    scheme?: string;
    trainingCategory?: string;
    trainingType?: string;
    trainingDelivery?: string;
    organizationType?: string;
    language?: string;
    certificationsHeld?: string;
    delivery?: string;
    certifiedScope?: string;
    auditingDelivery?: string;
    industry?: string;
    search?: string;
}
export declare class SortEnquiryDto {
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}
export declare class QueryEnquiryDto {
    page?: number;
    limit?: number;
}
