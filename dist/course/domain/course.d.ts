import { Types } from 'mongoose';
import { User } from '../../users/domain/user';
import { SessionFormatEnum } from '../schema/course.schema';
export declare class TimeBlockEntity {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeZone?: string;
}
export declare class SessionEntity {
    type: SessionFormatEnum;
    timeBlocks: TimeBlockEntity[];
    seatsLeft: number;
}
export declare class FAQEntity {
    question: string;
    answer: string;
}
export declare class CourseSnapshotEntity {
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
export declare class CourseDetailsEntity {
    whatYouWillLearn: string[];
    requirements: string[];
    targetAudience: string[];
    features: string[];
}
export declare class PricingEntity {
    type: string;
    amount: number;
    currency: string;
    description: string;
}
export declare class TimeTableEntity {
    date: Date;
    description: string;
    time?: string;
    studentsEnrolled: string[];
}
export declare class CourseEntity {
    id: number | string;
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    overview?: string;
    instructor: Types.ObjectId | User;
    category: Types.ObjectId;
    subcategories: string[];
    topics: string[];
    thumbnailUrl?: string;
    previewVideoUrl?: string;
    sessions: SessionEntity[];
    snapshot?: CourseSnapshotEntity;
    details?: CourseDetailsEntity;
    faqs: FAQEntity[];
    price: number;
    discountedPrice?: number;
    discountPercentage?: number;
    currency: string;
    pricing?: PricingEntity[];
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
    timeTable: TimeTableEntity[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    constructor(partial: Partial<CourseEntity>);
}
