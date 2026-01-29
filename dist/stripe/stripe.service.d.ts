import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { AllConfigType } from '../config/config.type';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService<AllConfigType>);
    createPaymentIntent(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        amount: number;
        currency: string;
        status: Stripe.PaymentIntent.Status;
    }>;
    createCheckoutSession(dto: CreateCheckoutSessionDto, courseName: string, coursePrice: number): Promise<{
        sessionId: string;
        url: string;
    }>;
    getPaymentIntent(paymentIntentId: string): Promise<{
        id: string;
        amount: number;
        currency: string;
        status: Stripe.PaymentIntent.Status;
        metadata: Stripe.Metadata;
        created: number;
    }>;
    getCheckoutSession(sessionId: string): Promise<{
        id: string;
        paymentStatus: Stripe.Checkout.Session.PaymentStatus;
        amount: number;
        currency: string;
        metadata: Stripe.Metadata;
        customer: string | Stripe.Customer | Stripe.DeletedCustomer;
    }>;
    cancelPaymentIntent(paymentIntentId: string): Promise<{
        id: string;
        status: Stripe.PaymentIntent.Status;
    }>;
    createRefund(paymentIntentId: string, amount?: number): Promise<{
        id: string;
        amount: number;
        status: string;
        paymentIntentId: string;
    }>;
    verifyWebhookSignature(payload: Buffer, signature: string): Stripe.Event;
    listPaymentIntents(limit?: number, startingAfter?: string): Promise<{
        data: {
            id: string;
            amount: number;
            currency: string;
            status: Stripe.PaymentIntent.Status;
            metadata: Stripe.Metadata;
            created: number;
        }[];
        hasMore: boolean;
    }>;
    createCustomer(email: string, name: string, metadata?: Record<string, string>): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    getCustomer(customerId: string): Promise<{
        id: string;
        email: string;
        name: string;
        metadata: Stripe.Metadata;
    }>;
    createPaymentMethod(dto: CreatePaymentMethodDto): Promise<{
        id: string;
        type: Stripe.PaymentMethod.Type;
        card: {
            brand: string;
            last4: string;
            expMonth: number;
            expYear: number;
        };
        billingDetails: {
            name: string;
        };
    }>;
}
