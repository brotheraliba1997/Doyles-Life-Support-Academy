import { CreateAssessmentItemDto } from './dto/create-assessment-Item.dto';
import { AssessmentItem } from './schema/assessmentItem.schema';
import { AssessmentItemService } from './assessmentItem.services';
import { UpdateAssessmentItemDto } from './dto/update-assessment-item.dto';
export declare class AssessmentItemController {
    private readonly service;
    constructor(service: AssessmentItemService);
    create(dto: CreateAssessmentItemDto): Promise<AssessmentItem>;
    findAll(): Promise<AssessmentItem[]>;
    findByCourse(courseId: string, day: number): Promise<{
        data: AssessmentItem[];
    }>;
    findOne(id: string): Promise<AssessmentItem>;
    findByTest(testId: string): Promise<AssessmentItem[]>;
    update(id: string, dto: UpdateAssessmentItemDto): Promise<AssessmentItem>;
    remove(id: string): Promise<void>;
}
