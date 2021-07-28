import { SendMailOptions } from 'nodemailer';
export declare const sendMail: (options: SendMailOptions) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
