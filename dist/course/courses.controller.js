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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const infinity_pagination_response_dto_1 = require("../utils/dto/infinity-pagination-response.dto");
const course_1 = require("./domain/course");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
let CoursesController = class CoursesController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    async findAll(queryDto) {
        const page = queryDto?.page ?? 1;
        let limit = queryDto?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        return this.service.findManyWithPagination({
            filterOptions: queryDto,
            sortOptions: null,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    findOne(id) {
        return this.service.findById(id);
    }
    findBySlug(slug) {
        return this.service.findBySlug(slug);
    }
    async findByCategory(categorySlug, query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        return this.service.findByCategory(categorySlug, {
            page: Number(page),
            limit: Number(limit),
        });
    }
    async findBySubcategory(subcategory, query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        return this.service.findBySubcategory(subcategory, {
            page: Number(page),
            limit: Number(limit),
        });
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
    getCoursesByCategories() {
        return this.service.getCoursesByCategories();
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new course',
        description: 'Creates a new course with all details including sessions, FAQs, pricing, timetables, and snapshots. Requires instructor or admin role (currently disabled).',
    }),
    (0, swagger_1.ApiBody)({ type: create_course_dto_1.CreateCourseDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Course created successfully',
        type: course_1.CourseEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - validation failed or category not found',
    }),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all courses with filters',
        description: 'Retrieve a paginated list of courses with optional filters for category, price, rating, skill level, language, and more.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'category',
        required: false,
        type: String,
        description: 'Filter by category ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'subcategory',
        required: false,
        type: String,
        description: 'Filter by subcategory name',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'topic',
        required: false,
        type: String,
        description: 'Filter by topic',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minPrice',
        required: false,
        type: Number,
        description: 'Minimum price filter',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxPrice',
        required: false,
        type: Number,
        description: 'Maximum price filter',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minRating',
        required: false,
        type: Number,
        description: 'Minimum average rating (0-5)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'skillLevel',
        required: false,
        type: String,
        description: 'Filter by skill level (beginner, intermediate, advanced)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'language',
        required: false,
        type: String,
        description: 'Filter by course language',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isFeatured',
        required: false,
        type: Boolean,
        description: 'Filter featured courses',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isPublished',
        required: false,
        type: Boolean,
        description: 'Filter published/draft courses',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search in title and description',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(course_1.CourseEntity),
    }),
    (0, common_1.SerializeOptions)({
        groups: ['admin'],
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get course by ID',
        description: 'Retrieve a single course by its MongoDB ObjectId',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Course found',
        type: course_1.CourseEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Course ObjectId',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get course by slug',
        description: 'Retrieve a course using its SEO-friendly slug (e.g., introduction-to-web-development)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Course found',
        type: course_1.CourseEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'slug',
        type: String,
        required: true,
        description: 'Course slug (e.g., introduction-to-web-development)',
        example: 'introduction-to-web-development',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findBySlug", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get courses by category',
        description: 'Retrieve paginated courses filtered by category slug. Returns all courses in the specified category.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(course_1.CourseEntity),
        description: 'Paginated list of courses in the category',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Category not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'categorySlug',
        type: String,
        required: true,
        description: 'Category slug (e.g., web-development)',
        example: 'web-development',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('category/:categorySlug'),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findByCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get courses by subcategory',
        description: 'Retrieve paginated courses filtered by subcategory name. Returns all courses with the specified subcategory.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(course_1.CourseEntity),
        description: 'Paginated list of courses in the subcategory',
    }),
    (0, swagger_1.ApiParam)({
        name: 'subcategory',
        type: String,
        required: true,
        description: 'Subcategory name',
        example: 'Frontend Development',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('subcategory/:subcategory'),
    __param(0, (0, common_1.Param)('subcategory')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findBySubcategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update course',
        description: 'Update an existing course. Requires authentication and admin/instructor role. Can update all course details including sessions, pricing, and metadata.',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.instructor),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBody)({ type: update_course_dto_1.UpdateCourseDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Course updated successfully',
        type: course_1.CourseEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - authentication required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - insufficient permissions',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Course ObjectId',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete course',
        description: 'Permanently delete a course. Requires authentication and admin/instructor role. This action cannot be undone and will decrement the category course count.',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.instructor),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Course deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - authentication required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - insufficient permissions',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Course ObjectId',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get courses grouped by featured categories',
        description: 'Retrieve all published courses organized by featured categories. Returns category details and courses with duration, lessons count, and descriptions. Dynamically includes all featured categories.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Courses grouped by featured categories with category metadata',
        schema: {
            type: 'object',
            example: {
                isoCourses: {
                    categoryName: 'ISO Courses',
                    categorySlug: 'iso-courses',
                    categoryDescription: 'International Organization for Standardization certification courses',
                    categoryIcon: 'fas fa-certificate',
                    categoryColor: '#e74c3c',
                    courses: [
                        {
                            href: '/courses/iso-9001-foundation',
                            title: 'ISO 9001 Foundation',
                            hours: '19+ Hours',
                            lessons: '10 Lessons',
                            description: 'Learn the fundamentals of ISO 9001 standards',
                        },
                    ],
                },
                qualityManagement: {
                    categoryName: 'Quality Management',
                    categorySlug: 'quality-management',
                    categoryDescription: 'Quality management systems and methodologies',
                    categoryIcon: 'fas fa-award',
                    categoryColor: '#3498db',
                    courses: [
                        {
                            href: '/courses/quality-basics',
                            title: 'Quality Basics',
                            hours: '10+ Hours',
                            lessons: '6 Lessons',
                            description: 'Introduction to quality management',
                        },
                    ],
                },
                healthSafety: {
                    categoryName: 'Health & Safety',
                    categorySlug: 'health-safety',
                    categoryDescription: 'Workplace health, safety and environmental courses',
                    categoryIcon: 'fas fa-shield-alt',
                    categoryColor: '#27ae60',
                    courses: [
                        {
                            href: '/courses/hse-foundation',
                            title: 'HSE Foundation',
                            hours: '14+ Hours',
                            lessons: '7 Lessons',
                            description: 'Learn Health, Safety & Environment fundamentals',
                        },
                    ],
                },
            },
        },
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('grouped/by-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCoursesByCategories", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('Courses'),
    (0, common_1.Controller)({
        path: 'courses',
        version: '1',
    }),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map