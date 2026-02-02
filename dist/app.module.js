"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const files_module_1 = require("./files/files.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = __importDefault(require("./database/config/database.config"));
const auth_config_1 = __importDefault(require("./auth/config/auth.config"));
const app_config_1 = __importDefault(require("./config/app.config"));
const mail_config_1 = __importDefault(require("./mail/config/mail.config"));
const file_config_1 = __importDefault(require("./files/config/file.config"));
const facebook_config_1 = __importDefault(require("./auth-facebook/config/facebook.config"));
const google_config_1 = __importDefault(require("./auth-google/config/google.config"));
const apple_config_1 = __importDefault(require("./auth-apple/config/apple.config"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_apple_module_1 = require("./auth-apple/auth-apple.module");
const auth_facebook_module_1 = require("./auth-facebook/auth-facebook.module");
const auth_google_module_1 = require("./auth-google/auth-google.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const mail_module_1 = require("./mail/mail.module");
const home_module_1 = require("./home/home.module");
const typeorm_2 = require("typeorm");
const session_module_1 = require("./session/session.module");
const mailer_module_1 = require("./mailer/mailer.module");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_config_service_1 = require("./database/mongoose-config.service");
const certificates_module_1 = require("./certificate/certificates.module");
const courses_module_1 = require("./course/courses.module");
const categories_module_1 = require("./category/categories.module");
const blogs_module_1 = require("./blog/blogs.module");
const class_schedule_module_1 = require("./classSchedule/class-schedule.module");
const enrollment_module_1 = require("./Enrollment/enrollment.module");
const stripe_module_1 = require("./stripe/stripe.module");
const stripe_config_1 = __importDefault(require("./stripe/config/stripe.config"));
const payment_module_1 = require("./payment/payment.module");
const google_module_1 = require("./googleService/google.module");
const booking_module_1 = require("./booking/booking.module");
const purchase_module_1 = require("./purchaseOrder/purchase.module");
const attendence_module_1 = require("./attendance/attendence.module");
const location_module_1 = require("./location/location.module");
const notification_module_1 = require("./notification/notification.module");
const enquiries_module_1 = require("./enquiry/enquiries.module");
const assigment_module_1 = require("./assigment/assigment.module");
const student_item_grade_module_1 = require("./student-item-Grade/student-item-grade.module");
const infrastructureDatabaseModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? mongoose_1.MongooseModule.forRootAsync({
        useClass: mongoose_config_service_1.MongooseConfigService,
    })
    : typeorm_1.TypeOrmModule.forRootAsync({
        useClass: typeorm_config_service_1.TypeOrmConfigService,
        dataSourceFactory: async (options) => {
            return new typeorm_2.DataSource(options).initialize();
        },
    });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    database_config_1.default,
                    auth_config_1.default,
                    app_config_1.default,
                    mail_config_1.default,
                    file_config_1.default,
                    facebook_config_1.default,
                    google_config_1.default,
                    apple_config_1.default,
                    stripe_config_1.default,
                ],
                envFilePath: ['.env'],
            }),
            infrastructureDatabaseModule,
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => {
                    const workingDirectory = configService.getOrThrow('app.workingDirectory', {
                        infer: true,
                    });
                    const candidates = [
                        path_1.default.join(workingDirectory, 'dist', 'i18n'),
                        path_1.default.join(workingDirectory, 'i18n'),
                        path_1.default.join(workingDirectory, 'src', 'i18n'),
                    ];
                    const i18nPath = candidates.find((p) => fs_1.default.existsSync(p)) ?? candidates[2];
                    const isDev = process.env.NODE_ENV !== 'production';
                    return {
                        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
                            infer: true,
                        }),
                        loaderOptions: { path: i18nPath, watch: isDev },
                    };
                },
                resolvers: [
                    {
                        use: nestjs_i18n_1.HeaderResolver,
                        useFactory: (configService) => {
                            return [
                                configService.get('app.headerLanguage', {
                                    infer: true,
                                }),
                            ];
                        },
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            auth_facebook_module_1.AuthFacebookModule,
            auth_google_module_1.AuthGoogleModule,
            auth_apple_module_1.AuthAppleModule,
            session_module_1.SessionModule,
            mail_module_1.MailModule,
            mailer_module_1.MailerModule,
            home_module_1.HomeModule,
            certificates_module_1.CertificatesModule,
            courses_module_1.CoursesModule,
            categories_module_1.CategoriesModule,
            enrollment_module_1.EnrollmentModule,
            blogs_module_1.BlogsModule,
            class_schedule_module_1.ClassScheduleModule,
            google_module_1.GoogleModule,
            stripe_module_1.StripeModule,
            payment_module_1.PaymentModule,
            booking_module_1.BookingsModule,
            purchase_module_1.PurchaseOrderModule,
            attendence_module_1.AttendanceModule,
            location_module_1.LocationModule,
            notification_module_1.NotificationModule,
            enquiries_module_1.EnquiriesModule,
            assigment_module_1.AssigmentModule,
            student_item_grade_module_1.StudentItemGradeModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map