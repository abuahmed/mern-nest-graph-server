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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.ReturnUser = exports.User = exports.ReturnStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const crypto_1 = require("crypto");
const config_1 = require("../../../config");
const utils_1 = require("../../../utils/utils");
let ReturnStatus = class ReturnStatus {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReturnStatus.prototype, "message", void 0);
ReturnStatus = __decorate([
    graphql_1.ObjectType(),
    mongoose_1.Schema()
], ReturnStatus);
exports.ReturnStatus = ReturnStatus;
let User = class User {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    graphql_1.Field(() => Date),
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], User.prototype, "verifiedAt", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    graphql_1.Field(() => Date),
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], User.prototype, "expiredAt", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    mongoose_1.Schema({ timestamps: true })
], User);
exports.User = User;
let ReturnUser = class ReturnUser extends User {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReturnUser.prototype, "token", void 0);
ReturnUser = __decorate([
    graphql_1.ObjectType(),
    mongoose_1.Schema()
], ReturnUser);
exports.ReturnUser = ReturnUser;
const UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema = UserSchema;
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const salt = yield bcryptjs_1.genSalt(10);
            this.password = yield bcryptjs_1.hash(this.password, salt);
        }
        if (this.token && this.isModified('token')) {
            this.token = utils_1.hashedToken(this.token);
            this.expiredAt = new Date(new Date().getTime() + Number(String(config_1.PASSWORD_RESET_TIMEOUT)));
        }
    });
});
UserSchema.methods.matchesPassword = function (password) {
    return bcryptjs_1.compare(password, this.password);
};
UserSchema.methods.verificationUrl = function () {
    const token = crypto_1.createHash('sha1').update(this.email).digest('hex');
    const expires = Date.now() + Number(String(config_1.EMAIL_VERIFICATION_TIMEOUT));
    const url = `${config_1.CLIENT_ORIGIN}/email/verify/${this.id}/${token}/${expires}`;
    const signature = utils_1.signVerificationUrl(url);
    return `${url}/${signature}`;
};
UserSchema.methods.url = function (plaintextToken) {
    return `${config_1.CLIENT_ORIGIN}/reset/${this.id}/${plaintextToken}`;
};
UserSchema.methods.isValid = function (plaintextToken) {
    const hash = utils_1.hashedToken(plaintextToken);
    return (crypto_1.timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
        this.expiredAt > new Date());
};
//# sourceMappingURL=user.schema.js.map