import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto, QueryCourseDto } from './dto/query-course.dto';
import { CourseEntity } from './domain/course';
export declare class CoursesController {
    private readonly service;
    constructor(service: CoursesService);
    create(dto: CreateCourseDto): Promise<CourseEntity>;
    findAll(queryDto: FilterCourseDto & QueryCourseDto): Promise<import("../utils/mongoose-query-builder").PaginationResult<CourseEntity>>;
    findOne(id: string): Promise<CourseEntity>;
    findBySlug(slug: string): Promise<CourseEntity>;
    findByCategory(categorySlug: string, query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<CourseEntity>>;
    findBySubcategory(subcategory: string, query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<CourseEntity>>;
    update(id: string, dto: UpdateCourseDto): Promise<CourseEntity>;
    remove(id: string): Promise<void>;
    getCoursesByCategories(): Promise<any>;
}
