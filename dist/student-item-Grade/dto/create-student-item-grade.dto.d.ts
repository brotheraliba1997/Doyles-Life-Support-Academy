export declare class CreateStudentItemGradeDto {
    studentId: string;
    assessmentItemId: string;
    obtainedMarks: number;
}
export declare class createManyStudentItemGradeDto {
    grades: CreateStudentItemGradeDto[];
}
