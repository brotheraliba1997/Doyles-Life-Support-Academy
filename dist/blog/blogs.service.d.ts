import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './domain/blog';
import { FilterBlogDto, SortBlogDto } from './dto/query-blog.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { BlogSchemaClass } from './schema/blogs.schema';
import { PaginationResult } from '../utils/mongoose-query-builder';
export declare class BlogsService {
    private readonly blogModel;
    constructor(blogModel: Model<BlogSchemaClass>);
    private map;
    create(createBlogDto: CreateBlogDto): Promise<BlogEntity>;
    findAll({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterBlogDto;
        sortOptions?: SortBlogDto[];
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<BlogEntity>>;
    findOne(id: string): Promise<BlogEntity | null>;
    findByIds(ids: string[]): Promise<BlogEntity[]>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogEntity | null>;
    remove(id: string): Promise<void>;
}
