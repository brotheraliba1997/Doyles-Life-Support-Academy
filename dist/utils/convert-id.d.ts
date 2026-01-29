export declare function convertIdToString(doc: any): string | undefined;
export declare function convertIdToStringOrFallback(doc: any, fallback?: string): string;
export declare function convertIdsToStrings(docs: any[]): string[];
export declare function sanitizeMongooseDocument<T = any>(data: any): T | null | undefined;
export declare function sanitizeMongooseDocuments<T = any>(docs: any[]): T[];
export declare function sanitizeReference(ref: any, fields?: string[]): any;
