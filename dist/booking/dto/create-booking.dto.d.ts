export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
}
export declare enum PaymentMethod {
    STRIPE = "stripe",
    PURCHASEORDER = "purchase_order"
}
export declare class CreateBookingDto {
    studentId: string;
    courseId: string;
    timeTableId: string;
    sessionId: string;
    paymentMethod?: PaymentMethod;
    status?: BookingStatus;
    notes?: string;
}
