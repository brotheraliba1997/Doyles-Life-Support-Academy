import { FilterQuery, Model } from 'mongoose';
import { IPaginationOptions } from './types/pagination-options';
export interface SortOption {
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}
export interface QueryBuilderOptions<T> {
    model: Model<T>;
    filterQuery?: FilterQuery<T>;
    sortOptions?: SortOption[] | null;
    paginationOptions: IPaginationOptions;
    populateFields?: string | Array<{
        path: string;
        select?: string;
        populate?: any;
        model?: string;
        options?: any;
    }>;
    selectFields?: string;
}
export interface PaginationResult<R> {
    data: R[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare function buildMongooseQuery<T, R = T>(options: QueryBuilderOptions<T> & {
    mapper?: (doc: any) => R;
}): Promise<PaginationResult<R>>;
export declare class FilterQueryBuilder<T> {
    private filter;
    addEqual(field: keyof T, value: any): this;
    addRange(field: keyof T, min?: number | Date, max?: number | Date): this;
    addTextSearch(field: keyof T, searchTerm?: string): this;
    addIn(field: keyof T, values?: any[]): this;
    addCustom(field: keyof T, condition: any): this;
    build(): FilterQuery<T>;
}
