import { AssignmentService } from './assigment.service';
import { AssigmentEntity } from './domain/assigment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ApprovePassFailDto } from './dto/approve-pass-fail.dto';
import { AssignmentPassFailRecordEntity } from './domain/pass-fail-record.entity';
import { FilterAttendanceDto } from '../attendance/dto/query-attendance.dto';
import { CheckPassFailDto } from './dto/check-pass-fail.dto';
export declare class AssigmentController {
    private readonly assigmentService;
    constructor(assigmentService: AssignmentService);
    create(dto: CreateAssignmentDto): Promise<AssigmentEntity>;
    findAll(filters: FilterAttendanceDto): Promise<AssigmentEntity[]>;
    findPaginated(query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<AssigmentEntity>>;
    approvePassFail(dto: ApprovePassFailDto): Promise<AssignmentPassFailRecordEntity>;
    checkPassFail(query: CheckPassFailDto): Promise<import("./dto/check-pass-fail.dto").PassFailSummary>;
}
