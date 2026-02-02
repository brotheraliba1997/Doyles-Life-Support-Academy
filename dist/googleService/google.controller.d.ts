import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    getAuthUrl(): {
        url: string;
    };
    handleRedirect(code: string): Promise<{
        message: string;
        tokens: import("google-auth-library").Credentials;
    }>;
    createMeeting(): Promise<{
        meetLink: string;
        event: import("googleapis").calendar_v3.Schema$Event;
    }>;
}
