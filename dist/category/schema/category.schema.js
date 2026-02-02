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
exports.CategorySchema = exports.CategorySchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
let CategorySchemaClass = class CategorySchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.CategorySchemaClass = CategorySchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true, index: true }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true, index: true }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CategorySchemaClass.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], index: true }),
    __metadata("design:type", Array)
], CategorySchemaClass.prototype, "subcategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CategorySchemaClass.prototype, "courseCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CategorySchemaClass.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true, index: true }),
    __metadata("design:type", Boolean)
], CategorySchemaClass.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CategorySchemaClass.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], CategorySchemaClass.prototype, "deletedAt", void 0);
exports.CategorySchemaClass = CategorySchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], CategorySchemaClass);
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(CategorySchemaClass);
exports.CategorySchema.index({ name: 1, isActive: 1 });
exports.CategorySchema.index({ slug: 1, isActive: 1 });
exports.CategorySchema.index({ isFeatured: 1, isActive: 1 });
exports.CategorySchema.index({ order: 1 });
exports.CategorySchema.index({ name: 'text', description: 'text' });
//# sourceMappingURL=category.schema.js.map