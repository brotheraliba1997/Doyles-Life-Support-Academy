import { Model } from 'mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationDocument } from './schema/notification.schema';
import { CreateNotificationDto } from './dto/notification.dto';
export declare class NotificationService {
    private readonly gateway;
    private notificationModel;
    constructor(gateway: NotificationGateway, notificationModel: Model<NotificationDocument>);
    private map;
    create(dto: CreateNotificationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findAllForUser(userId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    markAsRead(notificationId: string, userId: string): Promise<{
        message: string;
        data: any;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
        modifiedCount: number;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<number>;
    sendWelcome(data: any): void;
}
