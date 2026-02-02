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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("./schema/location.schema");
const location_entity_1 = require("./location.entity");
const convert_id_1 = require("../utils/convert-id");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
let LocationService = class LocationService {
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        const entity = new location_entity_1.LocationEntity();
        entity.id = sanitized.id;
        entity.country = sanitized.country;
        entity.countryCode = sanitized.countryCode;
        entity.currency = sanitized.currency;
        entity.createdAt = sanitized.createdAt;
        entity.updatedAt = sanitized.updatedAt;
        return entity;
    }
    async create(data) {
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(data);
        const created = await this.locationModel.create(sanitized);
        return this.map(created.toObject());
    }
    async findAll() {
        const docs = await this.locationModel.find().exec();
        return docs.map((doc) => this.map(doc.toObject()));
    }
    async findByCountry(country) {
        const doc = await this.locationModel.findOne({ country }).exec();
        return doc ? this.map(doc.toObject()) : undefined;
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('country', filterOptions?.country)
            .addEqual('countryCode', filterOptions?.countryCode)
            .addEqual('currency', filterOptions?.currency)
            .build();
        const additionalFilters = {};
        if (filterOptions?.search) {
            const searchRegex = new RegExp(filterOptions.search, 'i');
            additionalFilters.$or = [
                { country: searchRegex },
                { countryCode: searchRegex },
            ];
        }
        const combinedFilter = { ...filterQuery, ...additionalFilters };
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.locationModel,
            filterQuery: combinedFilter,
            sortOptions,
            paginationOptions,
            populateFields: [],
            mapper: (doc) => this.map(doc),
        });
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(location_schema_1.LocationSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationService);
//# sourceMappingURL=location.service.js.map