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
exports.EnquiriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enquiry_schema_1 = require("./schema/enquiry.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const convert_id_1 = require("../utils/convert-id");
const mail_service_1 = require("../mail/mail.service");
const notification_service_1 = require("../notification/notification.service");
const config_1 = require("@nestjs/config");
let EnquiriesService = class EnquiriesService {
    constructor(enquiryModel, mailService, notificationService, configService) {
        this.enquiryModel = enquiryModel;
        this.mailService = mailService;
        this.notificationService = notificationService;
        this.configService = configService;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const s = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!s)
            return undefined;
        return {
            id: s.id,
            subject: s.subject,
            name: s.name,
            email: s.email,
            phone: s.phone,
            company: s.company,
            designation: s.designation,
            enquiryType: s.enquiryType,
            scheme: s.scheme,
            trainingCategory: s.trainingCategory,
            trainingType: s.trainingType,
            trainingDelivery: s.trainingDelivery,
            numberOfLearners: s.numberOfLearners,
            preferredLearningDate: s.preferredLearningDate,
            organizationType: s.organizationType,
            language: s.language,
            certificationsHeld: s.certificationsHeld,
            delivery: s.delivery,
            numberOfLocations: s.numberOfLocations,
            hoursOfOperation: s.hoursOfOperation,
            certifiedScope: s.certifiedScope,
            auditingDelivery: s.auditingDelivery,
            industry: s.industry,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
        };
    }
    async create(dto) {
        const created = await this.enquiryModel.create(dto);
        const entity = this.map(created.toObject());
        const adminEmail = this.configService.get('app.adminEmail', {
            infer: true,
        });
        if (adminEmail) {
            await this.mailService.enquirySubmitted({
                to: adminEmail,
                data: {
                    subject: dto.subject,
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    company: dto.company,
                    designation: dto.designation,
                    industry: dto.industry,
                    trainingType: dto.trainingType,
                },
            });
        }
        this.notificationService.sendWelcome({
            type: 'enquiry',
            subject: dto.subject,
            name: dto.name,
            email: dto.email,
            at: new Date().toISOString(),
        });
        return entity;
    }
    async update(id, dto) {
        const updated = await this.enquiryModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!updated)
            throw new common_1.NotFoundException('Enquiry not found');
        return this.map(updated.toObject());
    }
    async findOne(id) {
        const doc = await this.enquiryModel.findById(id).lean();
        return doc ? this.map(doc) : undefined;
    }
    async remove(id) {
        const res = await this.enquiryModel.findByIdAndDelete(id);
        if (!res)
            throw new common_1.NotFoundException('Enquiry not found');
        return { message: 'Enquiry deleted successfully' };
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('subject', filterOptions?.subject)
            .addEqual('name', filterOptions?.name)
            .addEqual('email', filterOptions?.email)
            .addEqual('phone', filterOptions?.phone)
            .addEqual('company', filterOptions?.company)
            .addEqual('designation', filterOptions?.designation)
            .addEqual('enquiryType', filterOptions?.enquiryType)
            .addEqual('scheme', filterOptions?.scheme)
            .addEqual('trainingCategory', filterOptions?.trainingCategory)
            .addEqual('trainingType', filterOptions?.trainingType)
            .addEqual('trainingDelivery', filterOptions?.trainingDelivery)
            .addEqual('organizationType', filterOptions?.organizationType)
            .addEqual('language', filterOptions?.language)
            .addEqual('certificationsHeld', filterOptions?.certificationsHeld)
            .addEqual('delivery', filterOptions?.delivery)
            .addEqual('certifiedScope', filterOptions?.certifiedScope)
            .addEqual('auditingDelivery', filterOptions?.auditingDelivery)
            .addEqual('industry', filterOptions?.industry)
            .build();
        const additionalFilters = {};
        if (filterOptions?.search) {
            const regex = new RegExp(filterOptions.search, 'i');
            additionalFilters.$or = [
                { subject: regex },
                { name: regex },
                { email: regex },
                { company: regex },
                { designation: regex },
                { industry: regex },
            ];
        }
        const combinedFilter = { ...filterQuery, ...additionalFilters };
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.enquiryModel,
            filterQuery: combinedFilter,
            sortOptions,
            paginationOptions,
            populateFields: [],
            mapper: (doc) => this.map(doc),
        });
    }
};
exports.EnquiriesService = EnquiriesService;
exports.EnquiriesService = EnquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enquiry_schema_1.EnquirySchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService,
        notification_service_1.NotificationService,
        config_1.ConfigService])
], EnquiriesService);
//# sourceMappingURL=enquiries.service.js.map