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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_gateway_1 = require("./notification.gateway");
const notification_schema_1 = require("./schema/notification.schema");
const convert_id_1 = require("../utils/convert-id");
let NotificationService = class NotificationService {
    constructor(gateway, notificationModel) {
        this.gateway = gateway;
        this.notificationModel = notificationModel;
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return {
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
            title: sanitized.title,
            message: sanitized.message,
            type: sanitized.type,
            receiverIds: sanitized.receiverIds,
            readByIds: true || [],
            meta: sanitized.meta || {},
            createdAt: sanitized.createdAt,
            updatedAt: sanitized.updatedAt,
        };
    }
    async create(dto) {
        const receiverIds = dto.receiverIds.map((id) => new mongoose_2.Types.ObjectId(id));
        const notification = await this.notificationModel.create({
            title: dto.title,
            message: dto.message,
            type: dto.type,
            receiverIds,
            meta: dto.meta || {},
        });
        const populated = await this.notificationModel
            .findById(notification._id)
            .populate('receiverIds')
            .lean();
        const populatedAny = populated;
        receiverIds.forEach((receiverId) => {
            this.gateway.server
                .to(`user-${receiverId.toString()}`)
                .emit('notification', {
                id: populatedAny._id.toString(),
                title: populatedAny.title,
                message: populatedAny.message,
                type: populatedAny.type,
                createdAt: populatedAny.createdAt,
            });
        });
        return this.map(populated);
    }
    async findAll() {
        const notifications = await this.notificationModel
            .find()
            .populate('receiverIds')
            .sort({ createdAt: -1 })
            .lean();
        return notifications.map((notification) => this.map(notification));
    }
    async findAllForUser(userId) {
        const notifications = await this.notificationModel
            .find({ receiverIds: new mongoose_2.Types.ObjectId(userId) })
            .populate('receiverIds')
            .sort({ createdAt: -1 })
            .lean();
        return notifications.map((notification) => {
            const mapped = this.map(notification);
            if (mapped) {
                mapped.isRead =
                    mapped.readByIds?.some((id) => id === userId) || false;
            }
            return mapped;
        });
    }
    async findOne(id) {
        const notification = await this.notificationModel
            .findById(id)
            .populate('receiverIds')
            .lean();
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return this.map(notification);
    }
    async markAsRead(notificationId, userId) {
        const notification = await this.notificationModel.findById(notificationId);
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        const isReceiver = notification.receiverIds.some((id) => id.toString() === userId);
        if (!isReceiver) {
            throw new common_1.NotFoundException('You are not authorized to mark this notification as read');
        }
        const userIdObjectId = new mongoose_2.Types.ObjectId(userId);
        if (!notification.readByIds.some((id) => id.toString() === userId)) {
            notification.readByIds.push(userIdObjectId);
            await notification.save();
        }
        const updated = await this.notificationModel
            .findById(notificationId)
            .populate('receiverIds')
            .lean();
        return {
            message: 'Notification marked as read',
            data: this.map(updated),
        };
    }
    async markAllAsRead(userId) {
        const userIdObjectId = new mongoose_2.Types.ObjectId(userId);
        const result = await this.notificationModel.updateMany({
            receiverIds: userIdObjectId,
            readByIds: { $ne: userIdObjectId },
        }, {
            $addToSet: { readByIds: userIdObjectId },
        });
        return {
            message: 'All notifications marked as read',
            modifiedCount: result.modifiedCount,
        };
    }
    async remove(id, userId) {
        const notification = await this.notificationModel.findById(id);
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        const isReceiver = notification.receiverIds.some((id) => id.toString() === userId);
        if (!isReceiver) {
            throw new common_1.NotFoundException('You are not authorized to delete this notification');
        }
        await this.notificationModel.findByIdAndDelete(id);
        return { message: 'Notification deleted successfully' };
    }
    async getUnreadCount(userId) {
        const userIdObjectId = new mongoose_2.Types.ObjectId(userId);
        return this.notificationModel.countDocuments({
            receiverIds: userIdObjectId,
            readByIds: { $ne: userIdObjectId },
        });
    }
    sendWelcome(data) {
        this.gateway.server.emit('welcome', data);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        mongoose_2.Model])
], NotificationService);
//# sourceMappingURL=notification.service.js.map