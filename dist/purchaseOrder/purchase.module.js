"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_schema_1 = require("./schema/purchase.schema");
const course_schema_1 = require("../course/schema/course.schema");
const purchase_services_1 = require("./purchase.services");
const purchase_controller_1 = require("./purchase.controller");
const mail_module_1 = require("../mail/mail.module");
const payment_module_1 = require("../payment/payment.module");
const booking_module_1 = require("../booking/booking.module");
const class_schedule_module_1 = require("../classSchedule/class-schedule.module");
let PurchaseOrderModule = class PurchaseOrderModule {
};
exports.PurchaseOrderModule = PurchaseOrderModule;
exports.PurchaseOrderModule = PurchaseOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: purchase_schema_1.PurchaseOrderSchemaClass.name,
                    schema: purchase_schema_1.PurchaseOrderSchema,
                },
                {
                    name: course_schema_1.CourseSchemaClass.name,
                    schema: course_schema_1.CourseSchema,
                },
            ]),
            mail_module_1.MailModule,
            payment_module_1.PaymentModule,
            booking_module_1.BookingsModule,
            class_schedule_module_1.ClassScheduleModule,
        ],
        controllers: [purchase_controller_1.PurchaseOrderController],
        providers: [purchase_services_1.PurchaseOrderService],
        exports: [purchase_services_1.PurchaseOrderService],
    })
], PurchaseOrderModule);
//# sourceMappingURL=purchase.module.js.map