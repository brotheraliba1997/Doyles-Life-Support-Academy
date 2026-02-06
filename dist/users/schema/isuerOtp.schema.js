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
exports.UserOtpSchema = exports.UserOtpSchemaClass = exports.UserOtpType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
var UserOtpType;
(function (UserOtpType) {
    UserOtpType["FORGOT_PASSWORD"] = "forgot_password";
    UserOtpType["EMAIL_VERIFICATION"] = "email_verification";
    UserOtpType["RESET_PASSWORD"] = "reset_password";
    UserOtpType["REGISTER"] = "register";
})(UserOtpType || (exports.UserOtpType = UserOtpType = {}));
let UserOtpSchemaClass = class UserOtpSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.UserOtpSchemaClass = UserOtpSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'UserSchemaClass',
        required: true,
        index: true
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserOtpSchemaClass.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], UserOtpSchemaClass.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], UserOtpSchemaClass.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: UserOtpType,
        default: UserOtpType.EMAIL_VERIFICATION
    }),
    __metadata("design:type", String)
], UserOtpSchemaClass.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], UserOtpSchemaClass.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], UserOtpSchemaClass.prototype, "isUsed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], UserOtpSchemaClass.prototype, "usedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], UserOtpSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], UserOtpSchemaClass.prototype, "updatedAt", void 0);
exports.UserOtpSchemaClass = UserOtpSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        collection: 'userotps',
    })
], UserOtpSchemaClass);
exports.UserOtpSchema = mongoose_1.SchemaFactory.createForClass(UserOtpSchemaClass);
exports.UserOtpSchema.index({ userId: 1, type: 1 });
exports.UserOtpSchema.index({ userId: 1, code: 1 });
exports.UserOtpSchema.index({ email: 1, type: 1 });
exports.UserOtpSchema.index({ code: 1 });
exports.UserOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.UserOtpSchema.index({ userId: 1, isUsed: 1 });
//# sourceMappingURL=isuerOtp.schema.js.map