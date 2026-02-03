export declare class RegisterStep1ResponseDataDto {
    isUserVerified: boolean;
    token: string;
    refreshToken: string;
    tokenExpires: number;
    isCompleteProfile: boolean;
}
export declare class OtpVerifyResponseDto {
    success: boolean;
    message: string;
    data: RegisterStep1ResponseDataDto;
}
