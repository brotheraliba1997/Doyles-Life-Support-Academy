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
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enrollments_schema_1 = require("../Enrollment/infrastructure/enrollments.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const convert_id_1 = require("../utils/convert-id");
let EnrollmentService = class EnrollmentService {
    constructor(enrollmentModel) {
        this.enrollmentModel = enrollmentModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            user: sanitized.user,
            course: sanitized.course,
            payment: sanitized.payment ? sanitized.payment : undefined,
            offer: sanitized.offer ? sanitized.offer : undefined,
            progress: sanitized.progress,
            status: sanitized.status,
            completionDate: sanitized.completionDate ?? undefined,
            certificate: sanitized.certificate ? sanitized.certificate : undefined,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
            deletedAt: sanitized.deletedAt ?? undefined,
        };
    }
    async create(createEnrollmentDto) {
        const toCreate = {
            ...createEnrollmentDto,
            progress: createEnrollmentDto.progress ?? 0,
            status: createEnrollmentDto.status ?? 'active',
        };
        const created = await this.enrollmentModel.create(toCreate);
        return this.map(created);
    }
    async findAll() {
        const docs = await this.enrollmentModel.find().lean();
        return docs.map((d) => this.map(d));
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('user', filterOptions?.userId)
            .addEqual('course', filterOptions?.courseId)
            .addEqual('status', filterOptions?.status)
            .build();
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.enrollmentModel,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: [
                { path: 'user', select: 'lastName firstName email' },
                {
                    path: 'course',
                    select: 'title price',
                    populate: { path: 'sessions.instructor', select: 'lastName firstName email' },
                },
            ],
            mapper: (doc) => this.map(doc),
        });
    }
    async findOne(id) {
        const doc = await this.enrollmentModel.findById(id).lean();
        return doc ? this.map(doc) : undefined;
    }
    async update(id, updateData) {
        const doc = await this.enrollmentModel
            .findByIdAndUpdate(id, { ...updateData }, { new: true })
            .lean();
        return doc ? this.map(doc) : undefined;
    }
    async remove(id) {
        const res = await this.enrollmentModel.deleteOne({ _id: id });
        return res.deletedCount > 0;
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enrollments_schema_1.EnrollmentSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map