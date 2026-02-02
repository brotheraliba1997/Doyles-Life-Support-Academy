import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(dto: CreateNotificationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findAllForUser(req: any): Promise<any[]>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<any>;
    markAsRead(req: any, id: string): Promise<{
        message: string;
        data: any;
    }>;
    markAllAsRead(req: any): Promise<{
        message: string;
        modifiedCount: number;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
