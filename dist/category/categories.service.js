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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./schema/category.schema");
const convert_id_1 = require("../utils/convert-id");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    async create(createCategoryDto) {
        const slug = createCategoryDto.slug || this.generateSlug(createCategoryDto.name);
        const existingCategory = await this.categoryModel.findOne({
            $or: [{ name: createCategoryDto.name }, { slug: slug }],
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category with this name or slug already exists');
        }
        const category = new this.categoryModel({
            ...createCategoryDto,
            slug,
        });
        const savedCategory = await category.save();
        return (0, convert_id_1.sanitizeMongooseDocument)(savedCategory.toObject());
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, isActive, isFeatured } = queryDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (isActive !== undefined) {
            filter.isActive = isActive;
        }
        if (isFeatured !== undefined) {
            filter.isFeatured = isFeatured;
        }
        if (search) {
            filter.$text = { $search: search };
        }
        const [categories, total] = await Promise.all([
            this.categoryModel
                .find(filter)
                .sort({ order: 1, name: 1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.categoryModel.countDocuments(filter),
        ]);
        return {
            data: (0, convert_id_1.sanitizeMongooseDocuments)(categories),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id).lean().exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return (0, convert_id_1.sanitizeMongooseDocument)(category);
    }
    async findBySlug(slug) {
        const category = await this.categoryModel
            .findOne({ slug, isActive: true })
            .lean()
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return (0, convert_id_1.sanitizeMongooseDocument)(category);
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (updateCategoryDto.name) {
            updateCategoryDto.slug = this.generateSlug(updateCategoryDto.name);
            const existingCategory = await this.categoryModel.findOne({
                _id: { $ne: id },
                $or: [
                    { name: updateCategoryDto.name },
                    { slug: updateCategoryDto.slug },
                ],
            });
            if (existingCategory) {
                throw new common_1.ConflictException('Category with this name or slug already exists');
            }
        }
        const updatedCategory = await this.categoryModel
            .findByIdAndUpdate(id, updateCategoryDto, { new: true })
            .lean()
            .exec();
        return (0, convert_id_1.sanitizeMongooseDocument)(updatedCategory);
    }
    async remove(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (category.courseCount > 0) {
            throw new common_1.BadRequestException('Cannot delete category with existing courses. Please reassign or delete courses first.');
        }
        await this.categoryModel.findByIdAndUpdate(id, {
            deletedAt: new Date(),
            isActive: false,
        });
        return { message: 'Category deleted successfully' };
    }
    async hardRemove(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (category.courseCount > 0) {
            throw new common_1.BadRequestException('Cannot delete category with existing courses. Please reassign or delete courses first.');
        }
        await this.categoryModel.findByIdAndDelete(id);
        return { message: 'Category permanently deleted' };
    }
    async addSubcategory(id, subcategory) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (category.subcategories.includes(subcategory)) {
            throw new common_1.ConflictException('Subcategory already exists');
        }
        category.subcategories.push(subcategory);
        await category.save();
        return (0, convert_id_1.sanitizeMongooseDocument)(category.toObject());
    }
    async removeSubcategory(id, subcategory) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const index = category.subcategories.indexOf(subcategory);
        if (index === -1) {
            throw new common_1.NotFoundException('Subcategory not found');
        }
        category.subcategories.splice(index, 1);
        await category.save();
        return (0, convert_id_1.sanitizeMongooseDocument)(category.toObject());
    }
    async incrementCourseCount(categoryName) {
        await this.categoryModel.updateOne({ name: categoryName }, { $inc: { courseCount: 1 } });
    }
    async decrementCourseCount(categoryName) {
        await this.categoryModel.updateOne({ name: categoryName }, { $inc: { courseCount: -1 } });
    }
    async getFeaturedCategories() {
        const categories = await this.categoryModel
            .find({ isFeatured: true, isActive: true })
            .sort({ order: 1, name: 1 })
            .lean()
            .exec();
        return (0, convert_id_1.sanitizeMongooseDocuments)(categories);
    }
    async getActiveCategories() {
        const categories = await this.categoryModel
            .find({ isActive: true })
            .select('name slug subcategories icon color')
            .sort({ order: 1, name: 1 })
            .lean()
            .exec();
        return (0, convert_id_1.sanitizeMongooseDocuments)(categories);
    }
    async validateCategory(categorySlug) {
        const category = await this.categoryModel
            .findOne({ slug: categorySlug, isActive: true })
            .lean()
            .exec();
        return !!category;
    }
    async getCategoryWithStats(slug) {
        const category = await this.categoryModel
            .findOne({ slug, isActive: true })
            .lean()
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return (0, convert_id_1.sanitizeMongooseDocument)(category);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.CategorySchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map