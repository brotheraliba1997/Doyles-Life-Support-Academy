import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
export declare class CertificatesController {
    private readonly service;
    constructor(service: CertificatesService);
    create(dto: CreateCertificateDto): Promise<any>;
    findAll(): Promise<unknown[]>;
    findPaginated(query: any): Promise<import("../utils/mongoose-query-builder").PaginationResult<import("./schema/certificate.schema").CertificateSchemaClass>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateCertificateDto): Promise<any>;
    remove(id: string): Promise<any>;
}
