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
exports.EnquirySchema = exports.EnquirySchemaClass = exports.EnquiryTypeEnum = exports.AuditingDeliveryEnum = exports.CertifiedScopeEnum = exports.HoursOfOperationEnum = exports.LocationRangeEnum = exports.DeliveryEnum = exports.CertificationEnum = exports.LanguageEnum = exports.OrganizationTypeEnum = exports.TrainingDeliveryEnum = exports.TrainingTypeEnum = exports.TrainingCategoryEnum = exports.SchemeEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
var SchemeEnum;
(function (SchemeEnum) {
    SchemeEnum["ISO_9001_2015"] = "ISO 9001:2015 - Quality Management";
    SchemeEnum["ISO_14001_2015"] = "ISO 14001:2015 - Environmental Management";
    SchemeEnum["ISO_45001_2018"] = "ISO 45001:2018 - Occupational Health & Safety";
    SchemeEnum["ISO_27001_2013"] = "ISO 27001:2013 - Information Security";
    SchemeEnum["FSSC_22000"] = "FSSC 22000 - Food Safety System Certification";
    SchemeEnum["ISO_13485_2016"] = "ISO 13485:2016 - Medical Devices";
    SchemeEnum["IATF_16949_2016"] = "IATF 16949:2016 - Automotive Quality Management";
})(SchemeEnum || (exports.SchemeEnum = SchemeEnum = {}));
var TrainingCategoryEnum;
(function (TrainingCategoryEnum) {
    TrainingCategoryEnum["FUNDAMENTALS"] = "Fundamentals/Awareness";
    TrainingCategoryEnum["INTERNAL_AUDITOR"] = "Internal Auditor";
    TrainingCategoryEnum["LEAD_AUDITOR"] = "Lead Auditor";
    TrainingCategoryEnum["IMPLEMENTATION"] = "Implementation";
    TrainingCategoryEnum["TRANSITION"] = "Transition/Upgrade";
    TrainingCategoryEnum["ADVANCED"] = "Advanced/Specialist";
})(TrainingCategoryEnum || (exports.TrainingCategoryEnum = TrainingCategoryEnum = {}));
var TrainingTypeEnum;
(function (TrainingTypeEnum) {
    TrainingTypeEnum["FOUNDATION"] = "Foundation Course";
    TrainingTypeEnum["INTERNAL_AUDITOR"] = "Internal Auditor Training";
    TrainingTypeEnum["LEAD_AUDITOR"] = "Lead Auditor Training";
    TrainingTypeEnum["MANAGEMENT_REP"] = "Management Representative Training";
    TrainingTypeEnum["ADVANCED_AUDITING"] = "Advanced Auditing Techniques";
    TrainingTypeEnum["RISK_THINKING"] = "Risk-Based Thinking Workshop";
    TrainingTypeEnum["DOCUMENT_CONTROL"] = "Document Control Training";
})(TrainingTypeEnum || (exports.TrainingTypeEnum = TrainingTypeEnum = {}));
var TrainingDeliveryEnum;
(function (TrainingDeliveryEnum) {
    TrainingDeliveryEnum["VIRTUAL_LIVE"] = "Virtual Live (Online)";
    TrainingDeliveryEnum["CLASSROOM"] = "Classroom (On-site)";
    TrainingDeliveryEnum["HYBRID"] = "Hybrid (Blended Learning)";
    TrainingDeliveryEnum["SELF_PACED"] = "Self-paced eLearning";
    TrainingDeliveryEnum["ON_DEMAND"] = "On-demand Recorded Sessions";
})(TrainingDeliveryEnum || (exports.TrainingDeliveryEnum = TrainingDeliveryEnum = {}));
var OrganizationTypeEnum;
(function (OrganizationTypeEnum) {
    OrganizationTypeEnum["PRIVATE"] = "Private";
    OrganizationTypeEnum["PUBLIC"] = "Public";
    OrganizationTypeEnum["NON_PROFIT"] = "Non-Profit";
})(OrganizationTypeEnum || (exports.OrganizationTypeEnum = OrganizationTypeEnum = {}));
var LanguageEnum;
(function (LanguageEnum) {
    LanguageEnum["ENGLISH"] = "English";
    LanguageEnum["FRENCH"] = "French";
    LanguageEnum["GERMAN"] = "German";
})(LanguageEnum || (exports.LanguageEnum = LanguageEnum = {}));
var CertificationEnum;
(function (CertificationEnum) {
    CertificationEnum["ISO_9001"] = "ISO 9001";
    CertificationEnum["ISO_14001"] = "ISO 14001";
    CertificationEnum["NONE"] = "None";
})(CertificationEnum || (exports.CertificationEnum = CertificationEnum = {}));
var DeliveryEnum;
(function (DeliveryEnum) {
    DeliveryEnum["ON_SITE"] = "On-site";
    DeliveryEnum["ONLINE"] = "Online";
    DeliveryEnum["HYBRID"] = "Hybrid";
})(DeliveryEnum || (exports.DeliveryEnum = DeliveryEnum = {}));
var LocationRangeEnum;
(function (LocationRangeEnum) {
    LocationRangeEnum["SMALL"] = "1-5";
    LocationRangeEnum["MEDIUM"] = "6-10";
    LocationRangeEnum["LARGE"] = "10+";
})(LocationRangeEnum || (exports.LocationRangeEnum = LocationRangeEnum = {}));
var HoursOfOperationEnum;
(function (HoursOfOperationEnum) {
    HoursOfOperationEnum["NINE_TO_FIVE"] = "9-5";
    HoursOfOperationEnum["TWENTY_FOUR_SEVEN"] = "24/7";
    HoursOfOperationEnum["FLEXIBLE"] = "Flexible";
})(HoursOfOperationEnum || (exports.HoursOfOperationEnum = HoursOfOperationEnum = {}));
var CertifiedScopeEnum;
(function (CertifiedScopeEnum) {
    CertifiedScopeEnum["LOCAL"] = "Local";
    CertifiedScopeEnum["INTERNATIONAL"] = "International";
})(CertifiedScopeEnum || (exports.CertifiedScopeEnum = CertifiedScopeEnum = {}));
var AuditingDeliveryEnum;
(function (AuditingDeliveryEnum) {
    AuditingDeliveryEnum["INTERNAL"] = "Internal";
    AuditingDeliveryEnum["EXTERNAL"] = "External";
})(AuditingDeliveryEnum || (exports.AuditingDeliveryEnum = AuditingDeliveryEnum = {}));
var EnquiryTypeEnum;
(function (EnquiryTypeEnum) {
    EnquiryTypeEnum["AUDITING"] = "auditing";
    EnquiryTypeEnum["CONSULTING"] = "consulting";
    EnquiryTypeEnum["TRAINING"] = "training";
    EnquiryTypeEnum["OTHER"] = "other";
})(EnquiryTypeEnum || (exports.EnquiryTypeEnum = EnquiryTypeEnum = {}));
let EnquirySchemaClass = class EnquirySchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.EnquirySchemaClass = EnquirySchemaClass;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(EnquiryTypeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "enquiryType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(SchemeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "scheme", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(TrainingCategoryEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "trainingCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(TrainingTypeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "trainingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(TrainingDeliveryEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "trainingDelivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], EnquirySchemaClass.prototype, "numberOfLearners", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], EnquirySchemaClass.prototype, "preferredLearningDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(OrganizationTypeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "organizationType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(LanguageEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(CertificationEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "certificationsHeld", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(DeliveryEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(LocationRangeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "numberOfLocations", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(HoursOfOperationEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "hoursOfOperation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(CertifiedScopeEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "certifiedScope", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: Object.values(AuditingDeliveryEnum),
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "auditingDelivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true, index: true }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "industry", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        enum: ['pending', 'replied', 'closed', 'in-progress', 'on-hold'],
    }),
    __metadata("design:type", String)
], EnquirySchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], EnquirySchemaClass.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], EnquirySchemaClass.prototype, "isDeleted", void 0);
exports.EnquirySchemaClass = EnquirySchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], EnquirySchemaClass);
exports.EnquirySchema = mongoose_1.SchemaFactory.createForClass(EnquirySchemaClass);
exports.EnquirySchema.index({ email: 1 });
exports.EnquirySchema.index({ phone: 1 });
exports.EnquirySchema.index({ subject: 1 });
exports.EnquirySchema.index({ name: 1 });
exports.EnquirySchema.index({
    subject: 'text',
    industry: 'text',
    trainingType: 'text',
    name: 'text',
    email: 'text',
    phone: 'text',
    company: 'text',
    designation: 'text',
});
//# sourceMappingURL=enquiry.schema.js.map