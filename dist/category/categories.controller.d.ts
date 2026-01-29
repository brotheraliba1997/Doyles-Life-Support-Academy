import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(queryDto: QueryCategoryDto): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getFeatured(): Promise<any[]>;
    getActive(): Promise<any[]>;
    findBySlug(slug: string): Promise<any>;
    getCategoryStats(slug: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    addSubcategory(id: string, subcategory: string): Promise<any>;
    removeSubcategory(id: string, subcategory: string): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    hardRemove(id: string): Promise<{
        message: string;
    }>;
}
