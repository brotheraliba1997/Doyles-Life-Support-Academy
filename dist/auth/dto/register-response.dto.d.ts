declare class RegisterDataDto {
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
export declare class RegisterResponseDto {
    success: boolean;
    data: RegisterDataDto;
    message: string;
}
export {};
