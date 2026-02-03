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
exports.OtpSchema = exports.OtpSchemaClass = exports.OtpType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
var OtpType;
(function (OtpType) {
    OtpType["FORGOT_PASSWORD"] = "forgot_password";
    OtpType["EMAIL_VERIFICATION"] = "email_verification";
    OtpType["RESET_PASSWORD"] = "reset_password";
})(OtpType || (exports.OtpType = OtpType = {}));
let OtpSchemaClass = class OtpSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.OtpSchemaClass = OtpSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], OtpSchemaClass.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], OtpSchemaClass.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'UserSchemaClass' }),
    __metadata("design:type", Object)
], OtpSchemaClass.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: OtpType,
        default: OtpType.FORGOT_PASSWORD
    }),
    __metadata("design:type", String)
], OtpSchemaClass.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], OtpSchemaClass.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], OtpSchemaClass.prototype, "isUsed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], OtpSchemaClass.prototype, "usedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], OtpSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], OtpSchemaClass.prototype, "updatedAt", void 0);
exports.OtpSchemaClass = OtpSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], OtpSchemaClass);
exports.OtpSchema = mongoose_1.SchemaFactory.createForClass(OtpSchemaClass);
exports.OtpSchema.index({ email: 1, type: 1 });
exports.OtpSchema.index({ code: 1 });
exports.OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
//# sourceMappingURL=otp.schema.js.map