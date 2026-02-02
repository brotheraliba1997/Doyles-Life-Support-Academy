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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_1 = require("./domain/blog");
const blogs_schema_1 = require("./schema/blogs.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
let BlogsService = class BlogsService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const id = typeof doc.id !== 'undefined' ? doc.id : doc._id?.toString?.();
        return new blog_1.BlogEntity(id, doc.title, doc.content, doc.author?.toString?.() ?? doc.author, doc.comments || [], doc.isPublished, doc.createdAt, doc.updatedAt, doc.deletedAt ?? null);
    }
    async create(createBlogDto) {
        const toCreate = {
            ...createBlogDto,
            isPublished: createBlogDto.isPublished ?? true,
        };
        const created = await this.blogModel.create(toCreate);
        return this.map(created);
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('author', filterOptions?.authorId)
            .addEqual('isPublished', filterOptions?.isPublished)
            .addTextSearch('title', filterOptions?.title)
            .build();
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.blogModel,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: [{ path: 'author', select: 'firstName lastName email' }],
            mapper: (doc) => this.map(doc),
        });
    }
    async findOne(id) {
        const doc = await this.blogModel
            .findById(id)
            .populate('author', 'firstName lastName email')
            .lean();
        return doc ? this.map(doc) : null;
    }
    async findByIds(ids) {
        const docs = await this.blogModel
            .find({ _id: { $in: ids } })
            .populate('author', 'firstName lastName email')
            .lean();
        return docs.map((doc) => this.map(doc));
    }
    async update(id, updateBlogDto) {
        const doc = await this.blogModel
            .findByIdAndUpdate(id, updateBlogDto, { new: true })
            .populate('author', 'firstName lastName email')
            .lean();
        return doc ? this.map(doc) : null;
    }
    async remove(id) {
        await this.blogModel.deleteOne({ _id: id });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blogs_schema_1.BlogSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map