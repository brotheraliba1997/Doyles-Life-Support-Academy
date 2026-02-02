export declare const GoogleOAuthProvider: {
    provide: string;
    useFactory: () => import("google-auth-library").OAuth2Client;
};
