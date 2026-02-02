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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = exports.DateOptionDto = exports.CourseDetailsDto = exports.CourseSnapshotDto = exports.FAQDto = exports.SessionDto = exports.TimeBlockDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const course_schema_1 = require("../schema/course.schema");
const create_assessment_Item_dto_1 = require("./create-assessment-Item.dto");
class TimeBlockDto {
}
exports.TimeBlockDto = TimeBlockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-06' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimeBlockDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-10' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimeBlockDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00' }),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Start time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], TimeBlockDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17:00' }),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'End time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], TimeBlockDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Eastern Time (GMT-5)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimeBlockDto.prototype, "timeZone", void 0);
class SessionDto {
}
exports.SessionDto = SessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: course_schema_1.SessionFormatEnum,
        example: course_schema_1.SessionFormatEnum.FULL_WEEK,
    }),
    (0, class_validator_1.IsEnum)(course_schema_1.SessionFormatEnum),
    __metadata("design:type", String)
], SessionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [TimeBlockDto],
        description: 'Structured time blocks for this session type',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TimeBlockDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SessionDto.prototype, "timeBlocks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SessionDto.prototype, "seatsLeft", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '68fdf94006e63abc0d5a12e4' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SessionDto.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '6931b6648080a892831ad338' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SessionDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['online', 'in-person'] }),
    (0, class_validator_1.IsEnum)(['online', 'in-person']),
    __metadata("design:type", String)
], SessionDto.prototype, "mode", void 0);
class FAQDto {
}
exports.FAQDto = FAQDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What are the prerequisites?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FAQDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic programming knowledge is recommended' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FAQDto.prototype, "answer", void 0);
class CourseSnapshotDto {
}
exports.CourseSnapshotDto = CourseSnapshotDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CourseSnapshotDto.prototype, "totalLectures", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 40, description: 'Total duration in hours' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CourseSnapshotDto.prototype, "totalDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: course_schema_1.SkillLevelEnum,
        example: course_schema_1.SkillLevelEnum.BEGINNER,
    }),
    (0, class_validator_1.IsEnum)(course_schema_1.SkillLevelEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseSnapshotDto.prototype, "skillLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'English' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseSnapshotDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'English, Spanish' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseSnapshotDto.prototype, "captionsLanguage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CourseSnapshotDto.prototype, "enrolledStudents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CourseSnapshotDto.prototype, "certificate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CourseSnapshotDto.prototype, "lifetimeAccess", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CourseSnapshotDto.prototype, "mobileAccess", void 0);
class CourseDetailsDto {
}
exports.CourseDetailsDto = CourseDetailsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['Build modern web applications', 'Master JavaScript'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CourseDetailsDto.prototype, "whatYouWillLearn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['Basic computer skills', 'Text editor installed'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CourseDetailsDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['Beginners in web development', 'Career switchers'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CourseDetailsDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['Lifetime access', '30-day money back guarantee'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CourseDetailsDto.prototype, "features", void 0);
class DateOptionDto {
}
exports.DateOptionDto = DateOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-11-06T13:44:37.064+00:00' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], DateOptionDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Week , Weekend Per day' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DateOptionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9:00 AM - 4:30 PM (Eastern Time (GMT-5))' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DateOptionDto.prototype, "time", void 0);
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the course',
        example: 'Complete Web Development Bootcamp 2025',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Does this course have a test?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "hasTest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL-friendly slug (auto-generated from title if not provided)',
        example: 'complete-web-development-bootcamp-2025',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'From Zero to Full-Stack Hero',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'A detailed description of the course',
        example: 'Master web development with HTML, CSS, JavaScript, React, Node.js and more',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The MongoDB ID of the instructor',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The category slug of the course',
        example: '690bc43d8ddd23690d42287e',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of subcategory names',
        example: ['Frontend Development', 'Backend Development'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "subcategories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of topic tags',
        example: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'This comprehensive course covers everything you need to become a full-stack developer...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/thumbnail.jpg',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/preview-video.mp4',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "previewVideoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [SessionDto],
        description: 'Course sessions/lectures',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SessionDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "sessions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [create_assessment_Item_dto_1.CreateCrouseAssessmentItemDto],
        description: 'List of assessment items for the test',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_assessment_Item_dto_1.CreateCrouseAssessmentItemDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: CourseSnapshotDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CourseSnapshotDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CourseSnapshotDto)
], CreateCourseDto.prototype, "snapshot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: CourseDetailsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CourseDetailsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CourseDetailsDto)
], CreateCourseDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [FAQDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FAQDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The price of the course',
        example: 199.99,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 149.99,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "discountedPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 25,
        minimum: 0,
        maximum: 100,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: course_schema_1.CurrencyEnum,
        example: course_schema_1.CurrencyEnum.USD,
    }),
    (0, class_validator_1.IsEnum)(course_schema_1.CurrencyEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "enrolledCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, minimum: 0, maximum: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "totalRatings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the course is published',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isBestseller", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isNew", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateCourseDto.prototype, "publishedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateCourseDto.prototype, "lastUpdated", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [DateOptionDto],
        description: 'Course time table/schedule',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DateOptionDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "timeTable", void 0);
//# sourceMappingURL=create-course.dto.js.map