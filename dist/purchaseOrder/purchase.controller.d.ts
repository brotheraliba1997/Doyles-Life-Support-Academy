import { PurchaseOrderService } from './purchase.services';
import { CreatePurchaseOrderDto } from './dto/create-purchase.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase.dto';
import { PurchaseOrderStatusEnum } from './schema/purchase.schema';
import { PurchaseOrderEntity } from './domain/purchase-order.entity';
export declare class PurchaseOrderController {
    private readonly purchaseOrderService;
    constructor(purchaseOrderService: PurchaseOrderService);
    create(dto: CreatePurchaseOrderDto): Promise<PurchaseOrderEntity>;
    findAll(status?: PurchaseOrderStatusEnum, page?: number, limit?: number): Promise<import("../utils/mongoose-query-builder").PaginationResult<PurchaseOrderEntity>>;
    findOne(id: string): Promise<PurchaseOrderEntity>;
    findByUserAndCourse(userId: string, courseId: string): Promise<PurchaseOrderEntity>;
    update(id: string, dto: UpdatePurchaseOrderDto): Promise<PurchaseOrderEntity | {
        statusCode: number;
        message: string;
        error: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
