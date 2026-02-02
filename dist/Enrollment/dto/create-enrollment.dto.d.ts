export declare class CreateEnrollmentDto {
    user: string;
    course: string;
    payment?: string;
    offer?: string;
    progress?: number;
    status?: 'active' | 'completed' | 'cancelled';
    completionDate?: Date;
}
