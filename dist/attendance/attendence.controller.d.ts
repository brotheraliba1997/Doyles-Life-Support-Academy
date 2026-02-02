import { Response } from 'express';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { BulkMarkAttendanceDto } from './dto/bulk-mark-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { FilterAttendanceDto } from './dto/query-attendance.dto';
import { AttendanceEntity } from './domain/attendance.entity';
import { AttendanceService } from './attendance.service';
import { CheckPassFailDto, PassFailSummary } from './dto/check-pass-fail.dto';
import { ApprovePassFailDto, GetPassFailRecordsDto } from './dto/approve-pass-fail.dto';
import { PassFailRecordEntity } from './domain/pass-fail-record.entity';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(dto: CreateAttendanceDto): Promise<AttendanceEntity>;
    bulkMark(dto: BulkMarkAttendanceDto): Promise<{
        created: number;
        updated: number;
        total: number;
        records: AttendanceEntity[];
    }>;
    findAll(filters: FilterAttendanceDto): Promise<AttendanceEntity[]>;
    findPaginated(query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<AttendanceEntity>>;
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
    checkPassFail(query: CheckPassFailDto): Promise<PassFailSummary>;
    getPassFailRecordsByStudent(studentId: string, query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<PassFailRecordEntity>>;
    getPassFailRecords(query: GetPassFailRecordsDto): Promise<PassFailRecordEntity[]>;
    approvePassFail(dto: ApprovePassFailDto): Promise<PassFailRecordEntity>;
    getCertificateReadyRecords(courseId: string, sessionId: string): Promise<PassFailRecordEntity[]>;
    getPassFailRecordById(id: string): Promise<PassFailRecordEntity>;
    findOne(id: string): Promise<AttendanceEntity>;
    update(id: string, dto: UpdateAttendanceDto): Promise<AttendanceEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    downloadPdf(filename: string, res: Response): Promise<void>;
}
