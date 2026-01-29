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
exports.PurchaseOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const purchase_services_1 = require("./purchase.services");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const update_purchase_dto_1 = require("./dto/update-purchase.dto");
const purchase_schema_1 = require("./schema/purchase.schema");
const purchase_order_entity_1 = require("./domain/purchase-order.entity");
let PurchaseOrderController = class PurchaseOrderController {
    constructor(purchaseOrderService) {
        this.purchaseOrderService = purchaseOrderService;
    }
    create(dto) {
        return this.purchaseOrderService.create(dto);
    }
    findAll(status, page, limit) {
        const paginationOptions = {
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        };
        return this.purchaseOrderService.findAll(status, paginationOptions);
    }
    findOne(id) {
        return this.purchaseOrderService.findOne(id);
    }
    findByUserAndCourse(userId, courseId) {
        return this.purchaseOrderService.findByUserAndCourse(userId, courseId);
    }
    update(id, dto) {
        return this.purchaseOrderService.update(id, dto);
    }
    remove(id) {
        return this.purchaseOrderService.remove(id);
    }
};
exports.PurchaseOrderController = PurchaseOrderController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create purchase order',
        description: 'Student/counselor submits a purchase order request with bank slip attachment info.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Purchase order created successfully',
        type: purchase_order_entity_1.PurchaseOrderEntity,
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.CreatePurchaseOrderDto]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'List purchase orders',
        description: 'Finance team can filter by status to prioritize pending approvals.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: purchase_schema_1.PurchaseOrderStatusEnum,
        description: 'Filter purchase orders by workflow status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Paginated list of purchase orders',
        type: [purchase_order_entity_1.PurchaseOrderEntity],
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get purchase order by ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Purchase order MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Purchase order details',
        type: purchase_order_entity_1.PurchaseOrderEntity,
    }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "findOne", null);
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
        type: purchase_order_entity_1.PurchaseOrderEntity,
    }),
    (0, common_1.Get)('UserAndCourse/:userId/course/:courseId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "findByUserAndCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update / review purchase order',
        description: 'Finance reviewers can approve/reject and add decision notes via this endpoint.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Purchase order MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Updated purchase order',
        type: purchase_order_entity_1.PurchaseOrderEntity,
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_dto_1.UpdatePurchaseOrderDto]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete purchase order',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Purchase order MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Purchase order deleted',
        schema: {
            example: { deleted: true },
        },
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseOrderController.prototype, "remove", null);
exports.PurchaseOrderController = PurchaseOrderController = __decorate([
    (0, swagger_1.ApiTags)('Purchase Orders'),
    (0, common_1.Controller)({
        path: 'purchase-orders',
        version: '1',
    }),
    __metadata("design:paramtypes", [purchase_services_1.PurchaseOrderService])
], PurchaseOrderController);
//# sourceMappingURL=purchase.controller.js.map