declare class FirebaseInfoDto {
    sign_in_provider: string;
}
export declare class DecodedFirebaseTokenDto {
    uid: string;
    name?: string;
    email?: string;
    firebase: FirebaseInfoDto;
}
export {};
