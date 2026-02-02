import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type PurchaseOrderDocument = HydratedDocument<PurchaseOrderSchemaClass>;
export declare enum PurchaseOrderStatusEnum {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    NEEDS_INFO = "needs_info"
}
export declare class PurchaseOrderSchemaClass extends EntityDocumentHelper {
    poNumber: string;
    student: Types.ObjectId;
    course: Types.ObjectId;
    financialContact: Types.ObjectId;
    bankSlipUrl: string;
    status: PurchaseOrderStatusEnum;
    BookingId?: MongooseSchema.Types.ObjectId;
    submittedAt: Date;
    reviewedBy?: Types.ObjectId;
    reviewedAt?: Date;
    decisionNotes?: string;
}
export declare const PurchaseOrderSchema: MongooseSchema<PurchaseOrderSchemaClass, import("mongoose").Model<PurchaseOrderSchemaClass, any, any, any, import("mongoose").Document<unknown, any, PurchaseOrderSchemaClass, any, {}> & PurchaseOrderSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurchaseOrderSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PurchaseOrderSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PurchaseOrderSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
