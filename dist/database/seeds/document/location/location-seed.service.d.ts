import { Model } from 'mongoose';
import { LocationSchemaClass } from '../../../../location/schema/location.schema';
export declare class LocationSeedService {
    private readonly model;
    constructor(model: Model<LocationSchemaClass>);
    run(): Promise<void>;
}
