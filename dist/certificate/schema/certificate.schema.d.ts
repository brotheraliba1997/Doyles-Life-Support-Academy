import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type CertificateSchemaDocument = HydratedDocument<CertificateSchemaClass>;
export declare class CertificateSchemaClass extends EntityDocumentHelper {
    user: Types.ObjectId;
    course: Types.ObjectId;
    certificateUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare const CertificateSchema: import("mongoose").Schema<CertificateSchemaClass, import("mongoose").Model<CertificateSchemaClass, any, any, any, import("mongoose").Document<unknown, any, CertificateSchemaClass, any, {}> & CertificateSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CertificateSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CertificateSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CertificateSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
