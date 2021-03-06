"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.resendEmailSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = require("./joi");
const id = joi_1.Joi.objectId().required();
const email = joi_1.Joi.string().email().min(8).max(254).lowercase().trim().required();
const name = joi_1.Joi.string().min(3).max(128).trim().required();
const password = joi_1.Joi.string().min(6).max(20).required();
const confirmPassword = joi_1.Joi.valid(joi_1.Joi.ref('password')).required();
exports.registerSchema = joi_1.Joi.object({
    email,
    name,
    password,
    confirmPassword,
});
exports.loginSchema = joi_1.Joi.object({
    email,
    password,
});
exports.verifyEmailSchema = joi_1.Joi.object({
    id,
    token: joi_1.Joi.string().length(40).required(),
    expires: joi_1.Joi.date().timestamp().required(),
    signature: joi_1.Joi.string().length(64).required(),
});
exports.resendEmailSchema = joi_1.Joi.object({
    id,
});
exports.forgotPasswordSchema = joi_1.Joi.object({
    email,
});
exports.resetPasswordSchema = joi_1.Joi.object({
    body: joi_1.Joi.object({
        id,
        token: joi_1.Joi.string()
            .length(40 * 2)
            .required(),
        password,
        confirmPassword,
    }),
});
//# sourceMappingURL=auth.js.map