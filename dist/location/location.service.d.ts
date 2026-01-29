import { Model } from 'mongoose';
import { LocationSchemaDocument } from './schema/location.schema';
import { LocationEntity } from './location.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { FilterLocationDto, SortLocationDto } from './dto/query-location.dto';
export declare class LocationService {
    private readonly locationModel;
    constructor(locationModel: Model<LocationSchemaDocument>);
    private map;
    create(data: Partial<LocationEntity>): Promise<LocationEntity>;
    findAll(): Promise<LocationEntity[]>;
    findByCountry(country: string): Promise<LocationEntity | undefined>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterLocationDto | null;
        sortOptions?: SortLocationDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<LocationEntity>>;
}
