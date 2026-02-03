export declare class OtpVerifyResponseDataDto {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    isUserVerified: boolean;
    isCompleteProfile: boolean;
    otp: string;
    userId: number | string;
}
export declare class OtpVerifyResponseDto {
    success: boolean;
    message: string;
    data: OtpVerifyResponseDataDto;
}
