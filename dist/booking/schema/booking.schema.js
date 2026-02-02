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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = exports.Booking = exports.PaymentMethod = exports.BookingStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../users/schema/user.schema");
const course_schema_1 = require("../../course/schema/course.schema");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["STRIPE"] = "stripe";
    PaymentMethod["PURCHASEORDER"] = "purchase_order";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student who booked the course' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.UserSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Booking.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course being booked' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: course_schema_1.CourseSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Booking.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Selected class schedule or timetable' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: course_schema_1.CourseSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Booking.prototype, "timeTableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Selected class schedule or timetable' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: course_schema_1.CourseSchemaClass.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Booking.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PaymentMethod, default: PaymentMethod.STRIPE }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: PaymentMethod,
        default: PaymentMethod.STRIPE,
    }),
    __metadata("design:type", String)
], Booking.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: BookingStatus, default: BookingStatus.PENDING }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional notes or remarks' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Booking.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
exports.Booking = Booking = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Booking);
exports.BookingSchema = mongoose_1.SchemaFactory.createForClass(Booking);
exports.BookingSchema.index({ studentId: 1, courseId: 1 });
exports.BookingSchema.index({ status: 1, createdAt: -1 });
//# sourceMappingURL=booking.schema.js.map