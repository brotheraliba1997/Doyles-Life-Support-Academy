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
exports.GoogleController = void 0;
const common_1 = require("@nestjs/common");
const google_service_1 = require("./google.service");
let GoogleController = class GoogleController {
    constructor(googleService) {
        this.googleService = googleService;
    }
    getAuthUrl() {
        return { url: this.googleService.generateAuthUrl() };
    }
    async handleRedirect(code) {
        const tokens = await this.googleService.getTokens(code);
        return {
            message: 'Tokens received successfully',
            tokens,
        };
    }
    async createMeeting() {
        const accessToken = process.env.ACCESS_TOKEN;
        const refreshToken = process.env.REFRESH_TOKEN;
        const event = await this.googleService.createGoogleMeetEvent(accessToken, refreshToken);
        return { meetLink: event.hangoutLink, event };
    }
};
exports.GoogleController = GoogleController;
__decorate([
    (0, common_1.Get)('auth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GoogleController.prototype, "getAuthUrl", null);
__decorate([
    (0, common_1.Get)('redirect'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Get)('create-meeting'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "createMeeting", null);
exports.GoogleController = GoogleController = __decorate([
    (0, common_1.Controller)('google'),
    __metadata("design:paramtypes", [google_service_1.GoogleService])
], GoogleController);
//# sourceMappingURL=google.controller.js.map