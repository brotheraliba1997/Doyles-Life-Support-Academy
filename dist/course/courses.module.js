"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const courses_service_1 = require("./courses.service");
const courses_controller_1 = require("./courses.controller");
const course_schema_1 = require("./schema/course.schema");
const mail_module_1 = require("../mail/mail.module");
const user_schema_1 = require("../users/schema/user.schema");
const categories_module_1 = require("../category/categories.module");
const notification_schema_1 = require("../notification/schema/notification.schema");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.CourseSchemaClass.name, schema: course_schema_1.CourseSchema },
                { name: user_schema_1.UserSchemaClass.name, schema: user_schema_1.UserSchema },
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
            mail_module_1.MailModule,
            categories_module_1.CategoriesModule,
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map