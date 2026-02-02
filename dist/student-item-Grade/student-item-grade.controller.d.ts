import { StudentItemGradeService } from './student-item-grade.service';
import { UpdateStudentItemGradeDto } from './dto/update-student-item-grade.dto';
import { createManyStudentItemGradeDto } from './dto/create-student-item-grade.dto';
export declare class StudentItemGradeController {
    private readonly gradeService;
    constructor(gradeService: StudentItemGradeService);
    createOrUpdate(dto: createManyStudentItemGradeDto): Promise<any[]>;
    findByStudent(studentId: string): Promise<any[]>;
    update(id: string, dto: UpdateStudentItemGradeDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
