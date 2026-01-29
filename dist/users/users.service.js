"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_providers_enum_1 = require("../auth/auth-providers.enum");
const files_service_1 = require("../files/files.service");
const roles_enum_1 = require("../roles/roles.enum");
const statuses_enum_1 = require("../statuses/statuses.enum");
const user_schema_1 = require("./schema/user.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const convert_id_1 = require("../utils/convert-id");
let UsersService = class UsersService {
    constructor(userModel, filesService) {
        this.userModel = userModel;
        this.filesService = filesService;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const id = typeof doc.id !== 'undefined' ? doc.id : doc._id?.toString?.();
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            ...sanitized,
            id,
            email: sanitized.email,
            password: sanitized.password,
            provider: sanitized.provider || auth_providers_enum_1.AuthProvidersEnum.email,
            socialId: sanitized.socialId,
            firstName: sanitized.firstName,
            lastName: sanitized.lastName,
            photo: sanitized.photo,
            role: sanitized.role,
            status: sanitized.status,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
            deletedAt: sanitized.deletedAt,
            isDeleted: sanitized.isDeleted,
            isActive: sanitized.isActive,
        };
    }
    async create(createUserDto) {
        let password = undefined;
        if (createUserDto.password) {
            const salt = await bcryptjs_1.default.genSalt();
            password = await bcryptjs_1.default.hash(createUserDto.password, salt);
        }
        let email = null;
        if (createUserDto.email) {
            const existingUser = await this.userModel
                .findOne({ email: createUserDto.email })
                .lean();
            if (existingUser) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailAlreadyExists',
                    },
                });
            }
            email = createUserDto.email;
        }
        let photo = undefined;
        if (createUserDto.photo?.id) {
            const fileObject = await this.filesService.findById(createUserDto.photo.id);
            if (!fileObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        photo: 'imageNotExists',
                    },
                });
            }
            photo = fileObject;
        }
        else if (createUserDto.photo === null) {
            photo = null;
        }
        let role = undefined;
        if (createUserDto.role?.id) {
            const roleObject = Object.values(roles_enum_1.RoleEnum)
                .map(String)
                .includes(String(createUserDto.role.id));
            if (!roleObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        role: 'roleNotExists',
                    },
                });
            }
            role = {
                id: createUserDto.role.id,
            };
        }
        let status = undefined;
        if (createUserDto.status?.id) {
            const statusObject = Object.values(statuses_enum_1.StatusEnum)
                .map(String)
                .includes(String(createUserDto.status.id));
            if (!statusObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: 'statusNotExists',
                    },
                });
            }
            status = {
                id: createUserDto.status.id,
            };
        }
        const created = await this.userModel.create({
            ...createUserDto,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: email,
            password: password,
            photo: photo,
            role: role,
            status: status,
            provider: createUserDto.provider ?? auth_providers_enum_1.AuthProvidersEnum.email,
            socialId: createUserDto.socialId,
        });
        console.log('User created SERVICE:', created);
        const { password: _, ...userObj } = created.toObject();
        return this.map(userObj);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        console.log('Filter Options:', filterOptions);
        const filterQuery = new mongoose_query_builder_1.FilterQueryBuilder()
            .addCustom('role.id', filterOptions?.role && Number(filterOptions?.role))
            .addEqual('isActive', filterOptions?.isActive)
            .addEqual('isDeleted', filterOptions?.isDeleted)
            .addEqual('country', filterOptions?.country)
            .addEqual('currency', filterOptions?.currency)
            .build();
        if (filterOptions?.search) {
            const searchRegex = new RegExp(filterOptions.search, 'i');
            filterQuery.$or = [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex },
            ];
        }
        const mappedSortOptions = sortOptions?.map((s) => ({
            orderBy: s.orderBy,
            order: (s.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'),
        }));
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.userModel,
            filterQuery,
            sortOptions: mappedSortOptions,
            paginationOptions,
            mapper: (doc) => this.map(doc),
        });
    }
    async findById(id) {
        const doc = await this.userModel.findById(id).lean();
        const { password, ...sanitized } = doc || {};
        return doc ? this.map(sanitized) : null;
    }
    async findByIds(ids) {
        const docs = await this.userModel.find({ _id: { $in: ids } }).lean();
        const sanitizedDocs = docs.map(({ password, ...rest }) => rest);
        return sanitizedDocs.map((doc) => this.map(doc));
    }
    async findByEmail(email) {
        if (!email)
            return null;
        const doc = await this.userModel.findOne({ email }).lean();
        return doc ? this.map(doc) : null;
    }
    async findBySocialIdAndProvider({ socialId, provider, }) {
        if (!socialId || !provider)
            return null;
        const doc = await this.userModel.findOne({ socialId, provider }).lean();
        return doc ? this.map(doc) : null;
    }
    async update(id, updateUserDto) {
        let password = undefined;
        if (updateUserDto.password) {
            const userDoc = await this.userModel.findById(id).lean();
            if (userDoc && userDoc?.password !== updateUserDto.password) {
                const salt = await bcryptjs_1.default.genSalt();
                password = await bcryptjs_1.default.hash(updateUserDto.password, salt);
            }
        }
        let email = undefined;
        if (updateUserDto.email) {
            const existingUser = await this.userModel
                .findOne({ email: updateUserDto.email })
                .lean();
            if (existingUser && existingUser._id.toString() !== id.toString()) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailAlreadyExists',
                    },
                });
            }
            email = updateUserDto.email;
        }
        else if (updateUserDto.email === null) {
            email = null;
        }
        let photo = undefined;
        if (updateUserDto.photo?.id) {
            const fileObject = await this.filesService.findById(updateUserDto.photo.id);
            if (!fileObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        photo: 'imageNotExists',
                    },
                });
            }
            photo = fileObject;
        }
        else if (updateUserDto.photo === null) {
            photo = null;
        }
        let role = undefined;
        if (updateUserDto.role?.id) {
            const roleObject = Object.values(roles_enum_1.RoleEnum)
                .map(String)
                .includes(String(updateUserDto.role.id));
            if (!roleObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        role: 'roleNotExists',
                    },
                });
            }
            role = {
                id: updateUserDto.role.id,
            };
        }
        let status = undefined;
        if (updateUserDto.status?.id) {
            const statusObject = Object.values(statuses_enum_1.StatusEnum)
                .map(String)
                .includes(String(updateUserDto.status.id));
            if (!statusObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: 'statusNotExists',
                    },
                });
            }
            status = {
                id: updateUserDto.status.id,
            };
        }
        const updated = await this.userModel
            .findByIdAndUpdate(id, {
            ...updateUserDto,
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            email,
            password,
            photo,
            role,
            status,
            provider: updateUserDto.provider,
            socialId: updateUserDto.socialId,
        }, { new: true })
            .lean();
        return updated ? this.map(updated) : null;
    }
    async remove(id) {
        await this.userModel.deleteOne({ _id: id });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        files_service_1.FilesService])
], UsersService);
//# sourceMappingURL=users.service.js.map