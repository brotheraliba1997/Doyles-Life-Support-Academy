export declare class FilterLocationDto {
    country?: string;
    countryCode?: string;
    currency?: string;
    search?: string;
}
export declare class SortLocationDto {
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}
export declare class QueryLocationDto {
    page?: number;
    limit?: number;
}
