import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';
import { FilterLocationDto, QueryLocationDto } from './dto/query-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(data: LocationEntity): Promise<LocationEntity>;
    findAll(queryDto: FilterLocationDto & QueryLocationDto): Promise<import("../utils/mongoose-query-builder").PaginationResult<LocationEntity>>;
    findByCountry(country: string): Promise<LocationEntity>;
}
