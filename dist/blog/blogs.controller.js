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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const blog_1 = require("./domain/blog");
const infinity_pagination_response_dto_1 = require("../utils/dto/infinity-pagination-response.dto");
let BlogsController = class BlogsController {
    constructor(service) {
        this.service = service;
    }
    async create(createBlogDto) {
        return this.service.create(createBlogDto);
    }
    async findAll(query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const filterOptions = {};
        if (query?.authorId)
            filterOptions.authorId = query.authorId;
        if (query?.isPublished !== undefined)
            filterOptions.isPublished =
                query.isPublished === 'true' || query.isPublished === true;
        if (query?.title)
            filterOptions.title = query.title;
        const sortOptions = query?.sort || [
            { orderBy: 'createdAt', order: 'DESC' },
        ];
        return this.service.findAll({
            filterOptions,
            sortOptions,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
    async update(id, updateBlogDto) {
        return this.service.update(id, updateBlogDto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: blog_1.BlogEntity }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(blog_1.BlogEntity),
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'authorId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'isPublished', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: blog_1.BlogEntity }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: blog_1.BlogEntity }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "remove", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)({
        path: 'blogs',
        version: '1',
    }),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map