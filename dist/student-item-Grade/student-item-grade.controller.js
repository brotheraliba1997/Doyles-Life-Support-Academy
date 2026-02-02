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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentItemGradeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const student_item_grade_service_1 = require("./student-item-grade.service");
const update_student_item_grade_dto_1 = require("./dto/update-student-item-grade.dto");
const create_student_item_grade_dto_1 = require("./dto/create-student-item-grade.dto");
let StudentItemGradeController = class StudentItemGradeController {
    constructor(gradeService) {
        this.gradeService = gradeService;
    }
    createOrUpdate(dto) {
        console.log(dto);
        return this.gradeService.createOrUpdate(dto);
    }
    findByStudent(studentId) {
        return this.gradeService.findByStudent(studentId);
    }
    update(id, dto) {
        return this.gradeService.update(id, dto);
    }
    remove(id) {
        return this.gradeService.remove(id);
    }
};
exports.StudentItemGradeController = StudentItemGradeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update student item grade' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_item_grade_dto_1.createManyStudentItemGradeDto]),
    __metadata("design:returntype", void 0)
], StudentItemGradeController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all grades of a student' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentItemGradeController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update obtained marks' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_item_grade_dto_1.UpdateStudentItemGradeDto]),
    __metadata("design:returntype", void 0)
], StudentItemGradeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete student item grade' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentItemGradeController.prototype, "remove", null);
exports.StudentItemGradeController = StudentItemGradeController = __decorate([
    (0, swagger_1.ApiTags)('Student Item Grades'),
    (0, common_1.Controller)({
        path: 'student-item-grades',
        version: '1',
    }),
    __metadata("design:paramtypes", [student_item_grade_service_1.StudentItemGradeService])
], StudentItemGradeController);
//# sourceMappingURL=student-item-grade.controller.js.map