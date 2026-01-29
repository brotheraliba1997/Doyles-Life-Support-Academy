import { Document, Types } from 'mongoose';
export declare class AssessmentItem extends Document {
    courseId: Types.ObjectId;
    day: string;
    topicRef: string;
    title: string;
    cu: string;
    maxMarks: string;
}
export declare const AssessmentItemSchema: import("mongoose").Schema<AssessmentItem, import("mongoose").Model<AssessmentItem, any, any, any, Document<unknown, any, AssessmentItem, any, {}> & AssessmentItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AssessmentItem, Document<unknown, {}, import("mongoose").FlatRecord<AssessmentItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AssessmentItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
