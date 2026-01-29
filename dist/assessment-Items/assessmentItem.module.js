"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentItemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const assessmentItem_schema_1 = require("./schema/assessmentItem.schema");
const assessmentItem_controller_1 = require("./assessmentItem.controller");
const assessmentItem_services_1 = require("./assessmentItem.services");
const course_schema_1 = require("../course/schema/course.schema");
let AssessmentItemModule = class AssessmentItemModule {
};
exports.AssessmentItemModule = AssessmentItemModule;
exports.AssessmentItemModule = AssessmentItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: assessmentItem_schema_1.AssessmentItem.name, schema: assessmentItem_schema_1.AssessmentItemSchema },
                { name: course_schema_1.CourseSchemaClass.name, schema: course_schema_1.CourseSchema },
            ]),
        ],
        controllers: [assessmentItem_controller_1.AssessmentItemController],
        providers: [assessmentItem_services_1.AssessmentItemService],
    })
], AssessmentItemModule);
//# sourceMappingURL=assessmentItem.module.js.map