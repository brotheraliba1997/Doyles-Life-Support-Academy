import { Model } from 'mongoose';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CertificateSchemaClass } from './schema/certificate.schema';
import { SortOption } from '../utils/mongoose-query-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class CertificatesService {
    private model;
    constructor(model: Model<CertificateSchemaClass>);
    private map;
    create(dto: CreateCertificateDto): Promise<any>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: {
            userId?: string;
            courseId?: string;
        };
        sortOptions?: SortOption[];
        paginationOptions: IPaginationOptions;
    }): Promise<import("../utils/mongoose-query-builder").PaginationResult<CertificateSchemaClass>>;
    findAll(): Promise<unknown[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateCertificateDto): Promise<any>;
    remove(id: string): Promise<any>;
}
