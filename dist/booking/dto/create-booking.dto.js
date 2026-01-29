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
exports.CreateBookingDto = exports.PaymentMethod = exports.BookingStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
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
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student ID', example: '671a23f8abc123...' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '670105cc456dbd8ea48ecdf3',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Selected timetable ID',
        example: '670bbb9871fa82325d15dfad',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "timeTableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method',
        enum: PaymentMethod,
        example: PaymentMethod.STRIPE,
        required: false,
        default: PaymentMethod.STRIPE,
    }),
    (0, class_validator_1.IsEnum)(PaymentMethod),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking status',
        enum: BookingStatus,
        example: BookingStatus.PENDING,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(BookingStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional notes or message',
        example: 'Excited to start the class!',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "notes", void 0);
//# sourceMappingURL=create-booking.dto.js.map