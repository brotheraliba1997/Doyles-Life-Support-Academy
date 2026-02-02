import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PurchaseOrderSchemaClass, PurchaseOrderStatusEnum } from './schema/purchase.schema';
import { CreatePurchaseOrderDto } from './dto/create-purchase.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase.dto';
import { PurchaseOrderEntity } from './domain/purchase-order.entity';
import { MailService } from '../mail/mail.service';
import { PaymentService } from '../payment/payment.service';
import { AllConfigType } from '../config/config.type';
import { CourseSchemaClass } from '../course/schema/course.schema';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { BookingDocument } from '../booking/schema/booking.schema';
import { ClassScheduleHelperService } from '../utils/class-schedule/class-schedule-helper.service';
export declare class PurchaseOrderService {
    private readonly purchaseOrderModel;
    private readonly mailService;
    private readonly paymentService;
    private bookingModel;
    private readonly configService;
    private readonly courseModel;
    private readonly classScheduleHelper;
    constructor(purchaseOrderModel: Model<PurchaseOrderSchemaClass>, mailService: MailService, paymentService: PaymentService, bookingModel: Model<BookingDocument>, configService: ConfigService<AllConfigType>, courseModel: Model<CourseSchemaClass>, classScheduleHelper: ClassScheduleHelperService);
    private readonly purchaseOrderPopulate;
    private map;
    private getUserFullName;
    private getUserEmail;
    private getCourseTitle;
    private sendSubmissionEmail;
    private sendDecisionEmail;
    create(dto: CreatePurchaseOrderDto): Promise<PurchaseOrderEntity>;
    findAll(status?: PurchaseOrderStatusEnum, paginationOptions?: IPaginationOptions): Promise<PaginationResult<PurchaseOrderEntity>>;
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
