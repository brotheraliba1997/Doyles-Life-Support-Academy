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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./schema/course.schema");
const course_1 = require("./domain/course");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const convert_id_1 = require("../utils/convert-id");
const categories_service_1 = require("../category/categories.service");
const notification_schema_1 = require("../notification/schema/notification.schema");
let CoursesService = class CoursesService {
    constructor(courseModel, mailService, configService, categoriesService, notificationModel) {
        this.courseModel = courseModel;
        this.mailService = mailService;
        this.configService = configService;
        this.categoriesService = categoriesService;
        this.notificationModel = notificationModel;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    async ensureUniqueSlug(slug, excludeId) {
        let uniqueSlug = slug;
        let counter = 1;
        while (true) {
            const query = { slug: uniqueSlug };
            if (excludeId) {
                query._id = { $ne: excludeId };
            }
            const existing = await this.courseModel.findOne(query).lean();
            if (!existing) {
                return uniqueSlug;
            }
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }
    }
    convertTimeToMinutes(time) {
        if (!time)
            return null;
        const match = time.match(/^(\d{1,2}):([0-5][0-9])$/);
        if (!match)
            return null;
        const hours = Number(match[1]);
        const minutes = Number(match[2]);
        if (Number.isNaN(hours) ||
            Number.isNaN(minutes) ||
            hours < 0 ||
            hours > 23) {
            return null;
        }
        return hours * 60 + minutes;
    }
    calculateInclusiveDays(startDate, endDate) {
        if (!startDate || !endDate) {
            return 1;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
            return 1;
        }
        const startMs = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
        if (endMs < startMs) {
            return 1;
        }
        const diffDays = Math.floor((endMs - startMs) / 86400000);
        return diffDays + 1;
    }
    calculateTimeBlockMinutes(block) {
        if (!block) {
            return 0;
        }
        const startMinutes = this.convertTimeToMinutes(block.startTime);
        const endMinutes = this.convertTimeToMinutes(block.endTime);
        if (startMinutes === null || endMinutes === null) {
            return 0;
        }
        let duration = endMinutes - startMinutes;
        if (duration <= 0) {
            duration += 24 * 60;
        }
        const days = this.calculateInclusiveDays(block.startDate, block.endDate);
        return duration * days;
    }
    calculateTotalSessionMinutes(sessions) {
        if (!Array.isArray(sessions) || sessions.length === 0) {
            return 0;
        }
        return sessions.reduce((sessionSum, session) => {
            const blocks = Array.isArray(session?.timeBlocks)
                ? session.timeBlocks
                : [];
            const blockMinutes = blocks.reduce((blockSum, block) => blockSum + this.calculateTimeBlockMinutes(block), 0);
            return sessionSum + blockMinutes;
        }, 0);
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return new course_1.CourseEntity({
            ...sanitized,
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            title: sanitized.title,
            slug: sanitized.slug,
            description: sanitized.description,
            price: sanitized.price,
            enrolledCount: sanitized.enrolledCount,
            isPublished: sanitized.isPublished,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
            deletedAt: sanitized.deletedAt ?? null,
        });
    }
    async create(dto) {
        const baseSlug = dto.slug || this.generateSlug(dto.title);
        const uniqueSlug = await this.ensureUniqueSlug(baseSlug);
        if (dto.category) {
            try {
                const category = await this.categoriesService.findOne(dto.category);
                if (!category || !category.isActive) {
                    throw new common_1.BadRequestException(`Category "${dto.category}" not found or is inactive`);
                }
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    throw new common_1.BadRequestException(`Category "${dto.category}" does not exist`);
                }
                throw error;
            }
        }
        const created = await this.courseModel.create({
            ...dto,
            slug: uniqueSlug,
        });
        if (dto.category) {
            try {
                await this.categoriesService.incrementCourseCount(dto.category);
            }
            catch (error) {
                console.error('Failed to increment category course count:', error);
            }
        }
        if (created.hasTest && dto.items && dto.items.length > 0) {
            try {
                const items = dto.items.map(item => ({
                    ...item,
                    courseId: created._id.toString(),
                }));
            }
            catch (error) {
                console.error('Assessment items creation failed:', error);
            }
        }
        const populatedCourse = await this.courseModel
            .findById(created._id)
            .populate('sessions.instructor')
            .lean();
        if (populatedCourse) {
            for (const session of populatedCourse.sessions) {
                const instructor = session.instructor;
                const emailData = {
                    courseTitle: populatedCourse.title,
                    instructorName: instructor?.firstName
                        ? `${instructor.firstName} ${instructor.lastName || ''}`
                        : instructor?.email || 'Unknown Instructor',
                    description: populatedCourse.description,
                    price: populatedCourse.price,
                    courseUrl: `${this.configService.get('app.frontendDomain', { infer: true })}/courses/${created._id}`,
                };
                if (instructor?.email) {
                    await this.mailService.courseCreated({
                        to: instructor.email,
                        data: emailData,
                    });
                }
            }
            try {
            }
            catch (error) {
                console.error('Failed to send course creation emails:', error);
            }
        }
        const createdLean = created.toObject();
        return this.map(createdLean);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('instructor', filterOptions?.instructorId)
            .addEqual('category', filterOptions?.category
            ? new mongoose_2.Types.ObjectId(filterOptions.category)
            : undefined)
            .addEqual('isPublished', filterOptions?.isPublished)
            .addEqual('isFeatured', filterOptions?.isFeatured)
            .addEqual('isBestseller', filterOptions?.isBestseller)
            .addEqual('isNew', filterOptions?.isNew)
            .addRange('price', filterOptions?.minPrice, filterOptions?.maxPrice)
            .build();
        const additionalFilters = {};
        if (filterOptions?.subcategory) {
            additionalFilters.subcategories = filterOptions.subcategory;
        }
        if (filterOptions?.topic) {
            additionalFilters.topics = filterOptions.topic;
        }
        if (filterOptions?.minRating) {
            additionalFilters.averageRating = { $gte: filterOptions.minRating };
        }
        if (filterOptions?.skillLevel) {
            additionalFilters['snapshot.skillLevel'] = filterOptions.skillLevel;
        }
        if (filterOptions?.language) {
            additionalFilters['snapshot.language'] = filterOptions.language;
        }
        if (filterOptions?.search) {
            const searchRegex = new RegExp(filterOptions.search, 'i');
            additionalFilters.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { subcategories: searchRegex },
                { topics: searchRegex },
            ];
        }
        const combinedFilter = { ...filterQuery, ...additionalFilters };
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.courseModel,
            filterQuery: combinedFilter,
            sortOptions,
            paginationOptions,
            populateFields: [
                { path: 'sessions.instructor', select: 'lastName firstName email' },
                {
                    path: 'sessions.location',
                },
                { path: 'category', select: 'name slug description icon color' },
            ],
            mapper: (doc) => this.map(doc),
        });
    }
    async findById(id) {
        const doc = await this.courseModel
            .findById(id)
            .populate([
            { path: 'sessions.instructor', select: 'lastName firstName email' },
            {
                path: 'sessions.location',
            },
            { path: 'category', select: 'name slug description icon color' },
        ])
            .lean({ virtuals: false, getters: false });
        return doc ? this.map(doc) : null;
    }
    async findBySlug(slug) {
        const doc = await this.courseModel
            .findOne({ slug })
            .populate([
            {
                path: 'sessions.instructor',
                select: 'lastName firstName email',
            },
            {
                path: 'sessions.location',
            },
            { path: 'category', select: 'name slug description icon color' },
            {
                path: 'timeTable',
            },
        ])
            .lean();
        if (!doc) {
            throw new common_1.NotFoundException('Course not found');
        }
        return this.map(doc);
    }
    async update(id, dto) {
        const existingCourse = await this.courseModel.findById(id).lean();
        if (!existingCourse) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (dto.title && dto.title !== existingCourse.title) {
            const baseSlug = dto.slug || this.generateSlug(dto.title);
            dto.slug = await this.ensureUniqueSlug(baseSlug, id);
        }
        else if (dto.slug && dto.slug !== existingCourse.slug) {
            dto.slug = await this.ensureUniqueSlug(dto.slug, id);
        }
        if (dto.category &&
            (dto.category !== existingCourse?.category?.toString() ||
                dto.category !== existingCourse?.category?._id?.toString())) {
            try {
                const category = await this.categoriesService.findOne(dto.category);
                if (!category || !category.isActive) {
                    throw new common_1.BadRequestException(`Category "${dto.category}" not found or is inactive`);
                }
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    throw new common_1.BadRequestException(`Category "${dto.category}" does not exist`);
                }
                throw error;
            }
            try {
                if (existingCourse.category) {
                    await this.categoriesService.decrementCourseCount(existingCourse.category._id.toString());
                }
                await this.categoriesService.incrementCourseCount(dto.category);
            }
            catch (error) {
                console.error('Failed to update category course counts:', error);
            }
        }
        const doc = await this.courseModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('sessions.instructor', 'lastName firstName email')
            .populate('sessions.location')
            .populate('category', 'name slug description icon color')
            .lean();
        return doc ? this.map(doc) : null;
    }
    async remove(id) {
        const course = await this.courseModel.findById(id).lean();
        if (course) {
            if (course.category) {
                try {
                    await this.categoriesService.decrementCourseCount(course.category._id.toString());
                }
                catch (error) {
                    console.error('Failed to decrement category course count:', error);
                }
            }
            await this.courseModel.deleteOne({ _id: id });
        }
    }
    async findByCategory(categorySlug, paginationOptions) {
        await this.categoriesService.findBySlug(categorySlug);
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('category', categorySlug)
            .addEqual('isPublished', true)
            .build();
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.courseModel,
            filterQuery,
            sortOptions: [{ orderBy: 'createdAt', order: 'DESC' }],
            paginationOptions,
            populateFields: [
                { path: 'instructor', select: 'lastName firstName email' },
                { path: 'category', select: 'name slug description icon color' },
            ],
            mapper: (doc) => this.map(doc),
        });
    }
    async findBySubcategory(subcategory, paginationOptions) {
        const filterQuery = {
            subcategories: subcategory,
            isPublished: true,
        };
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.courseModel,
            filterQuery,
            sortOptions: [{ orderBy: 'createdAt', order: 'DESC' }],
            paginationOptions,
            populateFields: [
                { path: 'instructor', select: 'lastName firstName email' },
                { path: 'category', select: 'name slug description icon color' },
            ],
            mapper: (doc) => this.map(doc),
        });
    }
    async getCoursesByCategories() {
        const featuredCategories = await this.categoriesService.getFeaturedCategories();
        const courses = await this.courseModel
            .find({ isPublished: true })
            .populate('category', 'name slug')
            .lean();
        const categoriesMap = {};
        for (const category of featuredCategories) {
            categoriesMap[category.slug] = [];
        }
        for (const course of courses) {
            const category = course.category;
            const categorySlug = category?.slug || '';
            if (categoriesMap[categorySlug] !== undefined) {
                const totalSessions = course.sessions?.length || 0;
                const totalDurationMinutes = this.calculateTotalSessionMinutes(course.sessions);
                const totalHours = totalDurationMinutes > 0
                    ? Math.max(1, Math.ceil(totalDurationMinutes / 60))
                    : 0;
                const courseData = {
                    href: `/course/${course.slug}`,
                    title: course.title,
                    hours: totalHours > 0 ? `${totalHours}+ Hours` : 'Flexible Schedule',
                    lessons: totalSessions > 0 ? `${totalSessions} Sessions` : 'Schedule TBD',
                    description: course.description || '',
                };
                categoriesMap[categorySlug].push(courseData);
            }
        }
        const result = {};
        for (const category of featuredCategories) {
            const categoryKey = category.slug
                .split('-')
                .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
            result[categoryKey] = {
                categoryName: category.name,
                categorySlug: category.slug,
                categoryDescription: category.description,
                categoryIcon: category.icon,
                categoryColor: category.color,
                courses: categoriesMap[category.slug] || [],
            };
        }
        return result;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __param(4, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService,
        config_1.ConfigService,
        categories_service_1.CategoriesService,
        mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map