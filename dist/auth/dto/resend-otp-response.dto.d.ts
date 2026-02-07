export declare class ResendOtpUserResponseDto {
    id: number | string;
    isUserVerified: boolean;
    isCompletedProfileVerified: boolean;
}
export declare class ResendOtpResponseDataDto {
    otp: string;
    otpExpiresAt: Date;
    user: ResendOtpUserResponseDto;
}
export declare class ResendOtpResponseDto {
    success: boolean;
    message: string;
    data: ResendOtpResponseDataDto;
}
