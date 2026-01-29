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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const crypto_1 = require("crypto");
const create_class_schedule_dto_1 = require("./dto/create-class-schedule.dto");
const update_class_schedule_dto_1 = require("./dto/update-class-schedule.dto");
const class_schedule_service_1 = require("./class-schedule.service");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let ClassScheduleController = class ClassScheduleController {
    constructor(classScheduleService) {
        this.classScheduleService = classScheduleService;
    }
    create(dto) {
        dto.securityKey = (0, crypto_1.randomUUID)();
        const accessToken = process.env.ACCESS_TOKEN;
        const refreshToken = process.env.REFRESH_TOKEN;
        return this.classScheduleService.create(dto, accessToken, refreshToken);
    }
    findAll(user) {
        const userData = { id: user?.id, role: user?.role?.id };
        return this.classScheduleService.findAll(userData);
    }
    async findPaginated(query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const filterOptions = {
            instructorId: query?.instructorId,
            courseId: query?.courseId,
            studentId: query?.studentId,
            status: query?.status,
            startDate: query?.startDate,
            endDate: query?.endDate,
            search: query?.search,
        };
        return this.classScheduleService.findManyWithPagination({
            filterOptions,
            sortOptions: query?.sort,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    findOne(id) {
        return this.classScheduleService.findOne(id);
    }
    update(id, dto) {
        return this.classScheduleService.update(id, dto);
    }
    updateUserStatus(id, userId, status) {
        return this.classScheduleService.updateUserStatus(id, userId, status);
    }
    remove(id) {
        return this.classScheduleService.remove(id);
    }
    joinClass(key) {
        return this.classScheduleService.joinClass(key);
    }
};
exports.ClassScheduleController = ClassScheduleController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new class schedule' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Class schedule created successfully.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_schedule_dto_1.CreateClassScheduleDto]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Get all class schedules with filters and sorting' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('paginated/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get paginated class schedules with filters and sorting',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10, max: 50)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'instructorId',
        required: false,
        type: String,
        description: 'Filter by instructor ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: false,
        type: String,
        description: 'Filter by course ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studentId',
        required: false,
        type: String,
        description: 'Filter by student ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        type: String,
        description: 'Filter by status (scheduled, ongoing, completed, cancelled)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        required: false,
        type: String,
        description: 'Filter by start date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        required: false,
        type: String,
        description: 'Filter by end date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search in Google Meet link or security key',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassScheduleController.prototype, "findPaginated", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific class schedule by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Class schedule retrieved successfully.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing class schedule' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_class_schedule_dto_1.UpdateClassScheduleDto]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updateUserStatusInSchedule/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user status in a class schedule' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a class schedule by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/join/:securityKey'),
    (0, swagger_1.ApiOperation)({ summary: 'Join class via security key' }),
    __param(0, (0, common_1.Param)('securityKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassScheduleController.prototype, "joinClass", null);
exports.ClassScheduleController = ClassScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Class Schedule'),
    (0, common_1.Controller)('v1/class-schedule'),
    __metadata("design:paramtypes", [class_schedule_service_1.ClassScheduleService])
], ClassScheduleController);
//# sourceMappingURL=class-schedule.controller.js.map