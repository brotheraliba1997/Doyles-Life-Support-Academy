import { Types, Document } from 'mongoose';
export declare class StudentItemGrade extends Document {
    studentId: Types.ObjectId;
    assessmentItemId: Types.ObjectId;
    obtainedMarks: number;
}
export declare const StudentItemGradeSchema: import("mongoose").Schema<StudentItemGrade, import("mongoose").Model<StudentItemGrade, any, any, any, Document<unknown, any, StudentItemGrade, any, {}> & StudentItemGrade & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentItemGrade, Document<unknown, {}, import("mongoose").FlatRecord<StudentItemGrade>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<StudentItemGrade> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
