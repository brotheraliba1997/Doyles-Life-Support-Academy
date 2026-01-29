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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const convert_id_1 = require("../utils/convert-id");
const assigment_schema_1 = require("./schema/assigment.schema");
const pdfs_1 = __importDefault(require("../utils/pdf-download/pdfs"));
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const assigment_check_pass_fail_dto_1 = require("./dto/assigment-check-pass-fail.dto");
const pass_fail_record_schema_1 = require("./schema/pass-fail-record.schema");
let AssignmentService = class AssignmentService {
    constructor(assigmenteModel, passFailRecordModel) {
        this.assigmenteModel = assigmenteModel;
        this.passFailRecordModel = passFailRecordModel;
        this.assigmentePopulate = [
            {
                path: 'classScheduleId',
                select: 'date time duration status course',
                populate: [
                    { path: 'course', select: 'title slug' },
                ],
            },
            {
                path: 'courseId',
                select: 'title slug sessions',
            },
            { path: 'student', select: 'firstName lastName email' },
            { path: 'markedBy', select: 'firstName lastName email' },
        ];
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id,
            classScheduleId: sanitized.classScheduleId,
            courseId: sanitized.courseId,
            sessionId: sanitized.sessionId,
            student: sanitized.student,
            markedBy: sanitized.markedBy,
            marks: sanitized.marks,
            notes: sanitized.notes,
            certificateUrl: sanitized.certificateUrl,
            timeBlockIndex: sanitized.timeBlockIndex,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    mapPassFailRecord(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            studentId: sanitized.studentId,
            courseId: sanitized.courseId,
            sessionId: sanitized.sessionId,
            classScheduleId: sanitized.classScheduleId,
            marks: sanitized.marks,
            totalClasses: sanitized.totalClasses,
            presentCount: sanitized.presentCount,
            absentCount: sanitized.absentCount,
            attendancePercentage: sanitized.attendancePercentage,
            isApproved: sanitized.isApproved,
            approvedBy: sanitized.approvedBy,
            approvedAt: sanitized.approvedAt,
            certificateIssued: sanitized.certificateIssued,
            certificateId: sanitized.certificateId,
            certificateUrl: sanitized.certificateUrl,
            notes: sanitized.notes,
            determinedAt: sanitized.determinedAt,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    async create(dto, instructorId) {
        const existing = await this.assigmenteModel
            .findOne({
            classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
            student: new mongoose_2.Types.ObjectId(dto.studentId),
        })
            .lean();
        if (existing) {
            const updated = await this.assigmenteModel
                .findByIdAndUpdate(existing._id, {
                classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
                courseId: new mongoose_2.Types.ObjectId(dto.courseId),
                sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
                marks: dto.marks,
                notes: dto.notes,
                markedBy: new mongoose_2.Types.ObjectId(instructorId),
                markedAt: new Date(),
            }, { new: true })
                .populate(this.assigmentePopulate)
                .lean();
            return this.map(updated);
        }
        const created = await this.assigmenteModel.create({
            classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
            courseId: new mongoose_2.Types.ObjectId(dto.courseId),
            sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
            student: new mongoose_2.Types.ObjectId(dto.studentId),
            markedBy: new mongoose_2.Types.ObjectId(instructorId),
            marks: dto.marks,
            notes: dto.notes,
            markedAt: new Date(),
        });
        const populated = await this.assigmenteModel
            .findById(created._id)
            .populate(this.assigmentePopulate)
            .lean();
        return this.map(populated);
    }
    async findAll(filters) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('classScheduleId', filters?.classScheduleId)
            .addEqual('courseId', filters?.courseId)
            .addEqual('sessionId', filters?.sessionId ? new mongoose_2.Types.ObjectId(filters.sessionId) : undefined)
            .addEqual('student', filters?.studentId)
            .addEqual('markedBy', filters?.markedBy)
            .addEqual('status', filters?.status)
            .build();
        const docs = await this.assigmenteModel
            .find(filterQuery)
            .populate(this.assigmentePopulate)
            .sort({ markedAt: -1 })
            .lean();
        return docs.map((doc) => this.map(doc));
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('classScheduleId', filterOptions?.classScheduleId)
            .addEqual('courseId', filterOptions?.courseId)
            .addEqual('sessionId', filterOptions?.sessionId
            ? new mongoose_2.Types.ObjectId(filterOptions.sessionId)
            : undefined)
            .addEqual('student', filterOptions?.studentId)
            .addEqual('markedBy', filterOptions?.markedBy)
            .addEqual('status', filterOptions?.status)
            .build();
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.assigmenteModel,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: this.assigmentePopulate,
            mapper: (doc) => this.map(doc),
        });
    }
    async update(id, dto) {
        const updatePayload = {};
        if (dto.marks !== undefined) {
            updatePayload.status = dto.marks;
        }
        if (dto.notes !== undefined) {
            updatePayload.notes = dto.notes;
        }
        if (dto.classScheduleId) {
            updatePayload.classScheduleId = new mongoose_2.Types.ObjectId(dto.classScheduleId);
        }
        if (dto.courseId) {
            updatePayload.courseId = new mongoose_2.Types.ObjectId(dto.courseId);
        }
        if (dto.sessionId) {
            updatePayload.sessionId = new mongoose_2.Types.ObjectId(dto.sessionId);
        }
        if (dto.studentId) {
            updatePayload.student = new mongoose_2.Types.ObjectId(dto.studentId);
        }
        const updated = await this.assigmenteModel
            .findByIdAndUpdate(id, updatePayload, { new: true })
            .populate(this.assigmentePopulate)
            .lean();
        if (!updated) {
            throw new common_1.NotFoundException('Attendance record not found');
        }
        return this.map(updated);
    }
    async approvePassFailStatus(dto, operatorId) {
        const { recordId, approve, notes, certificateUrl, pdfFileName } = dto;
        const record = await this.passFailRecordModel.findById(recordId).lean();
        if (!record) {
            throw new common_1.NotFoundException('Pass/Fail record not found');
        }
        let finalCertificateUrl = certificateUrl;
        if (pdfFileName && !certificateUrl) {
            finalCertificateUrl = (0, pdfs_1.default)(pdfFileName) || undefined;
        }
        console.log(finalCertificateUrl, 'finalCertificateUrl');
        const updateData = {
            isApproved: approve,
        };
        if (approve) {
            updateData.approvedBy = new mongoose_2.Types.ObjectId(operatorId);
            updateData.approvedAt = new Date();
            if (notes !== undefined) {
                updateData.notes = notes;
            }
            const updated = await this.passFailRecordModel
                .findByIdAndUpdate(recordId, updateData, { new: true })
                .populate('studentId', 'firstName lastName email')
                .populate('approvedBy', 'firstName lastName email')
                .lean();
            return this.mapPassFailRecord(updated);
        }
    }
    async checkPassFailStatus(dto) {
        const { courseId, sessionId } = dto;
        const query = {
            courseId: new mongoose_2.Types.ObjectId(courseId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
        };
        const assigmenteRecords = await this.assigmenteModel
            .find(query)
            .populate('student', 'firstName lastName email')
            .lean();
        if (!assigmenteRecords || assigmenteRecords.length === 0) {
            throw new common_1.NotFoundException('No attendance records found for this course and session');
        }
        const studentAttendanceMap = new Map();
        assigmenteRecords.forEach((record) => {
            const studentId = record.student?._id?.toString() || record.student?.toString();
            if (!studentAttendanceMap.has(studentId)) {
                studentAttendanceMap.set(studentId, []);
            }
            studentAttendanceMap.get(studentId)?.push(record);
        });
        const results = [];
        let passedCount = 0;
        let failedCount = 0;
        for (const [studentId, records] of studentAttendanceMap.entries()) {
            const student = records[0].student;
            const totalClasses = records.length;
            const presentCount = records.filter((r) => r.marks === 10).length;
            const absentCount = records.filter((r) => r.marks !== 10).length;
            const maxMarks = totalClasses * 10;
            const obtainedMarks = records.reduce((sum, r) => sum + (r.marks || 0), 0);
            const percentage = totalClasses > 0 ? Math.round((obtainedMarks / maxMarks) * 100) : 0;
            const allFullMarks = records.every((r) => r.marks === 10);
            const result = allFullMarks
                ? assigment_check_pass_fail_dto_1.PassFailStatusEnum.PASS
                : assigment_check_pass_fail_dto_1.PassFailStatusEnum.FAIL;
            if (result === assigment_check_pass_fail_dto_1.PassFailStatusEnum.PASS) {
                passedCount++;
            }
            else {
                failedCount++;
            }
            const studentName = student.firstName && student.lastName
                ? `${student.firstName} ${student.lastName}`
                : student.email || 'Unknown Student';
            const existingRecord = await this.passFailRecordModel.findOne({
                studentId: new mongoose_2.Types.ObjectId(studentId),
                courseId: new mongoose_2.Types.ObjectId(courseId),
                sessionId: new mongoose_2.Types.ObjectId(sessionId),
            });
            const passFailData = {
                studentId: new mongoose_2.Types.ObjectId(studentId),
                courseId: new mongoose_2.Types.ObjectId(courseId),
                sessionId: new mongoose_2.Types.ObjectId(sessionId),
                status: result,
                totalClasses,
                presentCount,
                percentage,
                absentCount,
                determinedAt: new Date(),
            };
            let savedRecord;
            if (existingRecord) {
                savedRecord = await this.passFailRecordModel
                    .findByIdAndUpdate(existingRecord._id, {
                    ...passFailData,
                    isApproved: existingRecord.isApproved,
                    approvedBy: existingRecord.approvedBy,
                    approvedAt: existingRecord.approvedAt,
                    certificateIssued: existingRecord.certificateIssued,
                    certificateId: existingRecord.certificateId,
                }, { new: true })
                    .lean();
            }
            else {
                savedRecord = await this.passFailRecordModel.create(passFailData);
                savedRecord = await this.passFailRecordModel
                    .findById(savedRecord._id)
                    .lean();
            }
            const certificateIssued = savedRecord?.certificateIssued || false;
            results.push({
                id: savedRecord._id.toString(),
                studentId,
                studentName,
                totalClasses,
                presentCount,
                absentCount,
                percentage,
                result: result,
                certificateIssued,
            });
        }
        results.sort((a, b) => {
            if (a.result === 'PASS' && b.result === 'FAIL')
                return -1;
            if (a.result === 'FAIL' && b.result === 'PASS')
                return 1;
            return 0;
        });
        return {
            classScheduleId: dto.classScheduleId || '',
            courseId,
            sessionId,
            totalStudents: studentAttendanceMap.size,
            passedStudents: passedCount,
            failedStudents: failedCount,
            results,
        };
    }
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assigment_schema_1.AssignmentSchemaClass.name)),
    __param(1, (0, mongoose_1.InjectModel)(pass_fail_record_schema_1.AssigmentPassFailRecordSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AssignmentService);
//# sourceMappingURL=assigment.service.js.map