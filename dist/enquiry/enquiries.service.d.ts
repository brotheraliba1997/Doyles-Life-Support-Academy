import { Model } from 'mongoose';
import { EnquirySchemaDocument } from './schema/enquiry.schema';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { EnquiryEntity } from './domain/enquiry.entity';
import { PaginationResult } from '../utils/mongoose-query-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterEnquiryDto, SortEnquiryDto } from './dto/query-enquiry.dto';
import { MailService } from '../mail/mail.service';
import { NotificationService } from '../notification/notification.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
export declare class EnquiriesService {
    private readonly enquiryModel;
    private readonly mailService;
    private readonly notificationService;
    private readonly configService;
    constructor(enquiryModel: Model<EnquirySchemaDocument>, mailService: MailService, notificationService: NotificationService, configService: ConfigService<AllConfigType>);
    private map;
    create(dto: CreateEnquiryDto): Promise<EnquiryEntity>;
    update(id: string, dto: UpdateEnquiryDto): Promise<EnquiryEntity>;
    findOne(id: string): Promise<EnquiryEntity | undefined>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterEnquiryDto | null;
        sortOptions?: SortEnquiryDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<EnquiryEntity>>;
}
