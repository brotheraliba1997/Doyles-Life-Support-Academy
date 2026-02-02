"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOAuthProvider = void 0;
const googleapis_1 = require("googleapis");
exports.GoogleOAuthProvider = {
    provide: 'GOOGLE_OAUTH2_CLIENT',
    useFactory: () => {
        return new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    },
};
//# sourceMappingURL=google.provider.js.map