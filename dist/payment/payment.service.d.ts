import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentDocument, PaymentStatus } from './schema/payment.schema';
import { StripeService } from '../stripe/stripe.service';
import { MailService } from '../mail/mail.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
import { AllConfigType } from '../config/config.type';
import { EnrollmentSchemaClass } from '../Enrollment/infrastructure/enrollments.schema';
import { ClassScheduleHelperService } from '../utils/class-schedule/class-schedule-helper.service';
import { CourseSchemaClass } from '../course/schema/course.schema';
import { UserSchemaClass } from '../users/schema/user.schema';
import { BookingDocument } from '../booking/schema/booking.schema';
export declare class PaymentService {
    private paymentModel;
    private courseModel;
    private readonly userModel;
    private bookingModel;
    private enrollmentModel;
    private stripeService;
    private mailService;
    private configService;
    private readonly classScheduleHelper;
    private readonly logger;
    constructor(paymentModel: Model<PaymentDocument>, courseModel: Model<CourseSchemaClass>, userModel: Model<UserSchemaClass>, bookingModel: Model<BookingDocument>, enrollmentModel: Model<EnrollmentSchemaClass>, stripeService: StripeService, mailService: MailService, configService: ConfigService<AllConfigType>, classScheduleHelper: ClassScheduleHelperService);
    createPayment(userId: string, createPaymentDto: CreatePaymentDto): Promise<{
        statusCode: number;
        message: string;
        error: string;
        payment?: undefined;
        clientSecret?: undefined;
        paymentIntentId?: undefined;
    } | {
        payment: Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    confirmPayment(paymentIntentId: string): Promise<{
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
    createCheckout(userId: string, createCheckoutDto: CreateCheckoutDto): Promise<{
        payment: Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        sessionId: string;
        url: string;
    }>;
    handlePaymentSuccess(paymentIntentId: string): Promise<void>;
    handlePaymentFailed(paymentIntentId: string, reason?: string): Promise<void>;
    refundPayment(refundDto: RefundPaymentDto): Promise<{
        payment: Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    getPayment(paymentId: string): Promise<import("mongoose").Document<unknown, {}, PaymentDocument, {}, {}> & Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUserAndCourse(userId: string, courseId: string): Promise<import("mongoose").Document<unknown, {}, PaymentDocument, {}, {}> & Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserPayments(userId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<PaymentDocument> & Required<{
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
        data: (import("mongoose").FlattenMaps<PaymentDocument> & Required<{
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
    getAllPayments(page?: number, limit?: number, status?: PaymentStatus): Promise<{
        data: (import("mongoose").FlattenMaps<PaymentDocument> & Required<{
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
    createPaymentFromPurchaseOrder(purchaseOrderId: string, userId: string, courseId: string, amount: number, currency?: string): Promise<{
        payment: Payment & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        enrollment: EnrollmentSchemaClass & Required<{
            _id: string;
        }> & {
            __v: number;
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
