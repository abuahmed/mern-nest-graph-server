"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_PROD = exports.CLIENT_ORIGIN = exports.APP_ORIGIN = exports.JWT_SECRET = exports.APP_SECRET = exports.APP_PROTOCOL = exports.APP_HOSTNAME = exports.CLIENT_PORT = exports.APP_PORT = exports.NODE_ENV = void 0;
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.APP_PORT = _a.APP_PORT, exports.CLIENT_PORT = _a.CLIENT_PORT, exports.APP_HOSTNAME = _a.APP_HOSTNAME, exports.APP_PROTOCOL = _a.APP_PROTOCOL, exports.APP_SECRET = _a.APP_SECRET, exports.JWT_SECRET = _a.JWT_SECRET;
exports.APP_ORIGIN = `${exports.APP_PROTOCOL}://${exports.APP_HOSTNAME}:${exports.APP_PORT}`;
exports.CLIENT_ORIGIN = `${exports.APP_PROTOCOL}://${exports.APP_HOSTNAME}:${exports.CLIENT_PORT}`;
exports.IN_PROD = exports.NODE_ENV === 'production';
//# sourceMappingURL=app.js.map