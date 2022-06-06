"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = exports.cognitoRoutes = void 0;
var CognitoRoutes_1 = __importDefault(require("./CognitoRoutes"));
exports.cognitoRoutes = CognitoRoutes_1.default;
var AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
exports.authRoutes = AuthRoutes_1.default;
