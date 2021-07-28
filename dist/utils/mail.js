"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const { SMTP_USERNAME, SMTP_PASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
});
const sendMail = (options) => transporter.sendMail(Object.assign(Object.assign({}, options), { from: config_1.MAIL_FROM, replyTo: 'contact@pinnasofts.com' }));
exports.sendMail = sendMail;
//# sourceMappingURL=mail.js.map