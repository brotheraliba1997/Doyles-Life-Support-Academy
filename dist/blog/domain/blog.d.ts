import { User } from '../../users/domain/user';
export declare class BlogEntity {
    id: string;
    title: string;
    content: string;
    author: string | User;
    comments: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    constructor(id: string, title: string, content: string, author: string | User, comments: string[], isPublished: boolean, createdAt: Date, updatedAt: Date, deletedAt: Date | null);
}
