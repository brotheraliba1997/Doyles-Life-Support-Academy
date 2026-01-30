export declare class AuthOtpVerifyDto {
    userId: string | number;
    otpCode: string;
    type: 'register' | 'forgot';
}
