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
exports.AssessmentItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AssessmentItem_schema_1 = require("./schema/AssessmentItem.schema");
const convert_id_1 = require("../utils/convert-id");
let AssessmentItemService = class AssessmentItemService {
    constructor(assessmentItemModel) {
        this.assessmentItemModel = assessmentItemModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            courseId: sanitized.courseId.toString(),
            day: sanitized.day,
            topicRef: sanitized.topicRef,
            title: sanitized.title,
            cu: sanitized.cu,
            maxMarks: sanitized.maxMarks,
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    async create(dto) {
        const item = new this.assessmentItemModel(dto);
        return item.save();
    }
    async findAll() {
        return this.assessmentItemModel.find().exec();
    }
    async findByCourse(courseId, day) {
        if (!courseId || !day)
            throw new common_1.BadRequestException('Course ID and day are required');
        const dayofCaptital = `Day ${day}`;
        const items = await this.assessmentItemModel
            .find({ courseId: new mongoose_2.Types.ObjectId(courseId), day: dayofCaptital })
            .lean();
        if (!items || items.length === 0)
            throw new common_1.NotFoundException('Assessment items not founds');
        return {
            data: items.map((item) => this.map(item)),
        };
    }
    async findOne(id) {
        const item = await this.assessmentItemModel.findById(id).exec();
        if (!item)
            throw new common_1.NotFoundException('AssessmentItem not founds');
        return item;
    }
    async findByTest(testId) {
        return this.assessmentItemModel
            .find({ testId: new mongoose_2.Types.ObjectId(testId) })
            .exec();
    }
    async update(id, dto) {
        const updated = await this.assessmentItemModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('AssessmentItem not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.assessmentItemModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('AssessmentItem not found');
    }
};
exports.AssessmentItemService = AssessmentItemService;
exports.AssessmentItemService = AssessmentItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(AssessmentItem_schema_1.AssessmentItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssessmentItemService);
//# sourceMappingURL=assessmentItem.services.js.map