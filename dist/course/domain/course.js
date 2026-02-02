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
exports.CourseEntity = exports.TimeTableEntity = exports.PricingEntity = exports.CourseDetailsEntity = exports.CourseSnapshotEntity = exports.FAQEntity = exports.SessionEntity = exports.TimeBlockEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_config_1 = __importDefault(require("../../database/config/database.config"));
const mongoose_1 = require("mongoose");
const course_schema_1 = require("../schema/course.schema");
const idType = (0, database_config_1.default)().isDocumentDatabase
    ? String
    : Number;
class TimeBlockEntity {
}
exports.TimeBlockEntity = TimeBlockEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-06' }),
    __metadata("design:type", String)
], TimeBlockEntity.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-10' }),
    __metadata("design:type", String)
], TimeBlockEntity.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00' }),
    __metadata("design:type", String)
], TimeBlockEntity.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17:00' }),
    __metadata("design:type", String)
], TimeBlockEntity.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Eastern Time (GMT-5)', required: false }),
    __metadata("design:type", String)
], TimeBlockEntity.prototype, "timeZone", void 0);
class SessionEntity {
}
exports.SessionEntity = SessionEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: course_schema_1.SessionFormatEnum.FULL_WEEK,
        enum: course_schema_1.SessionFormatEnum,
    }),
    __metadata("design:type", String)
], SessionEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TimeBlockEntity], default: [] }),
    __metadata("design:type", Array)
], SessionEntity.prototype, "timeBlocks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], SessionEntity.prototype, "seatsLeft", void 0);
class FAQEntity {
}
exports.FAQEntity = FAQEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What are the prerequisites?' }),
    __metadata("design:type", String)
], FAQEntity.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'No prior experience required' }),
    __metadata("design:type", String)
], FAQEntity.prototype, "answer", void 0);
class CourseSnapshotEntity {
}
exports.CourseSnapshotEntity = CourseSnapshotEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 24 }),
    __metadata("design:type", Number)
], CourseSnapshotEntity.prototype, "totalLectures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16, description: 'Total duration in hours' }),
    __metadata("design:type", Number)
], CourseSnapshotEntity.prototype, "totalDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Beginner',
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    }),
    __metadata("design:type", String)
], CourseSnapshotEntity.prototype, "skillLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'English' }),
    __metadata("design:type", String)
], CourseSnapshotEntity.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spanish', required: false }),
    __metadata("design:type", String)
], CourseSnapshotEntity.prototype, "captionsLanguage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120 }),
    __metadata("design:type", Number)
], CourseSnapshotEntity.prototype, "enrolledStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotEntity.prototype, "certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotEntity.prototype, "lifetimeAccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotEntity.prototype, "mobileAccess", void 0);
class CourseDetailsEntity {
}
exports.CourseDetailsEntity = CourseDetailsEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['Build real-world projects', 'Master MERN stack'],
    }),
    __metadata("design:type", Array)
], CourseDetailsEntity.prototype, "whatYouWillLearn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['Basic computer skills', 'Internet connection'],
    }),
    __metadata("design:type", Array)
], CourseDetailsEntity.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['Aspiring web developers', 'Career switchers'],
    }),
    __metadata("design:type", Array)
], CourseDetailsEntity.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['Lifetime access', 'Certificate of completion'],
    }),
    __metadata("design:type", Array)
], CourseDetailsEntity.prototype, "features", void 0);
class PricingEntity {
}
exports.PricingEntity = PricingEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'one-time', enum: ['one-time', 'subscription'] }),
    __metadata("design:type", String)
], PricingEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 249 }),
    __metadata("design:type", Number)
], PricingEntity.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', enum: ['USD', 'EUR', 'GBP', 'INR'] }),
    __metadata("design:type", String)
], PricingEntity.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full course access' }),
    __metadata("design:type", String)
], PricingEntity.prototype, "description", void 0);
class TimeTableEntity {
}
exports.TimeTableEntity = TimeTableEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-11-15T09:00:00.000Z' }),
    __metadata("design:type", Date)
], TimeTableEntity.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Weekend Batch - Morning Session' }),
    __metadata("design:type", String)
], TimeTableEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9:00 AM - 1:00 PM', required: false }),
    __metadata("design:type", String)
], TimeTableEntity.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: [],
        description: 'Array of student IDs enrolled',
    }),
    __metadata("design:type", Array)
], TimeTableEntity.prototype, "studentsEnrolled", void 0);
class CourseEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.CourseEntity = CourseEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ type: idType }),
    __metadata("design:type", Object)
], CourseEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Stack Web Development Bootcamp' }),
    __metadata("design:type", String)
], CourseEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'full-stack-web-development-bootcamp' }),
    __metadata("design:type", String)
], CourseEntity.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Master modern web development', required: false }),
    __metadata("design:type", String)
], CourseEntity.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Learn MERN stack development from scratch.',
        required: false,
    }),
    __metadata("design:type", String)
], CourseEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Complete overview of the course...',
        required: false,
    }),
    __metadata("design:type", String)
], CourseEntity.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '670e6c1234abcd56789ef012' }),
    __metadata("design:type", Object)
], CourseEntity.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'web-development' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CourseEntity.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['Frontend', 'Backend'],
        default: [],
    }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "subcategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['React', 'Node.js', 'MongoDB'],
        default: [],
    }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/thumbnail.jpg',
        required: false,
    }),
    __metadata("design:type", String)
], CourseEntity.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/preview.mp4', required: false }),
    __metadata("design:type", String)
], CourseEntity.prototype, "previewVideoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SessionEntity], default: [] }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "sessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CourseSnapshotEntity, required: false }),
    __metadata("design:type", CourseSnapshotEntity)
], CourseEntity.prototype, "snapshot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CourseDetailsEntity, required: false }),
    __metadata("design:type", CourseDetailsEntity)
], CourseEntity.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FAQEntity], default: [] }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 249 }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 199, required: false }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "discountedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Discount percentage 0-100',
        required: false,
    }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', enum: ['USD', 'EUR', 'GBP', 'INR'] }),
    __metadata("design:type", String)
], CourseEntity.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PricingEntity], default: [], required: false }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120 }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "enrolledCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'Average rating 0-5' }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], CourseEntity.prototype, "totalRatings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseEntity.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CourseEntity.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CourseEntity.prototype, "isBestseller", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CourseEntity.prototype, "isNew", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-29T10:00:00.000Z', required: false }),
    __metadata("design:type", Date)
], CourseEntity.prototype, "publishedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-11-01T10:00:00.000Z', required: false }),
    __metadata("design:type", Date)
], CourseEntity.prototype, "lastUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TimeTableEntity], default: [] }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "timeTable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-29T10:00:00.000Z', required: false }),
    __metadata("design:type", Date)
], CourseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-29T10:00:00.000Z', required: false }),
    __metadata("design:type", Date)
], CourseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, required: false }),
    __metadata("design:type", Date)
], CourseEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=course.js.map