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
exports.StudentItemGradeSchema = exports.StudentItemGrade = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schema/user.schema");
const assigment_schema_1 = require("../../assigment/schema/assigment.schema");
let StudentItemGrade = class StudentItemGrade extends mongoose_2.Document {
};
exports.StudentItemGrade = StudentItemGrade;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StudentItemGrade.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: assigment_schema_1.AssignmentSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StudentItemGrade.prototype, "assessmentItemId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        min: 0,
    }),
    __metadata("design:type", Number)
], StudentItemGrade.prototype, "obtainedMarks", void 0);
exports.StudentItemGrade = StudentItemGrade = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], StudentItemGrade);
exports.StudentItemGradeSchema = mongoose_1.SchemaFactory.createForClass(StudentItemGrade);
exports.StudentItemGradeSchema.index({ studentId: 1, assessmentItemId: 1 }, { unique: true });
//# sourceMappingURL=student-item-grade.schema.js.map