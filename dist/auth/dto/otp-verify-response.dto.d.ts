export declare class OtpVerifyUserResponseDto {
    id: number | string;
    isUserVerified: boolean;
    isCompanyVerified: boolean;
}
export declare class OtpVerifyResponseDataDto {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    otp: string;
    user: OtpVerifyUserResponseDto;
}
export declare class OtpVerifyResponseDto {
    success: boolean;
    message: string;
    data: OtpVerifyResponseDataDto;
}
