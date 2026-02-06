import { User } from '../../users/domain/user';
declare class RegisterDataDto {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    user: User;
}
export declare class RegisterResponseDto {
    success: boolean;
    data: RegisterDataDto;
    message: string;
}
export {};
