"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attendance_schema_1 = require("./schema/attendance.schema");
const course_schema_1 = require("../course/schema/course.schema");
const pass_fail_record_schema_1 = require("./schema/pass-fail-record.schema");
const class_schedule_schema_1 = require("../classSchedule/schema/class-schedule.schema");
const attendance_service_1 = require("./attendance.service");
const attendence_controller_1 = require("./attendence.controller");
const assigment_schema_1 = require("../assigment/schema/assigment.schema");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: attendance_schema_1.AttendanceSchemaClass.name, schema: attendance_schema_1.AttendanceSchema },
                { name: assigment_schema_1.AssignmentSchemaClass.name, schema: assigment_schema_1.AssigmentSchema },
                { name: course_schema_1.CourseSchemaClass.name, schema: course_schema_1.CourseSchema },
                { name: pass_fail_record_schema_1.PassFailRecordSchemaClass.name, schema: pass_fail_record_schema_1.PassFailRecordSchema },
                { name: class_schedule_schema_1.ClassScheduleSchemaClass.name, schema: class_schedule_schema_1.ClassScheduleSchema },
            ]),
        ],
        controllers: [attendence_controller_1.AttendanceController],
        providers: [attendance_service_1.AttendanceService],
        exports: [attendance_service_1.AttendanceService],
    })
], AttendanceModule);
//# sourceMappingURL=attendence.module.js.map