import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { User } from './domain/user';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSchemaClass } from './schema/user.schema';
import { PaginationResult } from '../utils/mongoose-query-builder';
export declare class UsersService {
    private readonly userModel;
    private readonly filesService;
    constructor(userModel: Model<UserSchemaClass>, filesService: FilesService);
    private map;
    create(createUserDto: CreateUserDto): Promise<User>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<User>>;
    findById(id: User['id']): Promise<NullableType<User>>;
    findByIds(ids: User['id'][]): Promise<User[]>;
    findByEmail(email: User['email']): Promise<NullableType<User>>;
    findBySocialIdAndProvider({ socialId, provider, }: {
        socialId: User['socialId'];
        provider: User['provider'];
    }): Promise<NullableType<User>>;
    update(id: User['id'], updateUserDto: UpdateUserDto): Promise<User | null>;
    updateEmailVerified(id: User['id'], isEmailVerified: boolean): Promise<User | null>;
    remove(id: User['id']): Promise<void>;
}
