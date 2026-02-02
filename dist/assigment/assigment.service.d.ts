import { Model } from 'mongoose';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AssignmentSchemaClass } from './schema/assigment.schema';
import { AssigmentEntity } from './domain/assigment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { FilterAttendanceDto } from '../attendance/dto/query-attendance.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentPassFailRecordEntity } from './domain/pass-fail-record.entity';
import { ApprovePassFailDto } from './dto/approve-pass-fail.dto';
import { AssigmentPassFailRecordSchemaClass } from './schema/pass-fail-record.schema';
import { CheckPassFailDto, PassFailSummary } from './dto/check-pass-fail.dto';
export declare class AssignmentService {
    private readonly assigmenteModel;
    private readonly passFailRecordModel;
    constructor(assigmenteModel: Model<AssignmentSchemaClass>, passFailRecordModel: Model<AssigmentPassFailRecordSchemaClass>);
    private readonly assigmentePopulate;
    private map;
    private mapPassFailRecord;
    create(dto: CreateAssignmentDto, instructorId: string): Promise<AssigmentEntity>;
    findAll(filters?: FilterAttendanceDto): Promise<AssigmentEntity[]>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterAttendanceDto | null;
        sortOptions?: Array<{
            orderBy?: string;
            order?: 'ASC' | 'DESC';
        }> | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<AssigmentEntity>>;
    update(id: string, dto: UpdateAssignmentDto): Promise<AssigmentEntity>;
    approvePassFailStatus(dto: ApprovePassFailDto, operatorId: string): Promise<AssignmentPassFailRecordEntity>;
    checkPassFailStatus(dto: CheckPassFailDto): Promise<PassFailSummary>;
}
