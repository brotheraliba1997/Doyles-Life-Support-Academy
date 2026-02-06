import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
import { MailerService } from '../mailer/mailer.service';
import { AllConfigType } from '../config/config.type';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService<AllConfigType>);
    userSignUp(mailData: MailData<{
        hash: string;
    }>): Promise<void>;
    forgotPassword(mailData: MailData<{
        hash: string;
        tokenExpires: number;
        otp: string;
    }>): Promise<void>;
    forgotPasswordReset(mailData: MailData<{
        hash: string;
        tokenExpires: number;
        otp: string;
    }>): Promise<void>;
    confirmNewEmail(mailData: MailData<{
        hash: string;
    }>): Promise<void>;
    lessonScheduled(mailData: MailData<{
        courseName: string;
        instructorName: string;
        lessonDate: string;
        lessonTime: string;
        duration: number;
        googleMeetLink?: string;
    }>): Promise<void>;
    courseCreated(mailData: MailData<{
        courseTitle: string;
        instructorName: string;
        description?: string;
        price?: number;
        courseUrl?: string;
    }>): Promise<void>;
    userRegistered(mailData: MailData<{
        userName: string;
        userEmail: string;
        userRole?: string;
        registrationDate: string;
    }>): Promise<void>;
    purchaseOrderSubmitted(mailData: MailData<{
        poNumber: string;
        studentName?: string;
        courseTitle?: string;
        bankSlipUrl?: string;
        submittedAt?: string;
    }>): Promise<void>;
    purchaseOrderDecision(mailData: MailData<{
        poNumber: string;
        courseTitle?: string;
        status: string;
        decisionNotes?: string;
        reviewedBy?: string;
    }>): Promise<void>;
    paymentConfirmation(mailData: MailData<{
        paymentId: string;
        paymentIntentId?: string;
        studentName?: string;
        studentEmail?: string;
        courseTitle?: string;
        amount: number;
        currency?: string;
        paymentMethod?: string;
        createdAt?: string;
    }>): Promise<void>;
    studentPaymentConfirmation(mailData: MailData<{
        studentName: string;
        courseTitle: string;
        courseMaterialLink: string;
        courseMaterials?: Array<{
            name: string;
            type: string;
            link?: string;
        }>;
        amount: number;
        currency?: string;
        paymentDate: string;
    }>): Promise<void>;
    enquirySubmitted(mailData: MailData<{
        subject: string;
        name: string;
        email: string;
        phone?: string;
        company?: string;
        designation?: string;
        industry?: string;
        trainingType?: string;
    }>): Promise<void>;
}
