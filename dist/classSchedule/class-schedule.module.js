"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const class_schedule_controller_1 = require("./class-schedule.controller");
const class_schedule_service_1 = require("./class-schedule.service");
const class_schedule_helper_service_1 = require("../utils/class-schedule/class-schedule-helper.service");
const mongoose_1 = require("@nestjs/mongoose");
const class_schedule_schema_1 = require("./schema/class-schedule.schema");
const mail_module_1 = require("../mail/mail.module");
const notification_module_1 = require("../notification/notification.module");
const course_schema_1 = require("../course/schema/course.schema");
const user_schema_1 = require("../users/schema/user.schema");
const google_provider_1 = require("../googleService/google.provider");
const notification_schema_1 = require("../notification/schema/notification.schema");
let ClassScheduleModule = class ClassScheduleModule {
};
exports.ClassScheduleModule = ClassScheduleModule;
exports.ClassScheduleModule = ClassScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: class_schedule_schema_1.ClassScheduleSchemaClass.name, schema: class_schedule_schema_1.ClassScheduleSchema },
                { name: course_schema_1.CourseSchemaClass.name, schema: course_schema_1.CourseSchema },
                { name: user_schema_1.UserSchemaClass.name, schema: user_schema_1.UserSchema },
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
            mail_module_1.MailModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [class_schedule_controller_1.ClassScheduleController],
        providers: [
            class_schedule_service_1.ClassScheduleService,
            class_schedule_helper_service_1.ClassScheduleHelperService,
            google_provider_1.GoogleOAuthProvider,
        ],
        exports: [
            class_schedule_service_1.ClassScheduleService,
            class_schedule_helper_service_1.ClassScheduleHelperService,
        ],
    })
], ClassScheduleModule);
//# sourceMappingURL=class-schedule.module.js.map