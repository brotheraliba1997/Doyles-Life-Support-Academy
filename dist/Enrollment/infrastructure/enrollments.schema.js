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
exports.EnrollmentSchema = exports.EnrollmentSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const user_schema_1 = require("../../users/schema/user.schema");
const course_schema_1 = require("../../course/schema/course.schema");
const certificate_schema_1 = require("../../certificate/schema/certificate.schema");
const payment_schema_1 = require("../../payment/schema/payment.schema");
let EnrollmentSchemaClass = class EnrollmentSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.EnrollmentSchemaClass = EnrollmentSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.UserSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EnrollmentSchemaClass.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: course_schema_1.CourseSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EnrollmentSchemaClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: payment_schema_1.Payment.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EnrollmentSchemaClass.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 100 }),
    __metadata("design:type", Number)
], EnrollmentSchemaClass.prototype, "progress", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], EnrollmentSchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], EnrollmentSchemaClass.prototype, "completionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: certificate_schema_1.CertificateSchemaClass.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EnrollmentSchemaClass.prototype, "certificate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], EnrollmentSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], EnrollmentSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EnrollmentSchemaClass.prototype, "deletedAt", void 0);
exports.EnrollmentSchemaClass = EnrollmentSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], EnrollmentSchemaClass);
exports.EnrollmentSchema = mongoose_1.SchemaFactory.createForClass(EnrollmentSchemaClass);
exports.EnrollmentSchema.index({ user: 1 });
exports.EnrollmentSchema.index({ course: 1 });
exports.EnrollmentSchema.index({ status: 1 });
exports.EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
//# sourceMappingURL=enrollments.schema.js.map