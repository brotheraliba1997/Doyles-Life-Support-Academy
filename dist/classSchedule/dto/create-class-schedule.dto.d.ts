export declare class CreateClassScheduleDto {
    course: string;
    sessionId?: string;
    students: string | string[];
    date?: string;
    time?: string;
    duration?: number;
    googleMeetLink: string;
    securityKey: string;
    status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    progress?: number;
    startedAt?: Date;
    endedAt?: Date;
    googleCalendarEventLink: string;
}
