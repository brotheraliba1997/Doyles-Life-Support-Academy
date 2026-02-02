import { FilesService } from '../../files.service';
import { FileType } from '../../domain/file';
export declare class FilesS3Service {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(file: Express.MulterS3.File): Promise<{
        file: FileType;
    }>;
}
