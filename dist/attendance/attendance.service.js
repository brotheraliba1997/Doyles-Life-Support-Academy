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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("./schema/attendance.schema");
const course_schema_1 = require("../course/schema/course.schema");
const class_schedule_schema_1 = require("../classSchedule/schema/class-schedule.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const convert_id_1 = require("../utils/convert-id");
const pass_fail_record_schema_1 = require("./schema/pass-fail-record.schema");
const pass_fail_record_schema_2 = require("./schema/pass-fail-record.schema");
const pdfs_1 = __importDefault(require("../utils/pdf-download/pdfs"));
const assigment_schema_1 = require("../assigment/schema/assigment.schema");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel, assignmentModel, courseModel, passFailRecordModel, classScheduleModel) {
        this.attendanceModel = attendanceModel;
        this.assignmentModel = assignmentModel;
        this.courseModel = courseModel;
        this.passFailRecordModel = passFailRecordModel;
        this.classScheduleModel = classScheduleModel;
        this.attendancePopulate = [
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
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            classScheduleId: sanitized.classScheduleId,
            courseId: sanitized.courseId,
            sessionId: sanitized.sessionId,
            student: sanitized.student,
            markedBy: sanitized.markedBy,
            status: sanitized.status,
            notes: sanitized.notes,
            markedAt: sanitized.markedAt,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    async create(dto, instructorId) {
        const existing = await this.attendanceModel
            .findOne({
            classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
            student: new mongoose_2.Types.ObjectId(dto.studentId),
        })
            .lean();
        if (existing) {
            const updated = await this.attendanceModel
                .findByIdAndUpdate(existing._id, {
                classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
                courseId: new mongoose_2.Types.ObjectId(dto.courseId),
                sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
                status: dto.status,
                notes: dto.notes,
                markedBy: new mongoose_2.Types.ObjectId(instructorId),
                markedAt: new Date(),
            }, { new: true })
                .populate(this.attendancePopulate)
                .lean();
            return this.map(updated);
        }
        const created = await this.attendanceModel.create({
            classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
            courseId: new mongoose_2.Types.ObjectId(dto.courseId),
            sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
            student: new mongoose_2.Types.ObjectId(dto.studentId),
            markedBy: new mongoose_2.Types.ObjectId(instructorId),
            status: dto.status,
            notes: dto.notes,
            markedAt: new Date(),
        });
        const populated = await this.attendanceModel
            .findById(created._id)
            .populate(this.attendancePopulate)
            .lean();
        return this.map(populated);
    }
    async bulkMark(dto, instructorId) {
        if (!dto.students || dto.students.length === 0) {
            throw new common_1.BadRequestException('No students provided for attendance');
        }
        const find = new mongoose_2.Types.ObjectId(dto.sessionId);
        console.log(find, 'find==>');
        const courseId = new mongoose_2.Types.ObjectId(dto.courseId);
        const session = await this.courseModel
            .findById(courseId)
            .select('sessions')
            .lean();
        const sessionData = session.sessions.find((s) => s._id?.toString() === dto.sessionId || s.id === dto.sessionId);
        const classSchedule = await this.classScheduleModel
            .findById(new mongoose_2.Types.ObjectId(dto.classScheduleId))
            .lean();
        if (!classSchedule) {
            throw new common_1.NotFoundException('ClassSchedule not found');
        }
        const timeBlocksCount = sessionData?.timeBlocks?.length || 0;
        let classLeftList = classSchedule.ClassLeftList || [];
        if (classLeftList.length !== timeBlocksCount) {
            classLeftList = Array(timeBlocksCount).fill(false);
        }
        if (sessionData?.timeBlocks && Array.isArray(sessionData.timeBlocks)) {
            sessionData.timeBlocks.forEach((tb, index) => {
                const isDateMatch = dto.startDate === tb.startDate;
                const isTimeMatch = dto.startTime === tb.startTime;
                if (isDateMatch && isTimeMatch) {
                    console.log(index, 'index==>');
                    classLeftList[index] = true;
                }
            });
        }
        await this.classScheduleModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(dto.classScheduleId), { ClassLeftList: classLeftList }, { new: true });
        let createdCount = 0;
        let updatedCount = 0;
        const records = [];
        const maxBlocksPerStudent = Math.max(timeBlocksCount, 1);
        for (const studentAttendance of dto.students) {
            const studentId = new mongoose_2.Types.ObjectId(studentAttendance.studentId);
            const existingAttendance = await this.attendanceModel
                .findOne({
                courseId: courseId,
                classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
                sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
                startDate: dto.startDate,
                startTime: dto.startTime,
                student: studentId,
            })
                .lean();
            if (existingAttendance) {
                console.log(`Attendance already exists for student ${studentAttendance.studentId} with same courseId, classScheduleId, sessionId, date (${dto.startDate}), and time (${dto.startTime}). Skipping...`);
                continue;
            }
            const existingCount = await this.attendanceModel.countDocuments({
                classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
                sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
                student: studentId,
            });
            if (existingCount >= maxBlocksPerStudent) {
                throw new common_1.BadRequestException(`The attendance limit for this session has been reached. Please proceed with the assignment now `);
            }
            const created = await this.attendanceModel.create({
                classScheduleId: new mongoose_2.Types.ObjectId(dto.classScheduleId),
                courseId: courseId,
                sessionId: new mongoose_2.Types.ObjectId(dto.sessionId),
                student: studentId,
                markedBy: new mongoose_2.Types.ObjectId(instructorId),
                status: studentAttendance.status,
                startDate: dto.startDate,
                startTime: dto.startTime,
                markedAt: new Date(),
            });
            const populated = await this.attendanceModel
                .findById(created._id)
                .populate(this.attendancePopulate)
                .lean();
            if (populated) {
                records.push(this.map(populated));
                createdCount++;
            }
        }
        return {
            created: createdCount,
            updated: updatedCount,
            total: records.length,
            records,
        };
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
        const docs = await this.attendanceModel
            .find(filterQuery)
            .populate(this.attendancePopulate)
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
            model: this.attendanceModel,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: this.attendancePopulate,
            mapper: (doc) => this.map(doc),
        });
    }
    async findOne(id) {
        const doc = await this.attendanceModel
            .findById(id)
            .populate(this.attendancePopulate)
            .lean();
        return doc ? this.map(doc) : undefined;
    }
    async update(id, dto) {
        const updatePayload = {};
        if (dto.status !== undefined) {
            updatePayload.status = dto.status;
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
        if (dto.status !== undefined || dto.notes !== undefined) {
            updatePayload.markedAt = new Date();
        }
        const updated = await this.attendanceModel
            .findByIdAndUpdate(id, updatePayload, { new: true })
            .populate(this.attendancePopulate)
            .lean();
        if (!updated) {
            throw new common_1.NotFoundException('Attendance record not found');
        }
        return this.map(updated);
    }
    async remove(id) {
        const result = await this.attendanceModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async getAttendanceStats(courseId, studentId, sessionId) {
        const course = await this.courseModel.findById(courseId).lean();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const session = course.sessions?.find((s) => s._id?.toString() === sessionId || s.id === sessionId);
        if (!session) {
            throw new common_1.NotFoundException(`Session with ID ${sessionId} not found in course`);
        }
        let totalClasses = 0;
        if (session.timeBlocks && Array.isArray(session.timeBlocks)) {
            session.timeBlocks.forEach((block) => {
                if (block.startDate && block.endDate) {
                    const start = new Date(block.startDate);
                    const end = new Date(block.endDate);
                    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    totalClasses += daysDiff;
                }
            });
        }
        const totalAttendanceRecords = await this.attendanceModel.countDocuments({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            student: new mongoose_2.Types.ObjectId(studentId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
        });
        const presentCount = await this.attendanceModel.countDocuments({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            student: new mongoose_2.Types.ObjectId(studentId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
            status: 'present',
        });
        const absentCount = await this.attendanceModel.countDocuments({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            student: new mongoose_2.Types.ObjectId(studentId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
            status: 'absent',
        });
        const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;
        return {
            courseId,
            sessionId,
            studentId,
            totalClasses,
            totalAttendanceRecords,
            presentCount,
            absentCount,
            attendancePercentage,
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
            status: sanitized.status,
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
    async checkPassFailStatus(dto) {
        const { courseId, sessionId } = dto;
        const query = {
            courseId: new mongoose_2.Types.ObjectId(courseId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
        };
        const assignmentRecords = await this.assignmentModel
            .find(query)
            .populate('student', 'firstName lastName email')
            .lean();
        const attendanceRecords = await this.attendanceModel
            .find(query)
            .populate('student', 'firstName lastName email')
            .lean();
        if (!attendanceRecords || attendanceRecords.length === 0) {
            throw new common_1.NotFoundException('No attendance records found for this course and session');
        }
        const studentAttendanceMap = new Map();
        attendanceRecords.forEach((record) => {
            const studentId = record.student?._id?.toString() || record.student?.toString();
            if (!studentAttendanceMap.has(studentId)) {
                studentAttendanceMap.set(studentId, {
                    attendance: [],
                    assignments: [],
                });
            }
            studentAttendanceMap.get(studentId)?.attendance.push(record);
        });
        assignmentRecords.forEach((record) => {
            const studentId = record.student?._id?.toString() || record.student?.toString();
            if (!studentAttendanceMap.has(studentId)) {
                studentAttendanceMap.set(studentId, {
                    attendance: [],
                    assignments: [],
                });
            }
            studentAttendanceMap.get(studentId)?.assignments.push(record);
        });
        const results = [];
        let passedCount = 0;
        let failedCount = 0;
        for (const [studentId, data] of studentAttendanceMap.entries()) {
            const records = data.attendance;
            const assignments = data.assignments;
            const student = records[0]?.student || assignments[0]?.student;
            const presentCount = records.filter((r) => r.status === 'present').length;
            const absentCount = records.filter((r) => r.status === 'absent').length;
            const totalClasses = records.length;
            const totalMarks = assignments.reduce((sum, a) => sum + (a.marks || 0), 0);
            const averageMarks = assignments.length > 0 ? totalMarks / assignments.length : 0;
            const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;
            const result = absentCount === 0 ? pass_fail_record_schema_2.PassFailStatusEnum.PASS : pass_fail_record_schema_2.PassFailStatusEnum.FAIL;
            if (result === pass_fail_record_schema_2.PassFailStatusEnum.PASS) {
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
                absentCount,
                attendancePercentage,
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
                totalMarks,
                averageMarks,
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
    async getPassFailRecordsByStudent(dto, paginationOptions) {
        const { studentId } = dto;
        const query = {
            studentId: new mongoose_2.Types.ObjectId(studentId),
        };
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.passFailRecordModel,
            filterQuery: query,
            sortOptions: [
                { orderBy: 'status', order: 'ASC' },
                { orderBy: 'determinedAt', order: 'DESC' },
            ],
            paginationOptions,
            populateFields: [
                { path: 'studentId', select: 'firstName lastName email' },
                { path: 'approvedBy', select: 'firstName lastName email' },
                { path: 'courseId', select: 'title description' },
            ],
            mapper: (doc) => this.mapPassFailRecord(doc),
        });
    }
    async getPassFailRecords(dto) {
        const { courseId, sessionId, status, isApproved, certificateIssued } = dto;
        const query = {
            courseId: new mongoose_2.Types.ObjectId(courseId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
        };
        if (status) {
            query.status = status;
        }
        if (isApproved !== undefined) {
            query.isApproved = isApproved;
        }
        if (certificateIssued !== undefined) {
            query.certificateIssued = certificateIssued;
        }
        const records = await this.passFailRecordModel
            .find(query)
            .populate('studentId', 'firstName lastName email')
            .populate('approvedBy', 'firstName lastName email')
            .sort({ status: 1, determinedAt: -1 })
            .lean();
        return records.map((doc) => this.mapPassFailRecord(doc));
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
            if (record.status === pass_fail_record_schema_2.PassFailStatusEnum.PASS &&
                finalCertificateUrl &&
                !record.certificateIssued) {
                updateData.certificateIssued = true;
                updateData.certificateUrl = finalCertificateUrl;
            }
        }
        else {
            updateData.approvedBy = null;
            updateData.approvedAt = null;
        }
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
    async getPassFailRecordById(id) {
        const record = await this.passFailRecordModel
            .findById(id)
            .populate('studentId', 'firstName lastName email')
            .populate('approvedBy', 'firstName lastName email')
            .lean();
        return record ? this.mapPassFailRecord(record) : undefined;
    }
    async getApprovedPassRecordsForCertificates(courseId, sessionId) {
        const records = await this.passFailRecordModel
            .find({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            sessionId: new mongoose_2.Types.ObjectId(sessionId),
            status: pass_fail_record_schema_2.PassFailStatusEnum.PASS,
            isApproved: true,
            certificateIssued: false,
        })
            .populate('studentId', 'firstName lastName email')
            .sort({ determinedAt: -1 })
            .lean();
        return records.map((doc) => this.mapPassFailRecord(doc));
    }
    async markCertificateIssued(recordId, certificateId) {
        const record = await this.passFailRecordModel.findById(recordId).lean();
        if (!record) {
            throw new common_1.NotFoundException('Pass/Fail record not found');
        }
        if (record.status !== pass_fail_record_schema_2.PassFailStatusEnum.PASS) {
            throw new common_1.BadRequestException('Only PASS records can have certificates issued');
        }
        if (!record.isApproved) {
            throw new common_1.BadRequestException('Record must be approved before certificate can be issued');
        }
        if (record.certificateIssued) {
            throw new common_1.BadRequestException('Certificate already issued for this record');
        }
        const updated = await this.passFailRecordModel
            .findByIdAndUpdate(recordId, {
            certificateIssued: true,
            certificateId: new mongoose_2.Types.ObjectId(certificateId),
        }, { new: true })
            .populate('studentId', 'firstName lastName email')
            .lean();
        return this.mapPassFailRecord(updated);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.AttendanceSchemaClass.name)),
    __param(1, (0, mongoose_1.InjectModel)(assigment_schema_1.AssignmentSchemaClass.name)),
    __param(2, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __param(3, (0, mongoose_1.InjectModel)(pass_fail_record_schema_1.PassFailRecordSchemaClass.name)),
    __param(4, (0, mongoose_1.InjectModel)(class_schedule_schema_1.ClassScheduleSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map