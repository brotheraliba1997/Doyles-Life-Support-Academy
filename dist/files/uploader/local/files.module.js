"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesLocalModule = void 0;
const common_1 = require("@nestjs/common");
const files_controller_1 = require("./files.controller");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const multer_1 = require("multer");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const files_service_1 = require("./files.service");
const files_service_2 = require("../../files.service");
const mongoose_1 = require("@nestjs/mongoose");
const file_schema_1 = require("../../schema/file.schema");
let FilesLocalModule = class FilesLocalModule {
};
exports.FilesLocalModule = FilesLocalModule;
exports.FilesLocalModule = FilesLocalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: file_schema_1.FileSchemaClass.name, schema: file_schema_1.FileSchema },
            ]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        fileFilter: (request, file, callback) => {
                            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                                return callback(new common_1.UnprocessableEntityException({
                                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                                    errors: {
                                        file: `cantUploadFileType`,
                                    },
                                }), false);
                            }
                            callback(null, true);
                        },
                        storage: (0, multer_1.diskStorage)({
                            destination: '/tmp',
                            filename: (request, file, callback) => {
                                callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}.${file.originalname
                                    .split('.')
                                    .pop()
                                    ?.toLowerCase()}`);
                            },
                        }),
                        limits: {
                            fileSize: configService.get('file.maxFileSize', { infer: true }),
                        },
                    };
                },
            }),
        ],
        controllers: [files_controller_1.FilesLocalController],
        providers: [config_1.ConfigModule, config_1.ConfigService, files_service_1.FilesLocalService, files_service_2.FilesService],
        exports: [files_service_1.FilesLocalService],
    })
], FilesLocalModule);
//# sourceMappingURL=files.module.js.map