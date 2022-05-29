"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemas = exports.productRoutes = void 0;
var ProductRoutes_1 = __importDefault(require("./ProductRoutes"));
exports.productRoutes = ProductRoutes_1.default;
var ProductSchemas_1 = require("./ProductSchemas");
Object.defineProperty(exports, "productSchemas", { enumerable: true, get: function () { return ProductSchemas_1.productSchemas; } });
