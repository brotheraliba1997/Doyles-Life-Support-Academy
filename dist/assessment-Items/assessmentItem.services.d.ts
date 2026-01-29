import { Model } from 'mongoose';
import { UpdateAssessmentItemDto } from './dto/update-assessment-item.dto';
import { CreateAssessmentItemDto } from './dto/create-assessment-Item.dto';
import { AssessmentItem } from './schema/AssessmentItem.schema';
export declare class AssessmentItemService {
    private readonly assessmentItemModel;
    constructor(assessmentItemModel: Model<AssessmentItem>);
    private map;
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
