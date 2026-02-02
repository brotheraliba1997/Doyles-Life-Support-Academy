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
exports.EnquiriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enquiries_service_1 = require("./enquiries.service");
const create_enquiry_dto_1 = require("./dto/create-enquiry.dto");
const update_enquiry_dto_1 = require("./dto/update-enquiry.dto");
const enquiry_entity_1 = require("./domain/enquiry.entity");
const infinity_pagination_response_dto_1 = require("../utils/dto/infinity-pagination-response.dto");
let EnquiriesController = class EnquiriesController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async findAll(queryDto) {
        const page = queryDto?.page ?? 1;
        let limit = queryDto?.limit ?? 10;
        if (limit > 50)
            limit = 50;
        return this.service.findManyWithPagination({
            filterOptions: queryDto,
            sortOptions: null,
            paginationOptions: { page: Number(page), limit: Number(limit) },
        });
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
    async update(id, dto) {
        return this.service.update(id, dto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.EnquiriesController = EnquiriesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new enquiry' }),
    (0, swagger_1.ApiOkResponse)({ type: enquiry_entity_1.EnquiryEntity }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enquiry_dto_1.CreateEnquiryDto]),
    __metadata("design:returntype", Promise)
], EnquiriesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get enquiries with pagination and search' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiOkResponse)({ type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(enquiry_entity_1.EnquiryEntity) }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnquiriesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get single enquiry by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: enquiry_entity_1.EnquiryEntity }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnquiriesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an enquiry by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: enquiry_entity_1.EnquiryEntity }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enquiry_dto_1.UpdateEnquiryDto]),
    __metadata("design:returntype", Promise)
], EnquiriesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete an enquiry by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: infinity_pagination_response_dto_1.InfinityPaginationResponseDto }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnquiriesController.prototype, "remove", null);
exports.EnquiriesController = EnquiriesController = __decorate([
    (0, swagger_1.ApiTags)('Enquiries'),
    (0, common_1.Controller)({ version: '1', path: 'enquiries' }),
    __metadata("design:paramtypes", [enquiries_service_1.EnquiriesService])
], EnquiriesController);
//# sourceMappingURL=enquiries.controller.js.map