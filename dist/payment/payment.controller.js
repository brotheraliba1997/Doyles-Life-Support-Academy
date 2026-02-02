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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_service_1 = require("./payment.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const create_checkout_dto_1 = require("./dto/create-checkout.dto");
const refund_payment_dto_1 = require("./dto/refund-payment.dto");
const payment_schema_1 = require("./schema/payment.schema");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(createPaymentDto) {
        const userId = createPaymentDto.userId;
        if (!userId) {
            throw new common_1.NotFoundException('User ID is required');
        }
        return this.paymentService.createPayment(userId, createPaymentDto);
    }
    async createCheckout(createCheckoutDto, req) {
        const userId = req.user?.id || createCheckoutDto.courseId;
        return this.paymentService.createCheckout(userId, createCheckoutDto);
    }
    async refundPayment(refundDto) {
        return this.paymentService.refundPayment(refundDto);
    }
    async confirmPayment(body) {
        const { paymentIntentId } = body;
        if (!paymentIntentId) {
            throw new common_1.NotFoundException('PaymentIntentId is required');
        }
        return this.paymentService.confirmPayment(paymentIntentId);
    }
    async getPayment(id) {
        return this.paymentService.getPayment(id);
    }
    async getUserPayments(userId, page = 1, limit = 10) {
        return this.paymentService.getUserPayments(userId, page, limit);
    }
    async getCoursePayments(courseId, page = 1, limit = 10) {
        return this.paymentService.getCoursePayments(courseId, page, limit);
    }
    findByUserAndCourse(userId, courseId) {
        return this.paymentService.findByUserAndCourse(userId, courseId);
    }
    async getAllPayments(page = 1, limit = 10, status) {
        return this.paymentService.getAllPayments(page, limit, status);
    }
    async getPaymentStats() {
        return this.paymentService.getPaymentStats();
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a payment intent for a course' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment intent created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course or user not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)('create-checkout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Create a checkout session for a course' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Checkout session created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course or user not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkout_dto_1.CreateCheckoutDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Post)('refund'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refund a payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment refunded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_payment_dto_1.RefundPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "refundPayment", null);
__decorate([
    (0, common_1.Post)('confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Confirm payment and send course materials',
        description: 'Confirm a payment by PaymentIntent ID. This will update payment status, send confirmation email to student with course materials link, and return course materials in response.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment confirmed successfully with course materials',
        schema: {
            example: {
                success: true,
                message: 'Payment confirmed',
                payment: {
                    id: '675f4aaf2b67a23d4c9f2941',
                    status: 'succeeded',
                    amount: 99.99,
                    currency: 'USD',
                    paidAt: '2025-11-19T12:00:00.000Z',
                },
                course: {
                    id: '675f4aaf2b67a23d4c9f2942',
                    title: 'Full Stack Web Development',
                    slug: 'full-stack-web-development',
                },
                courseMaterialLink: 'https://frontend.com/courses/full-stack-web-development/materials',
                courseMaterials: [
                    {
                        name: 'Session 1 - Full Week',
                        type: 'Session',
                        link: 'https://frontend.com/courses/full-stack-web-development/materials#session-1',
                    },
                    {
                        name: 'Session 2 - Split Week',
                        type: 'Session',
                        link: 'https://frontend.com/courses/full-stack-web-development/materials#session-2',
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['paymentIntentId'],
            properties: {
                paymentIntentId: {
                    type: 'string',
                    description: 'Stripe PaymentIntent ID (e.g., pi_xxx)',
                    example: 'pi_3QxYz1234567890abcdef',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "confirmPayment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user payment history' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User payments retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getUserPayments", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get course payments (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Course payments retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getCoursePayments", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get purchase order by User and Course',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'User MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'courseId',
        description: 'Course MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Purchase order details',
    }),
    (0, common_1.Get)('UserAndCourse/:userId/course/:courseId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findByUserAndCourse", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: payment_schema_1.PaymentStatus }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payments retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics (admin)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment stats retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentStats", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.Controller)('v1/payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map