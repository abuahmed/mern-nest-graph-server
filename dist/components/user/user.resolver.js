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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_dto_1 = require("./dto/user.dto");
const user_schema_1 = require("./entities/user.schema");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(_userService) {
        this._userService = _userService;
    }
    Users() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.findAll();
        });
    }
    getUserProfile(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.getUserProfile(input);
        });
    }
    authUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.authUser(input);
        });
    }
    register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.create(input);
        });
    }
    updateUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.update(input);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.delete(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.deleteAll();
        });
    }
};
__decorate([
    graphql_1.Query(() => [user_schema_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Users", null);
__decorate([
    graphql_1.Query(() => user_schema_1.User),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ListUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserProfile", null);
__decorate([
    graphql_1.Mutation(() => user_schema_1.ReturnUser),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ListUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "authUser", null);
__decorate([
    graphql_1.Mutation(() => user_schema_1.ReturnStatus),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    graphql_1.Mutation(() => user_schema_1.User),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    graphql_1.Mutation(() => user_schema_1.User),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    graphql_1.Mutation(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAll", null);
UserResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map