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
exports.BulkMarkAssignmentDto = exports.StudentAssignmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class StudentAssignmentDto {
}
exports.StudentAssignmentDto = StudentAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentAssignmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assigment marks',
        example: 10,
        minimum: 0,
        maximum: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], StudentAssignmentDto.prototype, "marks", void 0);
class BulkMarkAssignmentDto {
}
exports.BulkMarkAssignmentDto = BulkMarkAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Schedule ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAssignmentDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID - sessions array is inside course',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAssignmentDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array (ObjectId)',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAssignmentDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID who is marking the Assigment',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAssignmentDto.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [StudentAssignmentDto],
        description: 'Array of students with their Assigment status',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentAssignmentDto),
    __metadata("design:type", Array)
], BulkMarkAssignmentDto.prototype, "students", void 0);
//# sourceMappingURL=bulk-mark-assigment.dto.js.map