import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Enrollment } from './interfaces/enrollment.interface';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    findPaginated(query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<Enrollment>>;
    findOne(id: string): Promise<Enrollment | undefined>;
    update(id: string, updateEnrollmentDto: Partial<CreateEnrollmentDto>): Promise<Enrollment | undefined>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
