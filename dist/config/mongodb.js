"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_OPTIONS = exports.MONGO_DATABASE = exports.MONGO_PORT = exports.MONGO_HOST = exports.MONGO_PASSWORD = exports.MONGO_USERNAME = exports.Mongo_URI_Server = exports.MONGO_URI = void 0;
const { env } = process;
exports.MONGO_URI = process.env.MONGO_URI;
_a = process.env, exports.Mongo_URI_Server = _a.Mongo_URI_Server, exports.MONGO_USERNAME = _a.MONGO_USERNAME, exports.MONGO_PASSWORD = _a.MONGO_PASSWORD, exports.MONGO_HOST = _a.MONGO_HOST, exports.MONGO_PORT = _a.MONGO_PORT, exports.MONGO_DATABASE = _a.MONGO_DATABASE;
exports.MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
exports.default = () => ({
    MONGO_URI: exports.MONGO_URI,
    MONGO_OPTIONS: exports.MONGO_OPTIONS,
});
//# sourceMappingURL=mongodb.js.map