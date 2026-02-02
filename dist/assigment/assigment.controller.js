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
exports.AssigmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assigment_service_1 = require("./assigment.service");
const assigment_entity_1 = require("./domain/assigment.entity");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const approve_pass_fail_dto_1 = require("./dto/approve-pass-fail.dto");
const query_attendance_dto_1 = require("../attendance/dto/query-attendance.dto");
const check_pass_fail_dto_1 = require("./dto/check-pass-fail.dto");
let AssigmentController = class AssigmentController {
    constructor(assigmentService) {
        this.assigmentService = assigmentService;
    }
    async create(dto) {
        return await this.assigmentService.create(dto, dto.markedBy);
    }
    async findAll(filters) {
        return await this.assigmentService.findAll(filters);
    }
    async findPaginated(query) {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50)
            limit = 50;
        const filterOptions = {
            courseId: query?.courseId,
            sessionId: query?.sessionId,
            studentId: query?.studentId,
            markedBy: query?.markedBy,
            status: query?.status,
        };
        return await this.assigmentService.findManyWithPagination({
            filterOptions,
            sortOptions: query?.sort,
            paginationOptions: {
                page: Number(page),
                limit: Number(limit),
            },
        });
    }
    async approvePassFail(dto) {
        if (!dto.operatorId) {
            throw new common_1.BadRequestException('Operator ID is required');
        }
        return await this.assigmentService.approvePassFailStatus(dto, dto.operatorId);
    }
    async checkPassFail(query) {
        console.log(query, "issueCertificates");
        return await this.assigmentService.checkPassFailStatus(query);
    }
};
exports.AssigmentController = AssigmentController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Mark attendance for a single student',
        description: 'Instructor marks attendance for one student in a class schedule.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Attendance marked successfully',
        type: assigment_entity_1.AssigmentEntity,
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", Promise)
], AssigmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_attendance_dto_1.FilterAttendanceDto]),
    __metadata("design:returntype", Promise)
], AssigmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('paginated/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssigmentController.prototype, "findPaginated", null);
__decorate([
    (0, common_1.Post)('pass-fail-approve-certificate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_pass_fail_dto_1.ApprovePassFailDto]),
    __metadata("design:returntype", Promise)
], AssigmentController.prototype, "approvePassFail", null);
__decorate([
    (0, common_1.Get)('pass-fail-check-assigment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_pass_fail_dto_1.CheckPassFailDto]),
    __metadata("design:returntype", Promise)
], AssigmentController.prototype, "checkPassFail", null);
exports.AssigmentController = AssigmentController = __decorate([
    (0, swagger_1.ApiTags)('Assigment'),
    (0, common_1.Controller)({
        path: 'assigment',
        version: '1',
    }),
    __metadata("design:paramtypes", [assigment_service_1.AssignmentService])
], AssigmentController);
//# sourceMappingURL=assigment.controller.js.map