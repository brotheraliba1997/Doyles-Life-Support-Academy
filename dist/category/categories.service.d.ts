import { Model } from 'mongoose';
import { CategorySchemaClass } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<CategorySchemaClass>);
    private generateSlug;
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(queryDto: QueryCategoryDto): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<any>;
    findBySlug(slug: string): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    hardRemove(id: string): Promise<{
        message: string;
    }>;
    addSubcategory(id: string, subcategory: string): Promise<any>;
    removeSubcategory(id: string, subcategory: string): Promise<any>;
    incrementCourseCount(categoryName: string): Promise<void>;
    decrementCourseCount(categoryName: string): Promise<void>;
    getFeaturedCategories(): Promise<any[]>;
    getActiveCategories(): Promise<any[]>;
    validateCategory(categorySlug: string): Promise<boolean>;
    getCategoryWithStats(slug: string): Promise<any>;
}
