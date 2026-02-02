import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../../config/config.type';
import { FileType } from '../../domain/file';
import { FilesService } from '../../files.service';
export declare class FilesLocalService {
    private readonly configService;
    private readonly filesService;
    constructor(configService: ConfigService<AllConfigType>, filesService: FilesService);
    create(file: Express.Multer.File): Promise<{
        file: FileType;
    }>;
}
