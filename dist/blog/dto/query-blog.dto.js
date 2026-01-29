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
exports.SortBlogDto = exports.FilterBlogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FilterBlogDto {
}
exports.FilterBlogDto = FilterBlogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '671018fabc123456789ef012' }),
    __metadata("design:type", String)
], FilterBlogDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], FilterBlogDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Blog Title' }),
    __metadata("design:type", String)
], FilterBlogDto.prototype, "title", void 0);
class SortBlogDto {
}
exports.SortBlogDto = SortBlogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'createdAt' }),
    __metadata("design:type", String)
], SortBlogDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DESC', enum: ['ASC', 'DESC'] }),
    __metadata("design:type", String)
], SortBlogDto.prototype, "order", void 0);
//# sourceMappingURL=query-blog.dto.js.map