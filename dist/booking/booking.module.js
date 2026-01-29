"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const booking_schema_1 = require("./schema/booking.schema");
const course_schema_1 = require("../course/schema/course.schema");
const user_schema_1 = require("../users/schema/user.schema");
const class_schedule_schema_1 = require("../classSchedule/schema/class-schedule.schema");
const payment_schema_1 = require("../payment/schema/payment.schema");
const booking_controller_1 = require("./booking.controller");
const booking_services_1 = require("./booking.services");
const purchase_schema_1 = require("../purchaseOrder/schema/purchase.schema");
let BookingsModule = class BookingsModule {
};
exports.BookingsModule = BookingsModule;
exports.BookingsModule = BookingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },
                { name: course_schema_1.CourseSchemaClass.name, schema: course_schema_1.CourseSchema },
                { name: user_schema_1.UserSchemaClass.name, schema: user_schema_1.UserSchema },
                { name: class_schedule_schema_1.ClassScheduleSchemaClass.name, schema: class_schedule_schema_1.ClassScheduleSchema },
                { name: payment_schema_1.Payment.name, schema: payment_schema_1.PaymentSchema },
                { name: purchase_schema_1.PurchaseOrderSchemaClass.name, schema: purchase_schema_1.PurchaseOrderSchema },
            ]),
        ],
        controllers: [booking_controller_1.BookingsController],
        providers: [booking_services_1.BookingsService],
        exports: [
            booking_services_1.BookingsService,
            mongoose_1.MongooseModule,
        ],
    })
], BookingsModule);
//# sourceMappingURL=booking.module.js.map