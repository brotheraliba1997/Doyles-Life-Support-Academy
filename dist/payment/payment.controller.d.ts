import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
import { PaymentStatus } from './schema/payment.schema';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<{
        statusCode: number;
        message: string;
        error: string;
        payment?: undefined;
        clientSecret?: undefined;
        paymentIntentId?: undefined;
    } | {
        payment: import("./schema/payment.schema").Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        clientSecret: string;
        paymentIntentId: string;
        statusCode?: undefined;
        message?: undefined;
        error?: undefined;
    }>;
    createCheckout(createCheckoutDto: CreateCheckoutDto, req: any): Promise<{
        payment: import("./schema/payment.schema").Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        sessionId: string;
        url: string;
    }>;
    refundPayment(refundDto: RefundPaymentDto): Promise<{
        payment: import("./schema/payment.schema").Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        refund: {
            id: string;
            amount: number;
            status: string;
            paymentIntentId: string;
        };
    }>;
    confirmPayment(body: {
        paymentIntentId: string;
    }): Promise<{
        success: boolean;
        message: string;
        payment: {
            id: string;
            status: PaymentStatus.SUCCEEDED;
            amount: number;
            currency: string;
            paidAt: Date;
        };
        course: {
            id: any;
            title: any;
            slug: any;
        };
        courseMaterialLink: string;
        courseMaterials: {
            name: string;
            type: string;
            link?: string;
        }[];
    }>;
    getPayment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/payment.schema").PaymentDocument, {}, {}> & import("./schema/payment.schema").Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserPayments(userId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<import("./schema/payment.schema").PaymentDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getCoursePayments(courseId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<import("./schema/payment.schema").PaymentDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByUserAndCourse(userId: string, courseId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/payment.schema").PaymentDocument, {}, {}> & import("./schema/payment.schema").Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllPayments(page?: number, limit?: number, status?: PaymentStatus): Promise<{
        data: (import("mongoose").FlattenMaps<import("./schema/payment.schema").PaymentDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPaymentStats(): Promise<{
        totalRevenue: any;
        totalPayments: number;
        successfulPayments: number;
        failedPayments: number;
        successRate: string | number;
    }>;
}
