import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    constructor(authService: AuthService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(data: any, client: Socket): {
        status: string;
    };
}
