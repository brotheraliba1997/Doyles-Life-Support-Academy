import { Types } from 'mongoose';
export declare class CreateAssessmentItemDto {
    courseId: Types.ObjectId;
    day: string;
    topicRef: string;
    title: string;
    cu: string;
    maxMarks: number;
}
