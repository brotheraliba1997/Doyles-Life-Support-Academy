export declare class CreatePaymentDto {
    courseId: string;
    userId: string;
    BookingId?: string;
    amount?: number;
    currency?: string;
    metadata?: Record<string, any>;
}
