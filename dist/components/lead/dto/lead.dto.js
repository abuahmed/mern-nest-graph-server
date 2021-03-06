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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeadInput = exports.CreateLeadInput = exports.ListLeadInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
let ListLeadInput = class ListLeadInput {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], ListLeadInput.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ListLeadInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ListLeadInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ListLeadInput.prototype, "message", void 0);
ListLeadInput = __decorate([
    graphql_1.InputType()
], ListLeadInput);
exports.ListLeadInput = ListLeadInput;
let CreateLeadInput = class CreateLeadInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateLeadInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateLeadInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateLeadInput.prototype, "message", void 0);
CreateLeadInput = __decorate([
    graphql_1.InputType()
], CreateLeadInput);
exports.CreateLeadInput = CreateLeadInput;
let UpdateLeadInput = class UpdateLeadInput {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], UpdateLeadInput.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateLeadInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateLeadInput.prototype, "email", void 0);
UpdateLeadInput = __decorate([
    graphql_1.InputType()
], UpdateLeadInput);
exports.UpdateLeadInput = UpdateLeadInput;
//# sourceMappingURL=lead.dto.js.map