import { User } from '../../users/domain/user';
export declare class OtpVerifyResponseDto {
    user: User;
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
