import { SkillLevelEnum } from '../schema/course.schema';
export declare class FilterCourseDto {
    instructorId?: string;
    category?: string;
    subcategory?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    isBestseller?: boolean;
    isNew?: boolean;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    skillLevel?: SkillLevelEnum;
    language?: string;
    topic?: string;
    search?: string;
}
export declare class SortCourseDto {
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}
export declare class QueryCourseDto {
    page?: number;
    limit?: number;
}
