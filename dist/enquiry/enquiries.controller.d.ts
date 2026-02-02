import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { EnquiryEntity } from './domain/enquiry.entity';
import { FilterEnquiryDto, QueryEnquiryDto } from './dto/query-enquiry.dto';
export declare class EnquiriesController {
    private readonly service;
    constructor(service: EnquiriesService);
    create(dto: CreateEnquiryDto): Promise<EnquiryEntity>;
    findAll(queryDto: FilterEnquiryDto & QueryEnquiryDto): Promise<import("../utils/mongoose-query-builder").PaginationResult<EnquiryEntity>>;
    findOne(id: string): Promise<EnquiryEntity>;
    update(id: string, dto: UpdateEnquiryDto): Promise<EnquiryEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
