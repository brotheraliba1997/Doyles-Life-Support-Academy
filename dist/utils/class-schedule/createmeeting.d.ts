import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { MailService } from '../../mail/mail.service';
import { Model } from 'mongoose';
import { ClassScheduleSchemaClass } from '../../classSchedule/schema/class-schedule.schema';
export declare function createGoogleMeetLink(oauth2Client: any, accessToken: string, refreshToken: string, eventData: {
    date: string;
    time: string;
    duration: number;
    summary?: string;
    description?: string;
}): Promise<{
    googleMeetLink: string;
    googleCalendarEventLink: string;
    eventId: string;
}>;
export declare function sendScheduleEmails(mailService: MailService, configService: ConfigService<AllConfigType>, classScheduleModel: Model<ClassScheduleSchemaClass>, scheduleId: string): Promise<{
    success: boolean;
    message: string;
    results?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    results: {
        admin: boolean;
        instructor: boolean;
        students: boolean[];
    };
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
    results?: undefined;
}>;
export declare function createClassWithMeetAndEmail(params: {
    oauth2Client: any;
    accessToken: string;
    refreshToken: string;
    mailService: MailService;
    configService: ConfigService<AllConfigType>;
    classScheduleModel: Model<ClassScheduleSchemaClass>;
    scheduleData: {
        date: string;
        time: string;
        duration: number;
        course: string;
        instructor: string;
        students: string[];
    };
}): Promise<{
    success: boolean;
    schedule: import("mongoose").Document<unknown, {}, ClassScheduleSchemaClass, {}, {}> & ClassScheduleSchemaClass & Required<{
        _id: string;
    }> & {
        __v: number;
    };
    meetLink: string;
    emailsSent: boolean;
}>;
