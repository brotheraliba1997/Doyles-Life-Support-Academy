import { Model } from 'mongoose';
import { AttendanceSchemaClass } from './schema/attendance.schema';
import { CourseSchemaClass } from '../course/schema/course.schema';
import { ClassScheduleSchemaClass } from '../classSchedule/schema/class-schedule.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { BulkMarkAttendanceDto } from './dto/bulk-mark-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { FilterAttendanceDto } from './dto/query-attendance.dto';
import { AttendanceEntity } from './domain/attendance.entity';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CheckPassFailDto, CheckPassFailStudentDto, PassFailSummary } from './dto/check-pass-fail.dto';
import { PassFailRecordSchemaClass } from './schema/pass-fail-record.schema';
import { PassFailRecordEntity } from './domain/pass-fail-record.entity';
import { ApprovePassFailDto, GetPassFailRecordsDto } from './dto/approve-pass-fail.dto';
import { AssignmentSchemaClass } from '../assigment/schema/assigment.schema';
export declare class AttendanceService {
    private readonly attendanceModel;
    private readonly assignmentModel;
    private readonly courseModel;
    private readonly passFailRecordModel;
    private readonly classScheduleModel;
    constructor(attendanceModel: Model<AttendanceSchemaClass>, assignmentModel: Model<AssignmentSchemaClass>, courseModel: Model<CourseSchemaClass>, passFailRecordModel: Model<PassFailRecordSchemaClass>, classScheduleModel: Model<ClassScheduleSchemaClass>);
    private readonly attendancePopulate;
    private map;
    create(dto: CreateAttendanceDto, instructorId: string): Promise<AttendanceEntity>;
    bulkMark(dto: BulkMarkAttendanceDto, instructorId: string): Promise<{
        created: number;
        updated: number;
        total: number;
        records: AttendanceEntity[];
    }>;
    findAll(filters?: FilterAttendanceDto): Promise<AttendanceEntity[]>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterAttendanceDto | null;
        sortOptions?: Array<{
            orderBy?: string;
            order?: 'ASC' | 'DESC';
        }> | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<AttendanceEntity>>;
    findOne(id: string): Promise<AttendanceEntity | undefined>;
    update(id: string, dto: UpdateAttendanceDto): Promise<AttendanceEntity>;
    remove(id: string): Promise<boolean>;
    getAttendanceStats(courseId: string, studentId: string, sessionId: string): Promise<{
        courseId: string;
        sessionId: string;
        studentId: string;
        totalClasses: number;
        totalAttendanceRecords: number;
        presentCount: number;
        absentCount: number;
        attendancePercentage: number;
    }>;
    private mapPassFailRecord;
    checkPassFailStatus(dto: CheckPassFailDto): Promise<PassFailSummary>;
    getPassFailRecordsByStudent(dto: CheckPassFailStudentDto, paginationOptions: IPaginationOptions): Promise<PaginationResult<PassFailRecordEntity>>;
    getPassFailRecords(dto: GetPassFailRecordsDto): Promise<PassFailRecordEntity[]>;
    approvePassFailStatus(dto: ApprovePassFailDto, operatorId: string): Promise<PassFailRecordEntity>;
    getPassFailRecordById(id: string): Promise<PassFailRecordEntity | undefined>;
    getApprovedPassRecordsForCertificates(courseId: string, sessionId: string): Promise<PassFailRecordEntity[]>;
    markCertificateIssued(recordId: string, certificateId: string): Promise<PassFailRecordEntity>;
}
