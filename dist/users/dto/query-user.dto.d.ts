import { User } from '../domain/user';
export declare class FilterUserDto {
    search?: string;
    role?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    industry?: string;
    country?: string;
    currency?: string;
}
export declare class SortUserDto {
    orderBy: keyof User;
    order: string;
}
export declare class QueryUserDto {
    page?: number;
    limit?: number;
    sort?: SortUserDto[] | null;
}
