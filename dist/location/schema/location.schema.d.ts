import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type LocationSchemaDocument = HydratedDocument<LocationSchemaClass>;
export declare class LocationSchemaClass extends EntityDocumentHelper {
    country: string;
    countryCode?: string;
    currency?: string;
}
export declare const LocationSchema: import("mongoose").Schema<LocationSchemaClass, import("mongoose").Model<LocationSchemaClass, any, any, any, import("mongoose").Document<unknown, any, LocationSchemaClass, any, {}> & LocationSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocationSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LocationSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LocationSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
