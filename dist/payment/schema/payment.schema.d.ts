import { Document, Schema as MongooseSchema, Types } from 'mongoose';
export type PaymentDocument = Payment & Document;
export declare enum PaymentStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    STRIPE = "stripe",
    PAYPAL = "paypal",
    CREDIT_CARD = "credit_card",
    PURCHASE_ORDER = "purchase_order"
}
export declare class Payment {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    enrollment?: MongooseSchema.Types.ObjectId;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    stripePaymentIntentId?: string;
    stripeCustomerId?: string;
    purchaseOrderId?: MongooseSchema.Types.ObjectId;
    BookingId?: MongooseSchema.Types.ObjectId;
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
export declare const PaymentSchema: MongooseSchema<Payment, import("mongoose").Model<Payment, any, any, any, Document<unknown, any, Payment, any, {}> & Payment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
