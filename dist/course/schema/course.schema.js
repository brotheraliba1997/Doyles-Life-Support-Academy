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
exports.CourseSchema = exports.CourseSchemaClass = exports.CourseDetailsSchemaClass = exports.CourseSnapshotSchemaClass = exports.SessionSchemaClass = exports.SessionFormatEnum = exports.TimeBlockSchemaClass = exports.ClassDateOptionSchemaClass = exports.FAQSchemaClass = exports.CurrencyEnum = exports.SkillLevelEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const user_schema_1 = require("../../users/schema/user.schema");
const category_1 = require("../../category");
const location_schema_1 = require("../../location/schema/location.schema");
var SkillLevelEnum;
(function (SkillLevelEnum) {
    SkillLevelEnum["BEGINNER"] = "Beginner";
    SkillLevelEnum["INTERMEDIATE"] = "Intermediate";
    SkillLevelEnum["ADVANCED"] = "Advanced";
    SkillLevelEnum["ALL_LEVELS"] = "All Levels";
})(SkillLevelEnum || (exports.SkillLevelEnum = SkillLevelEnum = {}));
var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum["USD"] = "USD";
    CurrencyEnum["EUR"] = "EUR";
    CurrencyEnum["GBP"] = "GBP";
    CurrencyEnum["INR"] = "INR";
})(CurrencyEnum || (exports.CurrencyEnum = CurrencyEnum = {}));
let FAQSchemaClass = class FAQSchemaClass {
};
exports.FAQSchemaClass = FAQSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], FAQSchemaClass.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], FAQSchemaClass.prototype, "answer", void 0);
exports.FAQSchemaClass = FAQSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false,
        toJSON: { virtuals: true, getters: true },
        _id: false,
    })
], FAQSchemaClass);
const FAQSchema = mongoose_1.SchemaFactory.createForClass(FAQSchemaClass);
let ClassDateOptionSchemaClass = class ClassDateOptionSchemaClass {
};
exports.ClassDateOptionSchemaClass = ClassDateOptionSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], ClassDateOptionSchemaClass.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], ClassDateOptionSchemaClass.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], ClassDateOptionSchemaClass.prototype, "time", void 0);
exports.ClassDateOptionSchemaClass = ClassDateOptionSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false,
        toJSON: { virtuals: true, getters: true },
    })
], ClassDateOptionSchemaClass);
const ClassDateOptionSchema = mongoose_1.SchemaFactory.createForClass(ClassDateOptionSchemaClass);
let TimeBlockSchemaClass = class TimeBlockSchemaClass {
};
exports.TimeBlockSchemaClass = TimeBlockSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], TimeBlockSchemaClass.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], TimeBlockSchemaClass.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], TimeBlockSchemaClass.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], TimeBlockSchemaClass.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'Eastern Time (GMT-5)',
        trim: true,
    }),
    __metadata("design:type", String)
], TimeBlockSchemaClass.prototype, "timeZone", void 0);
exports.TimeBlockSchemaClass = TimeBlockSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false,
        toJSON: { virtuals: true, getters: true },
        _id: false,
    })
], TimeBlockSchemaClass);
const TimeBlockSchema = mongoose_1.SchemaFactory.createForClass(TimeBlockSchemaClass);
var SessionFormatEnum;
(function (SessionFormatEnum) {
    SessionFormatEnum["FULL_WEEK"] = "Full Week";
    SessionFormatEnum["SPLIT_WEEK"] = "Split Week";
    SessionFormatEnum["WEEKEND"] = "Weekend";
    SessionFormatEnum["EVENING"] = "Evening";
})(SessionFormatEnum || (exports.SessionFormatEnum = SessionFormatEnum = {}));
let SessionSchemaClass = class SessionSchemaClass {
};
exports.SessionSchemaClass = SessionSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(SessionFormatEnum),
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], SessionSchemaClass.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: location_schema_1.LocationSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SessionSchemaClass.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "online", enum: ['online', 'in-person'] }),
    __metadata("design:type", String)
], SessionSchemaClass.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SessionSchemaClass.prototype, "instructor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TimeBlockSchema], default: [] }),
    __metadata("design:type", Array)
], SessionSchemaClass.prototype, "timeBlocks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], SessionSchemaClass.prototype, "seatsLeft", void 0);
exports.SessionSchemaClass = SessionSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], SessionSchemaClass);
const SessionSchema = mongoose_1.SchemaFactory.createForClass(SessionSchemaClass);
let CourseSnapshotSchemaClass = class CourseSnapshotSchemaClass {
};
exports.CourseSnapshotSchemaClass = CourseSnapshotSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CourseSnapshotSchemaClass.prototype, "totalLectures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CourseSnapshotSchemaClass.prototype, "totalDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(SkillLevelEnum),
        default: SkillLevelEnum.ALL_LEVELS,
    }),
    __metadata("design:type", String)
], CourseSnapshotSchemaClass.prototype, "skillLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'English', trim: true }),
    __metadata("design:type", String)
], CourseSnapshotSchemaClass.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CourseSnapshotSchemaClass.prototype, "captionsLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CourseSnapshotSchemaClass.prototype, "enrolledStudents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotSchemaClass.prototype, "certificate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotSchemaClass.prototype, "lifetimeAccess", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CourseSnapshotSchemaClass.prototype, "mobileAccess", void 0);
exports.CourseSnapshotSchemaClass = CourseSnapshotSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false,
        toJSON: { virtuals: true, getters: true },
        _id: false,
    })
], CourseSnapshotSchemaClass);
const CourseSnapshotSchema = mongoose_1.SchemaFactory.createForClass(CourseSnapshotSchemaClass);
let CourseDetailsSchemaClass = class CourseDetailsSchemaClass {
};
exports.CourseDetailsSchemaClass = CourseDetailsSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CourseDetailsSchemaClass.prototype, "whatYouWillLearn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CourseDetailsSchemaClass.prototype, "requirements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CourseDetailsSchemaClass.prototype, "targetAudience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CourseDetailsSchemaClass.prototype, "features", void 0);
exports.CourseDetailsSchemaClass = CourseDetailsSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false,
        toJSON: { virtuals: true, getters: true },
        _id: false,
    })
], CourseDetailsSchemaClass);
const CourseDetailsSchema = mongoose_1.SchemaFactory.createForClass(CourseDetailsSchemaClass);
let CourseSchemaClass = class CourseSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.CourseSchemaClass = CourseSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, index: true }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, trim: true, index: true }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: category_1.CategorySchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CourseSchemaClass.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CourseSchemaClass.prototype, "hasTest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], index: true }),
    __metadata("design:type", Array)
], CourseSchemaClass.prototype, "subcategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], index: true }),
    __metadata("design:type", Array)
], CourseSchemaClass.prototype, "topics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "overview", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "previewVideoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SessionSchema], default: [] }),
    __metadata("design:type", Array)
], CourseSchemaClass.prototype, "sessions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: CourseSnapshotSchema, default: () => ({}) }),
    __metadata("design:type", CourseSnapshotSchemaClass)
], CourseSchemaClass.prototype, "snapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: CourseDetailsSchema, default: () => ({}) }),
    __metadata("design:type", CourseDetailsSchemaClass)
], CourseSchemaClass.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [FAQSchema], default: [] }),
    __metadata("design:type", Array)
], CourseSchemaClass.prototype, "faqs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0, index: true }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "discountedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, max: 100 }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "discountPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(CurrencyEnum),
        default: CurrencyEnum.USD,
    }),
    __metadata("design:type", String)
], CourseSchemaClass.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0, index: true }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "enrolledCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0, max: 5, index: true }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "averageRating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "totalReviews", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], CourseSchemaClass.prototype, "totalRatings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, index: true }),
    __metadata("design:type", Boolean)
], CourseSchemaClass.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, index: true }),
    __metadata("design:type", Boolean)
], CourseSchemaClass.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, index: true }),
    __metadata("design:type", Boolean)
], CourseSchemaClass.prototype, "isBestseller", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CourseSchemaClass.prototype, "isNew", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], CourseSchemaClass.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], CourseSchemaClass.prototype, "lastUpdated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ClassDateOptionSchema], default: [] }),
    __metadata("design:type", Array)
], CourseSchemaClass.prototype, "timeTable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], CourseSchemaClass.prototype, "deletedAt", void 0);
exports.CourseSchemaClass = CourseSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], CourseSchemaClass);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(CourseSchemaClass);
exports.CourseSchema.index({ isPublished: 1, isFeatured: 1, isBestseller: 1 });
exports.CourseSchema.index({ category: 1, subcategories: 1 });
exports.CourseSchema.index({ averageRating: -1, enrolledCount: -1 });
exports.CourseSchema.index({ instructor: 1, isPublished: 1 });
exports.CourseSchema.index({ createdAt: -1 });
exports.CourseSchema.index({
    title: 'text',
    description: 'text',
    category: 'text',
    subcategories: 'text',
});
//# sourceMappingURL=course.schema.js.map