import { Model } from 'mongoose';
import { ClassScheduleSchemaClass } from '../../classSchedule/schema/class-schedule.schema';
import { CreateClassScheduleDto } from '../../classSchedule/dto/create-class-schedule.dto';
export declare function AddStudentToClassScheduleService(classScheduleModel: Model<ClassScheduleSchemaClass>, courseId: string, studentId: string, scheduleData?: Partial<CreateClassScheduleDto>): Promise<any>;
