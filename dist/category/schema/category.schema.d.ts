import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type CategorySchemaDocument = HydratedDocument<CategorySchemaClass>;
export declare class CategorySchemaClass extends EntityDocumentHelper {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    image?: string;
    color?: string;
    subcategories: string[];
    courseCount: number;
    order: number;
    isActive: boolean;
    isFeatured: boolean;
    deletedAt?: Date;
}
export declare const CategorySchema: import("mongoose").Schema<CategorySchemaClass, import("mongoose").Model<CategorySchemaClass, any, any, any, import("mongoose").Document<unknown, any, CategorySchemaClass, any, {}> & CategorySchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategorySchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CategorySchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CategorySchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
