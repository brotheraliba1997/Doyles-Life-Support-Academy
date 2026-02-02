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
exports.StudentItemGradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const convert_id_1 = require("../utils/convert-id");
const student_item_grade_schema_1 = require("./schema/student-item-grade.schema");
let StudentItemGradeService = class StudentItemGradeService {
    constructor(gradeModel) {
        this.gradeModel = gradeModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            studentId: sanitized.studentId,
            assessmentItemId: sanitized.assessmentItemId,
            obtainedMarks: sanitized.obtainedMarks,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    mapAssessmentItem(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            courseId: sanitized.courseId.toString(),
            day: sanitized.day,
            topicRef: sanitized.topicRef,
            title: sanitized.title,
            cu: sanitized.cu,
            maxMarks: sanitized.maxMarks,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    async createOrUpdate(dto) {
        const results = [];
        for (const grade of dto.grades) {
            const { studentId, assessmentItemId, obtainedMarks } = grade;
            const record = await this.gradeModel
                .findOneAndUpdate({
                studentId: new mongoose_2.Types.ObjectId(studentId),
                assessmentItemId: new mongoose_2.Types.ObjectId(assessmentItemId),
            }, {
                obtainedMarks,
            }, {
                upsert: true,
                new: true,
            })
                .populate('studentId')
                .populate('assessmentItemId')
                .lean();
            results.push(this.map(record));
        }
        return results;
    }
    async findByStudent(studentId) {
        const grades = await this.gradeModel
            .find({ studentId: new mongoose_2.Types.ObjectId(studentId) })
            .populate('studentId')
            .lean();
        return grades.map(this.map);
    }
    async update(id, dto) {
        const updated = await this.gradeModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Student item grade not found');
        }
        const grade = await this.gradeModel
            .findById(updated._id)
            .populate('studentId')
            .populate('assessmentItemId')
            .lean();
        return this.map(grade);
    }
    async remove(id) {
        const deleted = await this.gradeModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new common_1.NotFoundException('Student item grade not found');
        }
        return { message: 'Grade removed successfully' };
    }
};
exports.StudentItemGradeService = StudentItemGradeService;
exports.StudentItemGradeService = StudentItemGradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_item_grade_schema_1.StudentItemGrade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentItemGradeService);
//# sourceMappingURL=student-item-grade.service.js.map