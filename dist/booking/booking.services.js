"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BookingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("./schema/booking.schema");
const payment_schema_1 = require("../payment/schema/payment.schema");
const convert_id_1 = require("../utils/convert-id");
const purchase_schema_1 = require("../purchaseOrder/schema/purchase.schema");
let BookingsService = BookingsService_1 = class BookingsService {
    constructor(bookingModel, paymentModel, purchaseOrderModel) {
        this.bookingModel = bookingModel;
        this.paymentModel = paymentModel;
        this.purchaseOrderModel = purchaseOrderModel;
        this.logger = new common_1.Logger(BookingsService_1.name);
    }
    async map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        return {
            ...sanitized,
            courseId: {
                ...sanitized.courseId,
                sessions: sanitized.courseId.sessions?.map((session) => ({
                    ...session,
                    instructor: session?.instructor?._doc
                        ? session?.instructor?._doc
                        : session.instructor,
                })),
            },
        };
    }
    async create(createBookingDto) {
        const payments = await this.paymentModel.findOne({
            userId: createBookingDto.studentId,
        });
        if (payments?.userId?.toString() === createBookingDto.studentId) {
            throw new common_1.BadRequestException('Payment has already been used by this student');
        }
        const booking = await this.bookingModel.findOne({
            studentId: new mongoose_2.Types.ObjectId(createBookingDto.studentId),
        });
        console.log('Existing booking:', booking);
        if (booking?.studentId?.toString() === createBookingDto.studentId) {
            throw new common_1.BadRequestException('already you have booked this course or same other course');
        }
        try {
            const newBooking = await this.bookingModel.create({
                ...createBookingDto,
                studentId: new mongoose_2.Types.ObjectId(createBookingDto.studentId),
                courseId: new mongoose_2.Types.ObjectId(createBookingDto.courseId),
                timeTableId: new mongoose_2.Types.ObjectId(createBookingDto.timeTableId),
                sessionId: new mongoose_2.Types.ObjectId(createBookingDto.sessionId),
                paymentMethod: createBookingDto.paymentMethod || 'stripe',
                status: 'pending',
            });
            return this.map(newBooking.toObject());
        }
        catch (error) {
            this.logger.error('Failed to create booking', error.stack);
            console.log('Error details:', error);
            throw error;
        }
    }
    async findAll() {
        const bookings = await this.bookingModel
            .find()
            .populate([
            { path: 'studentId', select: 'name email' },
            { path: 'courseId', select: 'title category sessions' },
            { path: 'timeTableId', select: 'date time' },
        ])
            .lean()
            .exec();
        return this.map(bookings);
    }
    async findOne(id) {
        const booking = await this.bookingModel
            .findById(id)
            .populate([
            { path: 'studentId', select: 'firstName lastName email' },
            {
                path: 'courseId',
                select: 'title category sessions price discountedPrice sessions',
                populate: {
                    path: 'sessions',
                    populate: {
                        path: 'instructor',
                        select: 'firstName lastName email',
                    },
                },
            },
            { path: 'timeTableId', select: 'startDate startTime endDate endTime' },
        ])
            .lean()
            .exec();
        if (!booking)
            throw new common_1.NotFoundException(`Booking with id ${id} not found`);
        return this.map(booking);
    }
    async update(id, updateBookingDto) {
        const updateData = { ...updateBookingDto };
        if (updateBookingDto.sessionId) {
            updateData.sessionId = new mongoose_2.Types.ObjectId(updateBookingDto.sessionId);
        }
        if (updateBookingDto.paymentMethod) {
            updateData.paymentMethod = updateBookingDto.paymentMethod;
        }
        const updated = await this.bookingModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate([
            { path: 'studentId', select: 'name email' },
            { path: 'courseId', select: 'title category sessions' },
            { path: 'timeTableId', select: 'date time' },
        ])
            .lean()
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Booking with id ${id} not found`);
        return this.map(updated);
    }
    async remove(id) {
        const deleted = await this.bookingModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Booking with id ${id} not found`);
        return { message: 'Booking deleted successfully' };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = BookingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __param(2, (0, mongoose_1.InjectModel)(purchase_schema_1.PurchaseOrderSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=booking.services.js.map