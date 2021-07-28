"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedToken = exports.plaintextToken = exports.hasValidVerificationUrl = exports.signVerificationUrl = void 0;
const crypto_1 = require("crypto");
const config_1 = require("../config");
const signVerificationUrl = (url) => crypto_1.createHmac('sha256', config_1.APP_SECRET)
    .update(String(url))
    .digest('hex');
exports.signVerificationUrl = signVerificationUrl;
const hasValidVerificationUrl = function (_id, _token, _expires, _signature) {
    const url = `${config_1.CLIENT_ORIGIN}/email/verify/${_id}/${_token}/${_expires}`;
    const signature = this.signVerificationUrl(url);
    return crypto_1.timingSafeEqual(Buffer.from(signature), Buffer.from(_signature)) && +_expires > Date.now();
};
exports.hasValidVerificationUrl = hasValidVerificationUrl;
const plaintextToken = () => {
    return crypto_1.randomBytes(Number(String(config_1.PASSWORD_RESET_BYTES))).toString('hex');
};
exports.plaintextToken = plaintextToken;
const hashedToken = (plaintextToken) => {
    return crypto_1.createHmac('sha256', config_1.APP_SECRET)
        .update(String(plaintextToken))
        .digest('hex');
};
exports.hashedToken = hashedToken;
//# sourceMappingURL=utils.js.map