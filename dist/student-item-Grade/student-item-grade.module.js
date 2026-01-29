"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentItemGradeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const student_item_grade_schema_1 = require("./schema/student-item-grade.schema");
const student_item_grade_controller_1 = require("./student-item-grade.controller");
const student_item_grade_service_1 = require("./student-item-grade.service");
const user_schema_1 = require("../users/schema/user.schema");
const assigment_schema_1 = require("../assigment/schema/assigment.schema");
let StudentItemGradeModule = class StudentItemGradeModule {
};
exports.StudentItemGradeModule = StudentItemGradeModule;
exports.StudentItemGradeModule = StudentItemGradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: student_item_grade_schema_1.StudentItemGrade.name, schema: student_item_grade_schema_1.StudentItemGradeSchema },
                { name: user_schema_1.UserSchemaClass.name, schema: user_schema_1.UserSchema },
                { name: assigment_schema_1.AssignmentSchemaClass.name, schema: assigment_schema_1.AssigmentSchema },
            ]),
        ],
        controllers: [student_item_grade_controller_1.StudentItemGradeController],
        providers: [student_item_grade_service_1.StudentItemGradeService],
        exports: [student_item_grade_service_1.StudentItemGradeService],
    })
], StudentItemGradeModule);
//# sourceMappingURL=student-item-grade.module.js.map