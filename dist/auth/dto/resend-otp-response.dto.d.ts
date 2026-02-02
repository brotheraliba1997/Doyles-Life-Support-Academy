export declare class ResendOtpResponseDataDto {
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
export declare class ResendOtpResponseDto {
    success: boolean;
    message: string;
    data: ResendOtpResponseDataDto;
}
