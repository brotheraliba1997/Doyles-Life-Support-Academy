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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const certificate_schema_1 = require("./schema/certificate.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
let CertificatesService = class CertificatesService {
    constructor(model) {
        this.model = model;
    }
    map(raw) {
        return {
            id: raw._id?.toString(),
            user: raw.user,
            course: raw.course,
            certificateUrl: raw.certificateUrl,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deletedAt: raw.deletedAt,
        };
    }
    async create(dto) {
        const certificate = await this.model.create(dto);
        return this.map(await certificate.save());
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('user', filterOptions?.userId)
            .addEqual('course', filterOptions?.courseId)
            .build();
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.model,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: [
                { path: 'user', select: 'firstName lastName email' },
                { path: 'course', select: 'title description' },
            ],
            mapper: this.map.bind(this),
        });
    }
    async findAll() {
        const certificates = await this.model
            .find()
            .populate('user', 'firstName lastName email')
            .populate('course', 'title description')
            .lean();
        return certificates.map(this.map.bind(this));
    }
    async findOne(id) {
        const certificate = await this.model
            .findById(id)
            .populate('user', 'firstName lastName email')
            .populate('course', 'title description')
            .lean();
        return certificate ? this.map(certificate) : null;
    }
    async update(id, dto) {
        const certificate = await this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .lean();
        return certificate ? this.map(certificate) : null;
    }
    async remove(id) {
        const certificate = await this.model.findByIdAndDelete(id).lean();
        return certificate ? this.map(certificate) : null;
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(certificate_schema_1.CertificateSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map