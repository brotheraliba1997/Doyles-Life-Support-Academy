import { FilesService } from '../../files.service';
import { FileUploadDto } from './dto/file.dto';
import { ConfigService } from '@nestjs/config';
import { FileType } from '../../domain/file';
import { AllConfigType } from '../../../config/config.type';
export declare class FilesS3PresignedService {
    private readonly filesService;
    private readonly configService;
    private s3;
    constructor(filesService: FilesService, configService: ConfigService<AllConfigType>);
    create(file: FileUploadDto): Promise<{
        file: FileType;
        uploadSignedUrl: string;
    }>;
}
