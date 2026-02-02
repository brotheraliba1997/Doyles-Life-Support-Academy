import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingDocument } from './schema/booking.schema';
import { PaymentDocument } from '../payment/schema/payment.schema';
import { PurchaseOrderDocument } from '../purchaseOrder/schema/purchase.schema';
export declare class BookingsService {
    private bookingModel;
    private paymentModel;
    private purchaseOrderModel;
    private readonly logger;
    constructor(bookingModel: Model<BookingDocument>, paymentModel: Model<PaymentDocument>, purchaseOrderModel: Model<PurchaseOrderDocument>);
    map(doc: any): Promise<Booking>;
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking>;
    findOne(id: string): Promise<Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
