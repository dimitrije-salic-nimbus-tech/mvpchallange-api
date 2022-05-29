"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = exports.userRoutes = void 0;
var UserRoutes_1 = __importDefault(require("./UserRoutes"));
exports.userRoutes = UserRoutes_1.default;
var UserSchemas_1 = require("./UserSchemas");
Object.defineProperty(exports, "userSchemas", { enumerable: true, get: function () { return UserSchemas_1.userSchemas; } });
