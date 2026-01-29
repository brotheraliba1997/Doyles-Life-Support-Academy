"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
let StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('stripe.apiKey', { infer: true });
        if (!apiKey) {
            throw new Error('Stripe API key is not configured');
        }
        this.stripe = new stripe_1.default(apiKey, {
            apiVersion: '2025-10-29.clover',
        });
    }
    async createPaymentIntent(dto) {
        const currency = dto.currency ||
            this.configService.get('stripe.currency', { infer: true }) ||
            'usd';
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: dto.amount,
            currency: currency,
            metadata: {
                courseId: dto.courseId,
                userId: dto.userId,
            },
            description: dto.description || `Course enrollment - ${dto.courseId}`,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
        };
    }
    async createCheckoutSession(dto, courseName, coursePrice) {
        const priceInCents = dto.priceInCents || Math.round(coursePrice * 100);
        const currency = this.configService.get('stripe.currency', { infer: true }) || 'usd';
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: courseName,
                            description: `Enrollment for ${courseName}`,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: dto.successUrl,
            cancel_url: dto.cancelUrl,
            metadata: {
                courseId: dto.courseId,
                userId: dto.userId,
            },
        });
        return {
            sessionId: session.id,
            url: session.url,
        };
    }
    async getPaymentIntent(paymentIntentId) {
        const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
        return {
            id: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            metadata: paymentIntent.metadata,
            created: paymentIntent.created,
        };
    }
    async getCheckoutSession(sessionId) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        return {
            id: session.id,
            paymentStatus: session.payment_status,
            amount: session.amount_total,
            currency: session.currency,
            metadata: session.metadata,
            customer: session.customer,
        };
    }
    async cancelPaymentIntent(paymentIntentId) {
        const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
        return {
            id: paymentIntent.id,
            status: paymentIntent.status,
        };
    }
    async createRefund(paymentIntentId, amount) {
        const refundData = {
            payment_intent: paymentIntentId,
        };
        if (amount) {
            refundData.amount = amount;
        }
        const refund = await this.stripe.refunds.create(refundData);
        return {
            id: refund.id,
            amount: refund.amount,
            status: refund.status,
            paymentIntentId: refund.payment_intent,
        };
    }
    verifyWebhookSignature(payload, signature) {
        const webhookSecret = this.configService.get('stripe.webhookSecret', {
            infer: true,
        });
        if (!webhookSecret) {
            throw new Error('Stripe webhook secret is not configured');
        }
        return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
    async listPaymentIntents(limit = 10, startingAfter) {
        const params = { limit };
        if (startingAfter) {
            params.starting_after = startingAfter;
        }
        const paymentIntents = await this.stripe.paymentIntents.list(params);
        return {
            data: paymentIntents.data.map((pi) => ({
                id: pi.id,
                amount: pi.amount,
                currency: pi.currency,
                status: pi.status,
                metadata: pi.metadata,
                created: pi.created,
            })),
            hasMore: paymentIntents.has_more,
        };
    }
    async createCustomer(email, name, metadata) {
        const customer = await this.stripe.customers.create({
            email,
            name,
            metadata,
        });
        return {
            id: customer.id,
            email: customer.email,
            name: customer.name,
        };
    }
    async getCustomer(customerId) {
        const customer = await this.stripe.customers.retrieve(customerId);
        if (customer.deleted) {
            throw new Error('Customer has been deleted');
        }
        return {
            id: customer.id,
            email: customer.email || null,
            name: customer.name || null,
            metadata: customer.metadata || {},
        };
    }
    async createPaymentMethod(dto) {
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: dto.cardNumber,
                exp_month: dto.expMonth,
                exp_year: dto.expYear,
                cvc: dto.cvc,
            },
            billing_details: {
                name: dto.cardholderName,
            },
        });
        return {
            id: paymentMethod.id,
            type: paymentMethod.type,
            card: {
                brand: paymentMethod.card?.brand,
                last4: paymentMethod.card?.last4,
                expMonth: paymentMethod.card?.exp_month,
                expYear: paymentMethod.card?.exp_year,
            },
            billingDetails: {
                name: paymentMethod.billing_details.name,
            },
        };
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map