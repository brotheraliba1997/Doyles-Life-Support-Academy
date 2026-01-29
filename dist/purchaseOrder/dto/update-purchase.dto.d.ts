import { CreatePurchaseOrderDto } from './create-purchase.dto';
import { PurchaseOrderStatusEnum } from '../schema/purchase.schema';
declare const UpdatePurchaseOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePurchaseOrderDto>>;
export declare class UpdatePurchaseOrderDto extends UpdatePurchaseOrderDto_base {
    status?: PurchaseOrderStatusEnum;
    reviewedBy?: string;
    reviewedAt?: string;
    decisionNotes?: string;
}
export {};
