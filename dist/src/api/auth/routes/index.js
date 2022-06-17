"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchemas = exports.authRoutes = exports.cognitoRoutes = void 0;
var CognitoRoutes_1 = __importDefault(require("./CognitoRoutes"));
exports.cognitoRoutes = CognitoRoutes_1.default;
var AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
exports.authRoutes = AuthRoutes_1.default;
var AuthSchemas_1 = require("./AuthSchemas");
Object.defineProperty(exports, "authSchemas", { enumerable: true, get: function () { return AuthSchemas_1.authSchemas; } });
