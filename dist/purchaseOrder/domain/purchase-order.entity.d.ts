import { PurchaseOrderStatusEnum } from '../schema/purchase.schema';
export declare class PurchaseOrderEntity {
    id: string;
    poNumber: string;
    student: string;
    course: string;
    financialContact: string;
    bankSlipUrl: string;
    status: PurchaseOrderStatusEnum;
    submittedAt: Date;
    reviewedBy?: string;
    reviewedAt?: Date;
    decisionNotes?: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<PurchaseOrderEntity>);
}
