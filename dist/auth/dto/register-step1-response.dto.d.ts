export declare class RegisterStep1ResponseDataDto {
    isUserVerified: boolean;
    isCompleteProfile: boolean;
    id: string | number;
    email: string;
}
export declare class RegisterStep1ResponseDto {
    success: number | boolean;
    message: string;
    data: RegisterStep1ResponseDataDto;
}
