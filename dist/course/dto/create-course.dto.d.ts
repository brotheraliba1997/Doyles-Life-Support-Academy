import { SessionFormatEnum, SkillLevelEnum, CurrencyEnum } from '../schema/course.schema';
import { CreateCrouseAssessmentItemDto } from './create-assessment-Item.dto';
export declare class TimeBlockDto {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeZone?: string;
}
export declare class SessionDto {
    type: SessionFormatEnum;
    timeBlocks: TimeBlockDto[];
    seatsLeft?: number;
    instructor: string;
    location: string;
    mode: 'online' | 'in-person';
}
export declare class FAQDto {
    question: string;
    answer: string;
}
export declare class CourseSnapshotDto {
    totalLectures?: number;
    totalDuration?: number;
    skillLevel?: SkillLevelEnum;
    language?: string;
    captionsLanguage?: string;
    enrolledStudents?: number;
    certificate?: boolean;
    lifetimeAccess?: boolean;
    mobileAccess?: boolean;
}
export declare class CourseDetailsDto {
    whatYouWillLearn?: string[];
    requirements?: string[];
    targetAudience?: string[];
    features?: string[];
}
export declare class DateOptionDto {
    date: Date;
    description?: string;
    time?: string;
}
export declare class CreateCourseDto {
    title: string;
    hasTest: boolean;
    slug?: string;
    subtitle?: string;
    description?: string;
    category: string;
    subcategories?: string[];
    topics?: string[];
    overview?: string;
    thumbnailUrl?: string;
    previewVideoUrl?: string;
    sessions?: SessionDto[];
    items?: CreateCrouseAssessmentItemDto[];
    snapshot?: CourseSnapshotDto;
    details?: CourseDetailsDto;
    faqs?: FAQDto[];
    price?: number;
    discountedPrice?: number;
    discountPercentage?: number;
    currency?: CurrencyEnum;
    enrolledCount?: number;
    averageRating?: number;
    totalReviews?: number;
    totalRatings?: number;
    isPublished?: boolean;
    isFeatured?: boolean;
    isBestseller?: boolean;
    isNew?: boolean;
    publishedAt?: Date;
    lastUpdated?: Date;
    timeTable?: DateOptionDto[];
}
