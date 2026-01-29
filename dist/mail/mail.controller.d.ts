import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendTestEmail(body: {
        to: string;
        template: string;
    }): Promise<{
        success: boolean;
        message: string;
        note: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        note?: undefined;
    }>;
}
