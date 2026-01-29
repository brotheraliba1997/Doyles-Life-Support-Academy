export declare class FilterClassScheduleDto {
    instructorId?: string;
    courseId?: string;
    studentId?: string[];
    status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    startDate?: string;
    endDate?: string;
    search?: string;
}
export declare class SortClassScheduleDto {
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}
