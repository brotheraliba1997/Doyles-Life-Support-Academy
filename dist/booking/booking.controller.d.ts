import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsService } from './booking.services';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto): Promise<import("./schema/booking.schema").Booking>;
    findAll(): Promise<import("./schema/booking.schema").Booking>;
    findOne(id: string): Promise<import("./schema/booking.schema").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("./schema/booking.schema").Booking>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
