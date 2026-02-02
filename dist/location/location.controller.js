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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const location_service_1 = require("./location.service");
const location_entity_1 = require("./location.entity");
const infinity_pagination_response_dto_1 = require("../utils/dto/infinity-pagination-response.dto");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async create(data) {
        return this.locationService.create(data);
    }
    async findAll(queryDto) {
        const page = queryDto?.page ?? 1;
        let limit = queryDto?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        return this.locationService.findManyWithPagination({
            filterOptions: queryDto,
            sortOptions: null,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    async findByCountry(country) {
        return this.locationService.findByCountry(country);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new location' }),
    (0, swagger_1.ApiOkResponse)({ type: location_entity_1.LocationEntity }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_entity_1.LocationEntity]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all locations with pagination and search' }),
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
        name: 'search',
        required: false,
        type: String,
        description: 'Search in country and country code',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'country',
        required: false,
        type: String,
        description: 'Filter by country name',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'countryCode',
        required: false,
        type: String,
        description: 'Filter by country code',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'currency',
        required: false,
        type: String,
        description: 'Filter by currency',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: (0, infinity_pagination_response_dto_1.InfinityPaginationResponse)(location_entity_1.LocationEntity),
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get location by country name' }),
    (0, swagger_1.ApiOkResponse)({ type: location_entity_1.LocationEntity }),
    (0, common_1.Get)(':country'),
    __param(0, (0, common_1.Param)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findByCountry", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiTags)('Locations'),
    (0, common_1.Controller)({ version: '1', path: 'location' }),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map