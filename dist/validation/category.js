"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("./joi");
const categoryType = joi_1.Joi.number().required();
const displayName = joi_1.Joi.string().min(3).max(128).trim().required();
const description = joi_1.Joi.string().min(3).max(128);
const categorySchema = joi_1.Joi.object({
    categoryType,
    displayName,
    description,
});
//# sourceMappingURL=category.js.map