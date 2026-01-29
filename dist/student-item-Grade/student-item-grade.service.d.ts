import { Model } from 'mongoose';
import { UpdateStudentItemGradeDto } from './dto/update-student-item-grade.dto';
import { StudentItemGrade } from './schema/student-item-grade.schema';
import { createManyStudentItemGradeDto } from './dto/create-student-item-grade.dto';
export declare class StudentItemGradeService {
    private readonly gradeModel;
    constructor(gradeModel: Model<StudentItemGrade>);
    private map;
    private mapAssessmentItem;
    createOrUpdate(dto: createManyStudentItemGradeDto): Promise<any[]>;
    findByStudent(studentId: string): Promise<any[]>;
    update(id: string, dto: UpdateStudentItemGradeDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
