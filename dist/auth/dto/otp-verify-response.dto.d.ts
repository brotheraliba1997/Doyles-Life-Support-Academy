export declare class RegisterStep1ResponseDataDto {
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
export declare class OtpVerifyResponseDto {
    success: boolean;
    message: string;
    data: RegisterStep1ResponseDataDto;
}
