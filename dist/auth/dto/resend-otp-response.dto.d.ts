import { User } from '../../users/domain/user';
export declare class ResendOtpResponseDto {
    success: boolean;
    message: string;
    user: User;
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
