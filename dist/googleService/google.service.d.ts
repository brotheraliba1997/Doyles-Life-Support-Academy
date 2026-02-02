export declare class GoogleService {
    private oauth2Client;
    generateAuthUrl(): string;
    getTokens(code: string): Promise<import("google-auth-library").Credentials>;
    createGoogleMeetEvent(accessToken: string, refreshToken: string): Promise<import("googleapis").calendar_v3.Schema$Event>;
}
