import { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../utils/document-entity-helper';
export type CourseSchemaDocument = HydratedDocument<CourseSchemaClass>;
export declare enum SkillLevelEnum {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
    ALL_LEVELS = "All Levels"
}
export declare enum CurrencyEnum {
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    INR = "INR"
}
export declare class FAQSchemaClass {
    question: string;
    answer: string;
}
export declare class ClassDateOptionSchemaClass {
    date: Date;
    description: string;
    time?: string;
}
export declare class TimeBlockSchemaClass {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeZone: string;
}
export declare enum SessionFormatEnum {
    FULL_WEEK = "Full Week",
    SPLIT_WEEK = "Split Week",
    WEEKEND = "Weekend",
    EVENING = "Evening"
}
export declare class SessionSchemaClass {
    type: string;
    location: Types.ObjectId;
    mode: 'online' | 'in-person';
    instructor: Types.ObjectId;
    timeBlocks: TimeBlockSchemaClass[];
    seatsLeft: number;
}
export declare class CourseSnapshotSchemaClass {
    totalLectures: number;
    totalDuration: number;
    skillLevel: string;
    language: string;
    captionsLanguage?: string;
    enrolledStudents: number;
    certificate: boolean;
    lifetimeAccess: boolean;
    mobileAccess: boolean;
}
export declare class CourseDetailsSchemaClass {
    whatYouWillLearn: string[];
    requirements: string[];
    targetAudience: string[];
    features: string[];
}
export declare class CourseSchemaClass extends EntityDocumentHelper {
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    category: Types.ObjectId;
    hasTest: boolean;
    subcategories: string[];
    topics: string[];
    overview?: string;
    thumbnailUrl?: string;
    previewVideoUrl?: string;
    sessions: SessionSchemaClass[];
    snapshot: CourseSnapshotSchemaClass;
    details: CourseDetailsSchemaClass;
    faqs: FAQSchemaClass[];
    price: number;
    discountedPrice?: number;
    discountPercentage?: number;
    currency: string;
    enrolledCount: number;
    averageRating: number;
    totalReviews: number;
    totalRatings: number;
    isPublished: boolean;
    isFeatured: boolean;
    isBestseller: boolean;
    isNew: boolean;
    publishedAt?: Date;
    lastUpdated?: Date;
    timeTable: ClassDateOptionSchemaClass[];
    deletedAt?: Date;
}
export declare const CourseSchema: import("mongoose").Schema<CourseSchemaClass, import("mongoose").Model<CourseSchemaClass, any, any, any, import("mongoose").Document<unknown, any, CourseSchemaClass, any, {}> & CourseSchemaClass & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CourseSchemaClass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CourseSchemaClass>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CourseSchemaClass> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
