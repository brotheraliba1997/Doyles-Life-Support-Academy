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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mail_service_1 = require("./mail.service");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendTestEmail(body) {
        const { to, template } = body;
        try {
            switch (template) {
                case 'activation':
                    await this.mailService.userSignUp({
                        to,
                        data: { hash: 'test-hash-123' },
                    });
                    break;
                case 'confirm-new-email':
                    await this.mailService.confirmNewEmail({
                        to,
                        data: { hash: 'test-hash-456' },
                    });
                    break;
                case 'reset-password':
                    await this.mailService.forgotPassword({
                        to,
                        data: { hash: 'test-hash-789', tokenExpires: Date.now() + 3600000 },
                    });
                    break;
                case 'lesson-scheduled':
                    await this.mailService.lessonScheduled({
                        to,
                        data: {
                            courseName: 'Introduction to Web Development',
                            instructorName: 'John Doe',
                            lessonDate: 'November 15, 2025',
                            lessonTime: '10:00 AM EST',
                            duration: 60,
                            googleMeetLink: 'https://meet.google.com/abc-defg-hij',
                        },
                    });
                    break;
                case 'course-created':
                    await this.mailService.courseCreated({
                        to,
                        data: {
                            courseTitle: 'Advanced JavaScript Programming',
                            instructorName: 'Jane Smith',
                            description: 'Learn advanced JavaScript concepts including async/await, closures, and design patterns.',
                            price: 99.99,
                            courseUrl: 'http://localhost:3000/courses/test-course-123',
                        },
                    });
                    break;
                case 'user-registered':
                    await this.mailService.userRegistered({
                        to,
                        data: {
                            userName: 'John Smith',
                            userEmail: 'john.smith@example.com',
                            userRole: 'Student',
                            registrationDate: new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }),
                        },
                    });
                    break;
                default:
                    throw new Error('Invalid template. Use: activation, confirm-new-email, reset-password, lesson-scheduled, course-created, or user-registered');
            }
            return {
                success: true,
                message: `Test email sent to ${to} using template: ${template}`,
                note: 'Check Maildev at http://localhost:1080 to view the email',
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to send email',
                error: error.message,
            };
        }
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Send a test email using a template' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                to: { type: 'string', example: 'test@example.com' },
                template: {
                    type: 'string',
                    enum: [
                        'activation',
                        'confirm-new-email',
                        'reset-password',
                        'lesson-scheduled',
                        'course-created',
                        'user-registered',
                    ],
                },
            },
            required: ['to', 'template'],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendTestEmail", null);
exports.MailController = MailController = __decorate([
    (0, swagger_1.ApiTags)('Mail'),
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map