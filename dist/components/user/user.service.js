"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./entities/user.schema");
const validation_1 = require("../../validation");
const jwt_1 = __importDefault(require("../../utils/jwt"));
const mail_1 = require("../../utils/mail");
const config_1 = require("../../config");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UserModel.find().exec();
        });
    }
    authUser(listUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validation_1.validate(validation_1.loginSchema, listUserInput);
            const { email, password } = listUserInput;
            const user = yield this.UserModel.findOne({ email });
            if (!user || !(yield user.matchesPassword(password))) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNAUTHORIZED,
                    error: 'Incorrect email or password',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            const userData = new user_schema_1.ReturnUser();
            userData._id = user._id;
            userData.name = user.name;
            userData.email = user.email;
            userData.isAdmin = user.isAdmin;
            userData.token = jwt_1.default(user._id);
            return userData;
        });
    }
    getUserProfile(listUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = listUserInput;
            const user = yield this.UserModel.findById({ _id });
            if (!user) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNAUTHORIZED,
                    error: 'Incorrect email or password',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            return user;
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = createUserDto;
            yield validation_1.validate(validation_1.registerSchema, createUserDto);
            const found = yield this.UserModel.exists({ email });
            if (found) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'User already exists',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = yield this.UserModel.create({
                email,
                name,
                password,
            });
            if (user) {
                const link = user.verificationUrl();
                yield mail_1.sendMail({
                    to: email,
                    subject: 'Verify your email address',
                    html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${link}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${config_1.APP_HOSTNAME}</p>
            `,
                });
                const status = new user_schema_1.ReturnStatus();
                status.message = `Email has been sent to ${email}. Follow the instruction to activate your account`;
                return status;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'Invalid user data',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    update(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UserModel.findByIdAndUpdate(updateUserDto._id, updateUserDto);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UserModel.findByIdAndDelete(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.UserModel.deleteMany()).deletedCount;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map