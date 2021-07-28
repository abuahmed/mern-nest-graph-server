"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_FROM = exports.SMTP_OPTIONS = void 0;
const app_1 = require("./app");
const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;
exports.SMTP_OPTIONS = {
    host: SMTP_HOST,
    port: SMTP_PORT ? +SMTP_PORT : 587,
    secure: false,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
};
exports.MAIL_FROM = `PinnaSofts <no-reply@${app_1.APP_HOSTNAME}>`;
//# sourceMappingURL=mail.js.map