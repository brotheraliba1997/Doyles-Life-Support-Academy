import { CreateAttendanceDto } from './create-attendance.dto';
import { AttendanceStatusEnum } from '../schema/attendance.schema';
declare const UpdateAttendanceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAttendanceDto>>;
export declare class UpdateAttendanceDto extends UpdateAttendanceDto_base {
    status?: AttendanceStatusEnum;
    notes?: string;
}
export {};
