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
exports.CertificateSchema = exports.CertificateSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
let CertificateSchemaClass = class CertificateSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.CertificateSchemaClass = CertificateSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CertificateSchemaClass.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'Course',
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CertificateSchemaClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CertificateSchemaClass.prototype, "certificateUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], CertificateSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], CertificateSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], CertificateSchemaClass.prototype, "deletedAt", void 0);
exports.CertificateSchemaClass = CertificateSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], CertificateSchemaClass);
exports.CertificateSchema = mongoose_1.SchemaFactory.createForClass(CertificateSchemaClass);
exports.CertificateSchema.index({ user: 1 });
exports.CertificateSchema.index({ course: 1 });
exports.CertificateSchema.index({ createdAt: -1 });
//# sourceMappingURL=certificate.schema.js.map