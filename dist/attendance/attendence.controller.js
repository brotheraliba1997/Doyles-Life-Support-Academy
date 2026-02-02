"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const swagger_1 = require("@nestjs/swagger");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const bulk_mark_attendance_dto_1 = require("./dto/bulk-mark-attendance.dto");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
const query_attendance_dto_1 = require("./dto/query-attendance.dto");
const attendance_schema_1 = require("./schema/attendance.schema");
const attendance_entity_1 = require("./domain/attendance.entity");
const attendance_service_1 = require("./attendance.service");
const check_pass_fail_dto_1 = require("./dto/check-pass-fail.dto");
const approve_pass_fail_dto_1 = require("./dto/approve-pass-fail.dto");
const pass_fail_record_entity_1 = require("./domain/pass-fail-record.entity");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async create(dto) {
        return await this.attendanceService.create(dto, dto.markedBy);
    }
    async bulkMark(dto) {
        return await this.attendanceService.bulkMark(dto, dto.markedBy);
    }
    async findAll(filters) {
        return await this.attendanceService.findAll(filters);
    }
    async findPaginated(query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50)
            limit = 50;
        const filterOptions = {
            courseId: query?.courseId,
            sessionId: query?.sessionId,
            studentId: query?.studentId,
            markedBy: query?.markedBy,
            status: query?.status,
        };
        return await this.attendanceService.findManyWithPagination({
            filterOptions,
            sortOptions: query?.sort,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    async getAttendanceStats(courseId, studentId, sessionId) {
        return await this.attendanceService.getAttendanceStats(courseId, studentId, sessionId);
    }
    async checkPassFail(query) {
        return await this.attendanceService.checkPassFailStatus(query);
    }
    async getPassFailRecordsByStudent(studentId, query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        return await this.attendanceService.getPassFailRecordsByStudent({ studentId }, {
            page: Number(page),
            limit: Number(limit),
        });
    }
    async getPassFailRecords(query) {
        return await this.attendanceService.getPassFailRecords(query);
    }
    async approvePassFail(dto) {
        if (!dto.operatorId) {
            throw new common_1.BadRequestException('Operator ID is required');
        }
        return await this.attendanceService.approvePassFailStatus(dto, dto.operatorId);
    }
    async getCertificateReadyRecords(courseId, sessionId) {
        return await this.attendanceService.getApprovedPassRecordsForCertificates(courseId, sessionId);
    }
    async getPassFailRecordById(id) {
        return await this.attendanceService.getPassFailRecordById(id);
    }
    async findOne(id) {
        return await this.attendanceService.findOne(id);
    }
    async update(id, dto) {
        return await this.attendanceService.update(id, dto);
    }
    async remove(id) {
        const deleted = await this.attendanceService.remove(id);
        return { deleted };
    }
    async downloadPdf(filename, res) {
        const filePath = path.join(process.cwd(), 'pdfs', filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException(`PDF file not found: ${filename}`);
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        return res.sendFile(filePath);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Mark attendance for a single student',
        description: 'Instructor marks attendance for one student in a class schedule.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Attendance marked successfully',
        type: attendance_entity_1.AttendanceEntity,
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Bulk mark attendance for multiple students',
        description: 'Instructor marks attendance for multiple students in a class schedule at once.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Attendance marked for all students successfully',
        schema: {
            example: {
                message: 'Attendance marked for 5 students',
                created: 5,
                updated: 0,
            },
        },
    }),
    (0, common_1.Post)('bulk'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_mark_attendance_dto_1.BulkMarkAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "bulkMark", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'List attendance records',
        description: 'Get all attendance records with optional filters (courseId, sessionId, student, markedBy, status).',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: false,
        type: String,
        description: 'Filter by course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: false,
        type: String,
        description: 'Filter by session ID from course.sessions array',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: false,
        type: String,
        description: 'Filter by student ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'markedBy',
        required: false,
        type: String,
        description: 'Filter by instructor who marked attendance',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: attendance_schema_1.AttendanceStatusEnum,
        description: 'Filter by attendance status (present/absent)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of attendance records',
        type: [attendance_entity_1.AttendanceEntity],
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_attendance_dto_1.FilterAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get paginated attendance records',
        description: 'Get attendance records with pagination, filters, and sorting options.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: false,
        type: String,
        description: 'Filter by course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: false,
        type: String,
        description: 'Filter by session ID from course.sessions array',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: false,
        type: String,
        description: 'Filter by student ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'markedBy',
        required: false,
        type: String,
        description: 'Filter by instructor who marked attendance',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: attendance_schema_1.AttendanceStatusEnum,
        description: 'Filter by attendance status',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Paginated attendance records',
    }),
    (0, common_1.Get)('paginated/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findPaginated", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get attendance statistics for a student',
        description: 'Get attendance count and statistics for a student in a specific course session. Returns total classes, present/absent counts, and attendance percentage.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: true,
        type: String,
        description: 'Course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: true,
        type: String,
        description: 'Student ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: true,
        type: String,
        description: 'Session ID from course.sessions array',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Attendance statistics',
        schema: {
            example: {
                courseId: '675f4aaf2b67a23d4c9f2941',
                sessionId: '671018fabc123456789ef015',
                studentId: '675f4aaf2b67a23d4c9f2945',
                totalClasses: 20,
                totalAttendanceRecords: 18,
                presentCount: 15,
                absentCount: 3,
                attendancePercentage: 75,
            },
        },
    }),
    (0, common_1.Get)('stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('courseId')),
    __param(1, (0, common_1.Query)('studentId')),
    __param(2, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Check Pass/Fail status for all students in a class',
        description: 'Determines pass/fail status for all students in a class schedule. ' +
            'Students with ZERO absences = PASS. Students with ANY absence = FAIL. ' +
            'Returns summary with counts and individual student results.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'classScheduleId',
        required: true,
        type: String,
        description: 'Class Schedule ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: true,
        type: String,
        description: 'Course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: true,
        type: String,
        description: 'Session ID from course.sessions array',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Pass/Fail summary for all students',
        type: check_pass_fail_dto_1.PassFailSummary,
        schema: {
            example: {
                classScheduleId: '675f4aaf2b67a23d4c9f2941',
                courseId: '675f4aaf2b67a23d4c9f2942',
                sessionId: '671018fabc123456789ef015',
                totalStudents: 25,
                passedStudents: 18,
                failedStudents: 7,
                results: [
                    {
                        studentId: '675f4aaf2b67a23d4c9f2945',
                        studentName: 'Ali Khan',
                        totalClasses: 20,
                        presentCount: 20,
                        absentCount: 0,
                        result: 'PASS',
                        certificateIssued: false,
                    },
                    {
                        studentId: '675f4aaf2b67a23d4c9f2946',
                        studentName: 'Sara Ahmed',
                        totalClasses: 20,
                        presentCount: 19,
                        absentCount: 1,
                        result: 'FAIL',
                        certificateIssued: false,
                    },
                ],
            },
        },
    }),
    (0, common_1.Get)('pass-fail-check-assigment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_pass_fail_dto_1.CheckPassFailDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkPassFail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Check Pass/Fail status for student assignments',
        description: 'Get pass/fail records for a specific student with pagination support. ' +
            'Returns paginated list of pass/fail records for the student.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: true,
        type: String,
        description: 'Student ID',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Pass/Fail summary for all students',
        type: check_pass_fail_dto_1.PassFailSummary,
        schema: {
            example: {
                classScheduleId: '675f4aaf2b67a23d4c9f2941',
                courseId: '675f4aaf2b67a23d4c9f2942',
                sessionId: '671018fabc123456789ef015',
                totalStudents: 25,
                passedStudents: 18,
                failedStudents: 7,
                results: [
                    {
                        studentId: '675f4aaf2b67a23d4c9f2945',
                        studentName: 'Ali Khan',
                        totalClasses: 20,
                        presentCount: 20,
                        absentCount: 0,
                        result: 'PASS',
                        certificateIssued: false,
                    },
                    {
                        studentId: '675f4aaf2b67a23d4c9f2946',
                        studentName: 'Sara Ahmed',
                        totalClasses: 20,
                        presentCount: 19,
                        absentCount: 1,
                        result: 'FAIL',
                        certificateIssued: false,
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, common_1.Get)('get-results-by-student/:studentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getPassFailRecordsByStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get pass/fail records for operator dashboard',
        description: 'Get all pass/fail records for a course session. Operator can filter by status, approval, and certificate issuance.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: true,
        type: String,
        description: 'Course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: true,
        type: String,
        description: 'Session ID from course.sessions array',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['PASS', 'FAIL'],
        description: 'Filter by pass/fail status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isApproved',
        required: false,
        type: Boolean,
        description: 'Filter by approval status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'certificateIssued',
        required: false,
        type: Boolean,
        description: 'Filter by certificate issued status',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of pass/fail records',
        type: [pass_fail_record_entity_1.PassFailRecordEntity],
    }),
    (0, common_1.Get)('pass-fail-records'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_pass_fail_dto_1.GetPassFailRecordsDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getPassFailRecords", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Approve or reject pass/fail status',
        description: 'Operator approves or rejects a pass/fail record. If approve=true, status is PASS, and certificateUrl is provided, certificate will be issued automatically.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Pass/fail record updated successfully',
        type: pass_fail_record_entity_1.PassFailRecordEntity,
    }),
    (0, common_1.Post)('pass-fail-approve-certificate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_pass_fail_dto_1.ApprovePassFailDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "approvePassFail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get approved pass records ready for certificate issuance',
        description: 'Get all approved PASS records that are ready for certificate issuance (not yet issued).',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: true,
        type: String,
        description: 'Course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sessionId',
        required: true,
        type: String,
        description: 'Session ID from course.sessions array',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of approved pass records ready for certificates',
        type: [pass_fail_record_entity_1.PassFailRecordEntity],
    }),
    (0, common_1.Get)('pass-fail-records/certificate-ready'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('courseId')),
    __param(1, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getCertificateReadyRecords", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get pass/fail record by ID',
        description: 'Fetch a single pass/fail record by its MongoDB ObjectId.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Pass/Fail record MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Pass/fail record details',
        type: pass_fail_record_entity_1.PassFailRecordEntity,
    }),
    (0, common_1.Get)('pass-fail-records/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getPassFailRecordById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get attendance record by ID',
        description: 'Fetch a single attendance record by its MongoDB ObjectId.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Attendance record MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Attendance record details',
        type: attendance_entity_1.AttendanceEntity,
    }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update attendance record',
        description: 'Update attendance status or notes. Typically used to correct mistakes or add notes.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Attendance record MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Attendance record updated successfully',
        type: attendance_entity_1.AttendanceEntity,
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete attendance record',
        description: 'Delete an attendance record by ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Attendance record MongoDB ObjectId',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Attendance record deleted',
        schema: {
            example: { deleted: true },
        },
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Download PDF certificate',
        description: 'Download PDF file from pdfs folder by filename',
    }),
    (0, swagger_1.ApiParam)({
        name: 'filename',
        type: String,
        required: true,
        description: 'PDF filename (e.g., CertificateNo.2.pdf)',
        example: 'CertificateNo.2.pdf',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'PDF file downloaded successfully',
        content: {
            'application/pdf': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Get)('pdf/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "downloadPdf", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)({
        path: 'attendance',
        version: '1',
    }),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendence.controller.js.map