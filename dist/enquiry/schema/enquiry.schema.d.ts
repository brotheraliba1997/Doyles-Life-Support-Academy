import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type EnquirySchemaDocument = HydratedDocument<EnquirySchemaClass>;
export declare enum SchemeEnum {
    ISO_9001_2015 = "ISO 9001:2015 - Quality Management",
    ISO_14001_2015 = "ISO 14001:2015 - Environmental Management",
    ISO_45001_2018 = "ISO 45001:2018 - Occupational Health & Safety",
    ISO_27001_2013 = "ISO 27001:2013 - Information Security",
    FSSC_22000 = "FSSC 22000 - Food Safety System Certification",
    ISO_13485_2016 = "ISO 13485:2016 - Medical Devices",
    IATF_16949_2016 = "IATF 16949:2016 - Automotive Quality Management"
}
export declare enum TrainingCategoryEnum {
    FUNDAMENTALS = "Fundamentals/Awareness",
    INTERNAL_AUDITOR = "Internal Auditor",
    LEAD_AUDITOR = "Lead Auditor",
    IMPLEMENTATION = "Implementation",
    TRANSITION = "Transition/Upgrade",
    ADVANCED = "Advanced/Specialist"
}
export declare enum TrainingTypeEnum {
    FOUNDATION = "Foundation Course",
    INTERNAL_AUDITOR = "Internal Auditor Training",
    LEAD_AUDITOR = "Lead Auditor Training",
    MANAGEMENT_REP = "Management Representative Training",
    ADVANCED_AUDITING = "Advanced Auditing Techniques",
    RISK_THINKING = "Risk-Based Thinking Workshop",
    DOCUMENT_CONTROL = "Document Control Training"
}
export declare enum TrainingDeliveryEnum {
    VIRTUAL_LIVE = "Virtual Live (Online)",
    CLASSROOM = "Classroom (On-site)",
    HYBRID = "Hybrid (Blended Learning)",
    SELF_PACED = "Self-paced eLearning",
    ON_DEMAND = "On-demand Recorded Sessions"
}
export declare enum OrganizationTypeEnum {
    PRIVATE = "Private",
    PUBLIC = "Public",
    NON_PROFIT = "Non-Profit"
}
export declare enum LanguageEnum {
    ENGLISH = "English",
    FRENCH = "French",
    GERMAN = "German"
}
export declare enum CertificationEnum {
    ISO_9001 = "ISO 9001",
    ISO_14001 = "ISO 14001",
    NONE = "None"
}
export declare enum DeliveryEnum {
    ON_SITE = "On-site",
    ONLINE = "Online",
    HYBRID = "Hybrid"
}
export declare enum LocationRangeEnum {
    SMALL = "1-5",
    MEDIUM = "6-10",
    LARGE = "10+"
}
export declare enum HoursOfOperationEnum {
    NINE_TO_FIVE = "9-5",
    TWENTY_FOUR_SEVEN = "24/7",
    FLEXIBLE = "Flexible"
}
export declare enum CertifiedScopeEnum {
    LOCAL = "Local",
    INTERNATIONAL = "International"
}
export declare enum AuditingDeliveryEnum {
    INTERNAL = "Internal",
    EXTERNAL = "External"
}
export declare enum EnquiryTypeEnum {
    AUDITING = "auditing",
    CONSULTING = "consulting",
    TRAINING = "training",
    OTHER = "other"
}
export declare class EnquirySchemaClass extends EntityDocumentHelper {
    subject: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    designation?: string;
    enquiryType?: string;
    scheme?: string;
    trainingCategory?: string;
    trainingType?: string;
    trainingDelivery?: string;
    numberOfLearners?: number;
    preferredLearningDate?: Date;
    organizationType?: string;
    language?: string;
    certificationsHeld?: string;
    delivery?: string;
    numberOfLocations?: string;
    hoursOfOperation?: string;
    certifiedScope?: string;
    auditingDelivery?: string;
    industry?: string;
    status?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
export declare const EnquirySchema: import("mongoose").Schema<EnquirySchemaClass, import("mongoose").Model<EnquirySchemaClass, any, any, any, import("mongoose").Document<unknown, any, EnquirySchemaClass, any, {}> & EnquirySchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EnquirySchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<EnquirySchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EnquirySchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
