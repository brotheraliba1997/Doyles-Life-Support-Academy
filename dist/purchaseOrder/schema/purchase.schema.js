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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderSchema = exports.PurchaseOrderSchemaClass = exports.PurchaseOrderStatusEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const course_schema_1 = require("../../course/schema/course.schema");
const user_schema_1 = require("../../users/schema/user.schema");
const swagger_1 = require("@nestjs/swagger");
var PurchaseOrderStatusEnum;
(function (PurchaseOrderStatusEnum) {
    PurchaseOrderStatusEnum["PENDING"] = "pending";
    PurchaseOrderStatusEnum["APPROVED"] = "approved";
    PurchaseOrderStatusEnum["REJECTED"] = "rejected";
    PurchaseOrderStatusEnum["NEEDS_INFO"] = "needs_info";
})(PurchaseOrderStatusEnum || (exports.PurchaseOrderStatusEnum = PurchaseOrderStatusEnum = {}));
let PurchaseOrderSchemaClass = class PurchaseOrderSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.PurchaseOrderSchemaClass = PurchaseOrderSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], PurchaseOrderSchemaClass.prototype, "poNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrderSchemaClass.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: course_schema_1.CourseSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrderSchemaClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrderSchemaClass.prototype, "financialContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PurchaseOrderSchemaClass.prototype, "bankSlipUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(PurchaseOrderStatusEnum),
        default: PurchaseOrderStatusEnum.PENDING,
        index: true,
    }),
    __metadata("design:type", String)
], PurchaseOrderSchemaClass.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Booking',
        sparse: true,
    }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], PurchaseOrderSchemaClass.prototype, "BookingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date(), index: true }),
    __metadata("design:type", Date)
], PurchaseOrderSchemaClass.prototype, "submittedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrderSchemaClass.prototype, "reviewedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PurchaseOrderSchemaClass.prototype, "reviewedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], PurchaseOrderSchemaClass.prototype, "decisionNotes", void 0);
exports.PurchaseOrderSchemaClass = PurchaseOrderSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], PurchaseOrderSchemaClass);
exports.PurchaseOrderSchema = mongoose_1.SchemaFactory.createForClass(PurchaseOrderSchemaClass);
exports.PurchaseOrderSchema.index({ poNumber: 1 }, { unique: true });
exports.PurchaseOrderSchema.index({ status: 1, submittedAt: -1 });
//# sourceMappingURL=purchase.schema.js.map