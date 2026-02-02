export declare class RegisterStep1ResponseDataDto {
    isUserVerified: boolean;
    isCompleteProfile: boolean;
}
export declare class RegisterStep1ResponseDto {
    userId: string | number;
    userEmail: string;
    success: number | boolean;
    message: string;
    data: RegisterStep1ResponseDataDto;
}
