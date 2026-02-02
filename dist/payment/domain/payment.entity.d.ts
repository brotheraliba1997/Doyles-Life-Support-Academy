import { PaymentStatus, PaymentMethod } from '../schema/payment.schema';
export declare class PaymentEntity {
    id: string;
    userId: string;
    courseId: string;
    enrollment?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    stripePaymentIntentId?: string;
    stripeCustomerId?: string;
    purchaseOrderId?: string;
    BookingId?: string;
    stripeChargeId?: string;
    receiptUrl?: string;
    description?: string;
    metadata?: Record<string, any>;
    failureReason?: string;
    refundedAmount?: number;
    refundedAt?: Date;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
