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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
let NotificationGateway = class NotificationGateway {
    constructor(authService) {
        this.authService = authService;
    }
    async handleConnection(client) {
        const token = client.handshake.auth?.token;
        try {
            const user = await this.authService.verifySocketToken(token);
            const userId = user.id;
            client.join(`user-${userId}`);
            console.log(`User ${userId} connected with socket ${client.id}`);
        }
        catch (error) {
            console.error('Socket connection error:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        console.log('Client disconnected:', client.id);
    }
    handleMessage(data, client) {
        console.log('Message received from client:', client.id, data);
        client.emit('message', {
            message: 'Message received successfully',
            originalData: data,
            timestamp: new Date().toISOString(),
        });
        return { status: 'ok' };
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleMessage", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: [
                'http://localhost:3000',
                'http://localhost:3001',
                'http://localhost:5000',
                'http://127.0.0.1:3000',
                'http://127.0.0.1:5000',
                'http://127.0.0.1:3001',
                'https://kelmac-frontend-kelmac-dev.vercel.app',
                'https://kelmac-frontend.vercel.app',
                'https://kelmac-dashboard-g33j.vercel.app',
                'https://kelmac-dashboard.vercel.app',
            ],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map