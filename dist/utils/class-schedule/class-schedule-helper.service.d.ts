import { Model } from 'mongoose';
import { ClassScheduleSchemaClass } from '../../classSchedule/schema/class-schedule.schema';
import { CreateClassScheduleDto } from '../../classSchedule/dto/create-class-schedule.dto';
import { CourseSchemaClass } from '../../course/schema/course.schema';
export declare class ClassScheduleHelperService {
    private readonly classScheduleModel;
    private readonly courseModel;
    private readonly logger;
    constructor(classScheduleModel: Model<ClassScheduleSchemaClass>, courseModel: Model<CourseSchemaClass>);
    addStudentToSchedule(courseId: string, studentId: string, scheduleData?: Partial<CreateClassScheduleDto>): Promise<any>;
}
