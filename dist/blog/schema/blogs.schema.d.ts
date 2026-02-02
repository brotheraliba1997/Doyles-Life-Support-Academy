import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type BlogSchemaDocument = HydratedDocument<BlogSchemaClass>;
export declare class BlogSchemaClass extends EntityDocumentHelper {
    title: string;
    content: string;
    author: Types.ObjectId;
    comments: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare const BlogSchema: import("mongoose").Schema<BlogSchemaClass, import("mongoose").Model<BlogSchemaClass, any, any, any, import("mongoose").Document<unknown, any, BlogSchemaClass, any, {}> & BlogSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlogSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BlogSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BlogSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
