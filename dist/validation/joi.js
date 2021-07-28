"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Joi = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("@hapi/joi"));
const errors_1 = require("../errors");
const objectId = (joi) => ({
    type: 'objectId',
    base: joi.string(),
    messages: {
        objectId: '"{#label}" is not a valid ID',
    },
    validate(value, helpers) {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            return { value, errors: helpers.error('objectId') };
        }
    },
});
exports.Joi = joi_1.default.extend(objectId);
const validate = (schema, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validateAsync(payload, { abortEarly: false });
    }
    catch (e) {
        throw new errors_1.BadRequest(e);
    }
});
exports.validate = validate;
//# sourceMappingURL=joi.js.map