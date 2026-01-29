import { Model } from 'mongoose';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Enrollment } from './interfaces/enrollment.interface';
import { EnrollmentSchemaClass } from '../Enrollment/infrastructure/enrollments.schema';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class EnrollmentService {
    private readonly enrollmentModel;
    constructor(enrollmentModel: Model<EnrollmentSchemaClass>);
    private map;
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: {
            userId?: string;
            courseId?: string;
            status?: string;
        } | null;
        sortOptions?: Array<{
            orderBy?: string;
            order?: 'ASC' | 'DESC';
        }> | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Enrollment>>;
    findOne(id: string): Promise<Enrollment | undefined>;
    update(id: string, updateData: Partial<CreateEnrollmentDto>): Promise<Enrollment | undefined>;
    remove(id: string): Promise<boolean>;
}
