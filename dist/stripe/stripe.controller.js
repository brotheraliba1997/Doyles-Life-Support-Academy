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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stripe_service_1 = require("./stripe.service");
const create_payment_intent_dto_1 = require("./dto/create-payment-intent.dto");
const create_checkout_session_dto_1 = require("./dto/create-checkout-session.dto");
const create_payment_method_dto_1 = require("./dto/create-payment-method.dto");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createPaymentIntent(dto) {
        return this.stripeService.createPaymentIntent(dto);
    }
    async createCheckoutSession(dto) {
        const courseName = `Course ${dto.courseId}`;
        const coursePrice = dto.priceInCents ? dto.priceInCents / 100 : 99.99;
        return this.stripeService.createCheckoutSession(dto, courseName, coursePrice);
    }
    async getPaymentIntent(id) {
        return this.stripeService.getPaymentIntent(id);
    }
    async getCheckoutSession(id) {
        return this.stripeService.getCheckoutSession(id);
    }
    async cancelPaymentIntent(id) {
        return this.stripeService.cancelPaymentIntent(id);
    }
    async createRefund(body) {
        return this.stripeService.createRefund(body.paymentIntentId, body.amount);
    }
    async listPaymentIntents(limit, startingAfter) {
        return this.stripeService.listPaymentIntents(limit, startingAfter);
    }
    async createCustomer(body) {
        return this.stripeService.createCustomer(body.email, body.name, body.metadata);
    }
    async getCustomer(id) {
        return this.stripeService.getCustomer(id);
    }
    async handleWebhook(signature, request) {
        if (!signature) {
            throw new common_1.BadRequestException('Missing stripe-signature header');
        }
        const rawBody = request.rawBody;
        if (!rawBody) {
            throw new common_1.BadRequestException('Missing request body');
        }
        try {
            const event = this.stripeService.verifyWebhookSignature(rawBody, signature);
            switch (event.type) {
                case 'payment_intent.succeeded':
                    console.log('PaymentIntent succeeded:', event.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    console.log('PaymentIntent failed:', event.data.object);
                    break;
                case 'checkout.session.completed':
                    console.log('Checkout session completed:', event.data.object);
                    break;
                case 'charge.refunded':
                    console.log('Charge refunded:', event.data.object);
                    break;
                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }
            return { received: true, eventType: event.type };
        }
        catch (error) {
            console.error('Webhook error:', error.message);
            throw new common_1.BadRequestException(`Webhook Error: ${error.message}`);
        }
    }
    async createPaymentMethod(dto) {
        return this.stripeService.createPaymentMethod(dto);
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)('payment-intent'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a payment intent' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment intent created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_intent_dto_1.CreatePaymentIntentDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('checkout-session'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a checkout session' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Checkout session created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkout_session_dto_1.CreateCheckoutSessionDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
__decorate([
    (0, common_1.Get)('payment-intent/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment intent details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payment Intent ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment intent retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getPaymentIntent", null);
__decorate([
    (0, common_1.Get)('checkout-session/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checkout session details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Checkout Session ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Checkout session retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getCheckoutSession", null);
__decorate([
    (0, common_1.Post)('payment-intent/:id/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a payment intent' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payment Intent ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment intent cancelled successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "cancelPaymentIntent", null);
__decorate([
    (0, common_1.Post)('refund'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a refund' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Refund created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createRefund", null);
__decorate([
    (0, common_1.Get)('payment-intents'),
    (0, swagger_1.ApiOperation)({ summary: 'List payment intents' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment intents retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('startingAfter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "listPaymentIntents", null);
__decorate([
    (0, common_1.Post)('customer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Stripe customer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Handle Stripe webhooks' }),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Post)('create-payment-method'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a payment method',
        description: 'Creates a payment method (card) for future use. This tokenizes the card details without charging it.',
    }),
    (0, swagger_1.ApiBody)({ type: create_payment_method_dto_1.CreatePaymentMethodDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment method created successfully',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'pm_1234567890',
                    description: 'Payment method ID',
                },
                type: {
                    type: 'string',
                    example: 'card',
                },
                card: {
                    type: 'object',
                    properties: {
                        brand: { type: 'string', example: 'visa' },
                        last4: { type: 'string', example: '4242' },
                        expMonth: { type: 'number', example: 12 },
                        expYear: { type: 'number', example: 2026 },
                    },
                },
                billingDetails: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid card details or validation error',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_method_dto_1.CreatePaymentMethodDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPaymentMethod", null);
exports.StripeController = StripeController = __decorate([
    (0, swagger_1.ApiTags)('Stripe Payments'),
    (0, common_1.Controller)({ path: 'stripe', version: '1' }),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map