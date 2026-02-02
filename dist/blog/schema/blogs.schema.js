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
exports.BlogSchema = exports.BlogSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const user_schema_1 = require("../../users/schema/user.schema");
let BlogSchemaClass = class BlogSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.BlogSchemaClass = BlogSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], BlogSchemaClass.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], BlogSchemaClass.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BlogSchemaClass.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
    }),
    __metadata("design:type", Array)
], BlogSchemaClass.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], BlogSchemaClass.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], BlogSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], BlogSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BlogSchemaClass.prototype, "deletedAt", void 0);
exports.BlogSchemaClass = BlogSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_, ret) => {
                ret._id = ret._id.toString();
                delete ret._id;
            },
        },
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: (_, ret) => {
                ret._id = ret._id.toString();
                delete ret._id;
            },
        },
    })
], BlogSchemaClass);
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(BlogSchemaClass);
exports.BlogSchema.index({ author: 1 });
exports.BlogSchema.index({ isPublished: 1 });
exports.BlogSchema.index({ createdAt: -1 });
//# sourceMappingURL=blogs.schema.js.map