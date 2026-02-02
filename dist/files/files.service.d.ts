import { Model } from 'mongoose';
import { FileSchemaClass } from './schema/file.schema';
import { FileType } from './domain/file';
import { NullableType } from '../utils/types/nullable.type';
export declare class FilesService {
    private readonly fileModel;
    constructor(fileModel: Model<FileSchemaClass>);
    create(data: {
        path: string;
    }): Promise<FileType>;
    findById(id: FileType['id']): Promise<NullableType<FileType>>;
    findByIds(ids: FileType['id'][]): Promise<FileType[]>;
}
