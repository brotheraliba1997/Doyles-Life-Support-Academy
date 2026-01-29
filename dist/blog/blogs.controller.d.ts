import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './domain/blog';
export declare class BlogsController {
    private readonly service;
    constructor(service: BlogsService);
    create(createBlogDto: CreateBlogDto): Promise<BlogEntity>;
    findAll(query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<BlogEntity>>;
    findOne(id: string): Promise<BlogEntity | null>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogEntity | null>;
    remove(id: string): Promise<void>;
}
