"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_i18n_1 = require("nestjs-i18n");
const mailer_service_1 = require("../mailer/mailer.service");
const path_1 = __importDefault(require("path"));
let MailService = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async userSignUp(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let emailConfirmTitle;
        let text1;
        let text2;
        let text3;
        if (i18n) {
            [emailConfirmTitle, text1, text2, text3] = await Promise.all([
                i18n.t('common.confirmEmail'),
                i18n.t('confirm-email.text1'),
                i18n.t('confirm-email.text2'),
                i18n.t('confirm-email.text3'),
            ]);
        }
        const url = new URL(this.configService.getOrThrow('app.frontendDomain', {
            infer: true,
        }) + '/confirm-email');
        url.searchParams.set('hash', mailData.data.hash);
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: emailConfirmTitle,
            text: `${url.toString()} ${emailConfirmTitle}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'activation.hbs'),
            context: {
                title: emailConfirmTitle,
                url: url.toString(),
                actionTitle: emailConfirmTitle,
                app_name: this.configService.get('app.name', { infer: true }),
                text1,
                text2,
                text3,
            },
        });
    }
    async forgotPassword(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let resetPasswordTitle;
        let text1;
        let text2;
        let text3;
        let text4;
        if (i18n) {
            [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
                i18n.t('common.resetPassword'),
                i18n.t('reset-password.text1'),
                i18n.t('reset-password.text2'),
                i18n.t('reset-password.text3'),
                i18n.t('reset-password.text4'),
            ]);
        }
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: resetPasswordTitle,
            text: `${resetPasswordTitle} - OTP: ${mailData.data.otp}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', { infer: true }), 'src', 'mail', 'mail-templates', 'reset-password.hbs'),
            context: {
                title: resetPasswordTitle,
                app_name: this.configService.get('app.name', {
                    infer: true,
                }),
                text1,
                text2,
                text3,
                text4,
                otp: mailData.data.otp,
            },
        });
    }
    async forgotPasswordReset(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let resetPasswordTitle;
        let text1;
        let text2;
        let text3;
        let text4;
        if (i18n) {
            [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
                i18n.t('common.resetPassword'),
                i18n.t('reset-password.text1'),
                i18n.t('reset-password.text2'),
                i18n.t('reset-password.text3'),
                i18n.t('reset-password.text4'),
            ]);
        }
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: resetPasswordTitle,
            text: `${resetPasswordTitle} - OTP: ${mailData.data.otp}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', { infer: true }), 'src', 'mail', 'mail-templates', 'reset-password.hbs'),
            context: {
                title: resetPasswordTitle,
                app_name: this.configService.get('app.name', {
                    infer: true,
                }),
                text1,
                text2,
                text3,
                text4,
                otp: mailData.data.otp,
            },
        });
    }
    async confirmNewEmail(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let emailConfirmTitle;
        let text1;
        let text2;
        let text3;
        if (i18n) {
            [emailConfirmTitle, text1, text2, text3] = await Promise.all([
                i18n.t('common.confirmEmail'),
                i18n.t('confirm-new-email.text1'),
                i18n.t('confirm-new-email.text2'),
                i18n.t('confirm-new-email.text3'),
            ]);
        }
        const url = new URL(this.configService.getOrThrow('app.frontendDomain', {
            infer: true,
        }) + '/confirm-new-email');
        url.searchParams.set('hash', mailData.data.hash);
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: emailConfirmTitle,
            text: `${url.toString()} ${emailConfirmTitle}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'confirm-new-email.hbs'),
            context: {
                title: emailConfirmTitle,
                url: url.toString(),
                actionTitle: emailConfirmTitle,
                app_name: this.configService.get('app.name', { infer: true }),
                text1,
                text2,
                text3,
            },
        });
    }
    async lessonScheduled(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let title;
        let text1;
        let text2;
        let text3;
        if (i18n) {
            [title, text1, text2, text3] = await Promise.all([
                i18n.t('lesson-scheduled.title'),
                i18n.t('lesson-scheduled.text1'),
                i18n.t('lesson-scheduled.text2'),
                i18n.t('lesson-scheduled.text3'),
            ]);
        }
        if (!title)
            title = 'New Lesson Scheduled';
        if (!text1)
            text1 = 'A new lesson has been scheduled for your course.';
        if (!text2)
            text2 =
                'Please make sure to join the session at the scheduled time. You can join using the Google Meet link below.';
        if (!text3)
            text3 =
                'If you have any questions or need to reschedule, please contact your instructor.';
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: title,
            text: `${title} - ${mailData.data.courseName} on ${mailData.data.lessonDate} at ${mailData.data.lessonTime}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'lesson-scheduled.hbs'),
            context: {
                title,
                text1,
                text2,
                text3,
                courseName: mailData.data.courseName,
                instructorName: mailData.data.instructorName,
                lessonDate: mailData.data.lessonDate,
                lessonTime: mailData.data.lessonTime,
                duration: mailData.data.duration,
                googleMeetLink: mailData.data.googleMeetLink,
                app_name: this.configService.get('app.name', { infer: true }),
            },
        });
    }
    async courseCreated(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let title;
        let text1;
        let text2;
        let text3;
        if (i18n) {
            [title, text1, text2, text3] = await Promise.all([
                i18n.t('course-created.title'),
                i18n.t('course-created.text1'),
                i18n.t('course-created.text2'),
                i18n.t('course-created.text3'),
            ]);
        }
        if (!title)
            title = 'New Course Created';
        if (!text1)
            text1 = 'Congratulations! Your course has been successfully created.';
        if (!text2)
            text2 =
                'Students can now enroll in your course. You can start adding modules and lessons to make it even better.';
        if (!text3)
            text3 =
                'Thank you for contributing to our learning platform. If you need any assistance, feel free to contact us.';
        const url = mailData.data.courseUrl
            ? mailData.data.courseUrl
            : `${this.configService.getOrThrow('app.frontendDomain', { infer: true })}/courses`;
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: title,
            text: `${title} - ${mailData.data.courseTitle}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'course-created.hbs'),
            context: {
                title,
                text1,
                text2,
                text3,
                courseTitle: mailData.data.courseTitle,
                instructorName: mailData.data.instructorName,
                description: mailData.data.description,
                price: mailData.data.price,
                url,
                app_name: this.configService.get('app.name', { infer: true }),
            },
        });
    }
    async userRegistered(mailData) {
        const i18n = nestjs_i18n_1.I18nContext.current();
        let title;
        let text1;
        let text2;
        if (i18n) {
            [title, text1, text2] = await Promise.all([
                i18n.t('user-registered.title'),
                i18n.t('user-registered.text1'),
                i18n.t('user-registered.text2'),
            ]);
        }
        if (!title)
            title = 'New User Registration';
        if (!text1)
            text1 =
                'A new user has registered on the platform. Here are the details:';
        if (!text2)
            text2 = 'Please review the user account and take any necessary actions.';
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: title,
            text: `${title} - ${mailData.data.userName} (${mailData.data.userEmail})`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'user-registered.hbs'),
            context: {
                title,
                text1,
                text2,
                userName: mailData.data.userName,
                userEmail: mailData.data.userEmail,
                userRole: mailData.data.userRole,
                registrationDate: mailData.data.registrationDate,
                app_name: this.configService.get('app.name', { infer: true }),
            },
        });
    }
    async purchaseOrderSubmitted(mailData) {
        const subject = `Purchase Order ${mailData.data.poNumber} submitted`;
        const lines = [
            `Purchase Order Number: ${mailData.data.poNumber}`,
            mailData.data.studentName
                ? `Student: ${mailData.data.studentName}`
                : undefined,
            mailData.data.courseTitle
                ? `Course: ${mailData.data.courseTitle}`
                : undefined,
            mailData.data.submittedAt
                ? `Submitted At: ${mailData.data.submittedAt}`
                : undefined,
            mailData.data.bankSlipUrl
                ? `Bank Slip: ${mailData.data.bankSlipUrl}`
                : undefined,
        ].filter(Boolean);
        const text = lines.join('\n');
        await this.mailerService.sendMail({
            to: mailData.to,
            subject,
            text,
        });
    }
    async purchaseOrderDecision(mailData) {
        const subject = `Purchase Order ${mailData.data.poNumber} ${mailData.data.status}`;
        const lines = [
            `Purchase Order Number: ${mailData.data.poNumber}`,
            mailData.data.courseTitle
                ? `Course: ${mailData.data.courseTitle}`
                : undefined,
            `Status: ${mailData.data.status}`,
            mailData.data.reviewedBy
                ? `Reviewed By: ${mailData.data.reviewedBy}`
                : undefined,
            mailData.data.decisionNotes
                ? `Notes: ${mailData.data.decisionNotes}`
                : undefined,
        ].filter(Boolean);
        const text = lines.join('\n');
        await this.mailerService.sendMail({
            to: mailData.to,
            subject,
            text,
        });
    }
    async paymentConfirmation(mailData) {
        const subject = `Payment Confirmation - ${mailData.data.paymentId}`;
        const lines = [
            `Payment ID: ${mailData.data.paymentId}`,
            mailData.data.paymentIntentId
                ? `Payment Intent ID: ${mailData.data.paymentIntentId}`
                : undefined,
            mailData.data.studentName
                ? `Student: ${mailData.data.studentName}`
                : undefined,
            mailData.data.studentEmail
                ? `Student Email: ${mailData.data.studentEmail}`
                : undefined,
            mailData.data.courseTitle
                ? `Course: ${mailData.data.courseTitle}`
                : undefined,
            `Amount: ${mailData.data.amount} ${mailData.data.currency || 'USD'}`,
            mailData.data.paymentMethod
                ? `Payment Method: ${mailData.data.paymentMethod}`
                : undefined,
            mailData.data.createdAt
                ? `Payment Date: ${mailData.data.createdAt}`
                : undefined,
        ].filter(Boolean);
        const text = lines.join('\n');
        await this.mailerService.sendMail({
            to: mailData.to,
            subject,
            text,
        });
    }
    async studentPaymentConfirmation(mailData) {
        const subject = `Payment Confirmed - Access Your Course Materials`;
        const frontendDomain = this.configService.getOrThrow('app.frontendDomain', {
            infer: true,
        });
        const courseMaterialsList = mailData.data.courseMaterials
            ?.map((material) => `- ${material.name} (${material.type})${material.link ? ` - ${material.link}` : ''}`)
            .join('\n') || 'Course materials will be available in your dashboard.';
        const text = `
Dear ${mailData.data.studentName},

Your payment has been successfully confirmed!

Course: ${mailData.data.courseTitle}
Amount: ${mailData.data.amount} ${mailData.data.currency || 'USD'}
Payment Date: ${mailData.data.paymentDate}

Access Your Course Materials:
${mailData.data.courseMaterialLink}

Course Materials:
${courseMaterialsList}

You can now access all course content, sessions, and materials through the link above.

Thank you for your purchase!

Best regards,
${this.configService.get('app.name', { infer: true }) || 'Kelmac Team'}
    `.trim();
        await this.mailerService.sendMail({
            to: mailData.to,
            subject,
            text,
        });
    }
    async enquirySubmitted(mailData) {
        const subject = `New Enquiry: ${mailData.data.subject}`;
        const lines = [
            `Subject: ${mailData.data.subject}`,
            `Name: ${mailData.data.name}`,
            `Email: ${mailData.data.email}`,
            mailData.data.phone ? `Phone: ${mailData.data.phone}` : undefined,
            mailData.data.company ? `Company: ${mailData.data.company}` : undefined,
            mailData.data.designation
                ? `Designation: ${mailData.data.designation}`
                : undefined,
            mailData.data.industry
                ? `Industry: ${mailData.data.industry}`
                : undefined,
            mailData.data.trainingType
                ? `Training Type: ${mailData.data.trainingType}`
                : undefined,
        ].filter(Boolean);
        const text = lines.join('\n');
        await this.mailerService.sendMail({
            to: mailData.to,
            subject,
            text,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map