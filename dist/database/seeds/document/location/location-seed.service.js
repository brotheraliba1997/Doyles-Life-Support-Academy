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
exports.LocationSeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("../../../../location/schema/location.schema");
let LocationSeedService = class LocationSeedService {
    constructor(model) {
        this.model = model;
    }
    async run() {
        const locations = [
            { country: 'United States', countryCode: 'US' },
            { country: 'United Kingdom', countryCode: 'GB' },
            { country: 'Canada', countryCode: 'CA' },
            { country: 'Australia', countryCode: 'AU' },
            { country: 'Germany', countryCode: 'DE' },
            { country: 'France', countryCode: 'FR' },
            { country: 'Italy', countryCode: 'IT' },
            { country: 'Spain', countryCode: 'ES' },
            { country: 'Netherlands', countryCode: 'NL' },
            { country: 'Belgium', countryCode: 'BE' },
            { country: 'Switzerland', countryCode: 'CH' },
            { country: 'Austria', countryCode: 'AT' },
            { country: 'Sweden', countryCode: 'SE' },
            { country: 'Norway', countryCode: 'NO' },
            { country: 'Denmark', countryCode: 'DK' },
            { country: 'Finland', countryCode: 'FI' },
            { country: 'Poland', countryCode: 'PL' },
            { country: 'Portugal', countryCode: 'PT' },
            { country: 'Greece', countryCode: 'GR' },
            { country: 'Ireland', countryCode: 'IE' },
            { country: 'India', countryCode: 'IN' },
            { country: 'China', countryCode: 'CN' },
            { country: 'Japan', countryCode: 'JP' },
            { country: 'South Korea', countryCode: 'KR' },
            { country: 'Singapore', countryCode: 'SG' },
            { country: 'Malaysia', countryCode: 'MY' },
            { country: 'Thailand', countryCode: 'TH' },
            { country: 'Indonesia', countryCode: 'ID' },
            { country: 'Philippines', countryCode: 'PH' },
            { country: 'Vietnam', countryCode: 'VN' },
            { country: 'United Arab Emirates', countryCode: 'AE' },
            { country: 'Saudi Arabia', countryCode: 'SA' },
            { country: 'Israel', countryCode: 'IL' },
            { country: 'Turkey', countryCode: 'TR' },
            { country: 'South Africa', countryCode: 'ZA' },
            { country: 'Egypt', countryCode: 'EG' },
            { country: 'Nigeria', countryCode: 'NG' },
            { country: 'Kenya', countryCode: 'KE' },
            { country: 'Brazil', countryCode: 'BR' },
            { country: 'Mexico', countryCode: 'MX' },
            { country: 'Argentina', countryCode: 'AR' },
            { country: 'Chile', countryCode: 'CL' },
            { country: 'Colombia', countryCode: 'CO' },
            { country: 'Peru', countryCode: 'PE' },
            { country: 'New Zealand', countryCode: 'NZ' },
            { country: 'Russia', countryCode: 'RU' },
            { country: 'Ukraine', countryCode: 'UA' },
            { country: 'Czech Republic', countryCode: 'CZ' },
            { country: 'Hungary', countryCode: 'HU' },
            { country: 'Romania', countryCode: 'RO' },
        ];
        for (const locationData of locations) {
            const existingLocation = await this.model.findOne({
                country: locationData.country,
            });
            if (!existingLocation) {
                const location = new this.model(locationData);
                await location.save();
                console.log(`Created location: ${locationData.country}`);
            }
            else {
                console.log(`Location already exists: ${locationData.country}`);
            }
        }
        const totalLocations = await this.model.countDocuments();
        console.log(`Total locations in database: ${totalLocations}`);
    }
};
exports.LocationSeedService = LocationSeedService;
exports.LocationSeedService = LocationSeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(location_schema_1.LocationSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationSeedService);
//# sourceMappingURL=location-seed.service.js.map